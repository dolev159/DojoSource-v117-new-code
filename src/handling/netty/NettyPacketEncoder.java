package handling.netty;

import client.MapleClient;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import java.util.concurrent.locks.Lock;
import tools.MapleAESOFB;
import tools.MapleCustomEncryption;

public class NettyPacketEncoder extends MessageToByteEncoder<byte[]> {

    @Override
    protected void encode(ChannelHandlerContext ctx, byte[] message, ByteBuf out) throws Exception {
        final MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();

        if (client != null) {
            final MapleAESOFB send_crypto = client.getSendCrypto();
            
            // We need to copy the message to avoid modifying the original if it's reused
            final byte[] unencrypted = new byte[message.length];
            System.arraycopy(message, 0, unencrypted, 0, message.length);

            final Lock mutex = client.getLock();
            mutex.lock();
            try {
                final byte[] header = send_crypto.getPacketHeader(unencrypted.length);
                MapleCustomEncryption.encryptData(unencrypted);
                send_crypto.crypt(unencrypted);

                // Write header then encrypted data
                out.writeBytes(header);
                out.writeBytes(unencrypted);
            } finally {
                mutex.unlock();
            }
        } else {
            // No client associated yet (e.g., initial Hello packet)
            // Just write the raw bytes
            out.writeBytes(message);
        }
    }
}

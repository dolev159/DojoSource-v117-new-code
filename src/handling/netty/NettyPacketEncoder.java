package handling.netty;

import client.MapleClient;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import java.util.concurrent.locks.Lock;
import tools.MapleAESOFB;
import tools.MapleCustomEncryption;
import constants.ServerConstants;

public class NettyPacketEncoder extends MessageToByteEncoder<byte[]> {

    @Override
    protected void encode(ChannelHandlerContext ctx, byte[] message, ByteBuf out) throws Exception {
        final MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();

        if (client != null) {
            final Lock mutex = client.getLock();
            mutex.lock();
            try {
                if (client.isFirstPacket()) {
                    client.setFirstPacket(false);
                    out.writeBytes(message);
                } else {
                    final byte[] data = new byte[message.length];
                    System.arraycopy(message, 0, data, 0, message.length);

                    if (ServerConstants.USE_AES) {
                        final MapleAESOFB send_crypto = client.getSendCrypto();
                        final byte[] header = send_crypto.getPacketHeader(data.length);
                        if (ServerConstants.USE_SHANDA) {
                            MapleCustomEncryption.encryptData(data);
                        }
                        send_crypto.crypt(data);
                        out.writeBytes(header);
                    } else if (ServerConstants.USE_SHANDA) {
                        MapleCustomEncryption.encryptData(data);
                    }
                    out.writeBytes(data);
                }
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

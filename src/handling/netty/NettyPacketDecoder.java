package handling.netty;

import client.MapleClient;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
import java.util.List;
import tools.MapleAESOFB;
import tools.MapleCustomEncryption;

public class NettyPacketDecoder extends ByteToMessageDecoder {

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();

        if (client == null) {
            // Handshake/Hello has not been sent yet or client not initialized
            if (in.readableBytes() >= 4) {
                // This shouldn't happen normally as the server sends Hello first
                // But if it does, we just pass it through or handle as needed
            }
            return;
        }

        if (in.readableBytes() < 4) {
            return;
        }

        // Mark the reader index to reset if we don't have enough bytes for the full packet
        in.markReaderIndex();

        int packetHeader = in.readInt();
        if (!client.getReceiveCrypto().checkPacket(packetHeader)) {
            ctx.close();
            return;
        }

        int packetLength = MapleAESOFB.getPacketLength(packetHeader);
        if (in.readableBytes() < packetLength) {
            in.resetReaderIndex();
            return;
        }

        byte[] decryptedPacket = new byte[packetLength];
        in.readBytes(decryptedPacket);

        client.getReceiveCrypto().crypt(decryptedPacket);
        MapleCustomEncryption.decryptData(decryptedPacket);

        out.add(decryptedPacket);
    }
}

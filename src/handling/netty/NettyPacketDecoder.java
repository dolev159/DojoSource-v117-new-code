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
        final MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();

        if (client == null) {
            // Unidentified client. Hello packet should have been sent first.
            // If they try to send something before it, we just wait or skip.
            if (in.readableBytes() >= 4) {
                 // Clear buffer to prevent memory leakage from malformed initial packets
                 in.skipBytes(in.readableBytes());
            }
            return;
        }

        if (in.readableBytes() < 4) {
            return;
        }

        in.markReaderIndex();

        final int packetHeader = in.readInt();
        if (!client.getReceiveCrypto().checkPacket(packetHeader)) {
            ctx.close();
            return;
        }

        final int packetLength = MapleAESOFB.getPacketLength(packetHeader);
        if (in.readableBytes() < packetLength) {
            in.resetReaderIndex();
            return;
        }

        final byte[] decryptedPacket = new byte[packetLength];
        in.readBytes(decryptedPacket);

        client.getReceiveCrypto().crypt(decryptedPacket);
        MapleCustomEncryption.decryptData(decryptedPacket);

        out.add(decryptedPacket);
    }
}

package handling.netty;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
import java.util.List;
import client.MapleClient;
import tools.MapleCustomEncryption;

public class NettyPacketDecoder extends ByteToMessageDecoder {

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        final MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();

        if (client == null) {
            if (in.readableBytes() >= 4) {
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
            in.resetReaderIndex();
            ctx.close();
            return;
        }

        int packetLength = MapleClient.getPacketLength(packetHeader);
        if (packetLength <= 0 || packetLength > 16384) {
             in.resetReaderIndex();
             ctx.close();
             return;
        }

        if (in.readableBytes() < packetLength) {
            in.resetReaderIndex();
            return;
        }

        byte[] data = new byte[packetLength];
        in.readBytes(data);
        client.getReceiveCrypto().crypt(data);
        MapleCustomEncryption.decryptData(data);
        out.add(data);
        client.incrementReceivedPackets();
        
        // System.out.println("[Netty] Decoded packet from " + ctx.channel().remoteAddress() + " Length: " + packetLength);
    }
}

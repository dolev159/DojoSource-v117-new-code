package handling.netty;

import client.MapleClient;
import handling.MapleServerHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import server.Randomizer;
import tools.packet.LoginPacket;
import constants.ServerConstants;
import tools.MapleAESOFB;
import io.netty.channel.Channel;

/**
 * MaplePacketHandler handles incoming decrypted packets.
 * Decouples game logic from the Netty Event Loop using GameWorkerPool.
 */
public class MaplePacketHandler extends SimpleChannelInboundHandler<byte[]> {

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        final String address = ctx.channel().remoteAddress().toString();
        
        // Standard random IVs for GMS v117.2
        final byte ivRecv[] = new byte[4];
        final byte ivSend[] = new byte[4];
        Randomizer.nextBytes(ivRecv);
        Randomizer.nextBytes(ivSend);

        final MapleClient client = new MapleClient(
                new MapleAESOFB(ivSend, (short) (0xFFFF - ServerConstants.MAPLE_VERSION)),
                new MapleAESOFB(ivRecv, ServerConstants.MAPLE_VERSION),
                (Channel) ctx.channel()
        );
        client.setNettyChannel(ctx.channel());

        // Associate client with the channel
        ctx.channel().attr(MapleClient.CLIENT_KEY).set(client);

        // Send Hello packet (unencrypted initial handshake)
        byte[] hello = LoginPacket.getHello(ServerConstants.MAPLE_VERSION, ivSend, ivRecv);
        ctx.writeAndFlush(hello);
        
        System.out.println("[Netty] Session opened: " + address);
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();
        if (client != null) {
            client.disconnect(true, true);
            ctx.channel().attr(MapleClient.CLIENT_KEY).set(null);
        }
        System.out.println("[Netty] Session closed: " + ctx.channel().remoteAddress());
        super.channelInactive(ctx);
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, byte[] packet) throws Exception {
        final MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();
        
        if (client != null) {
            GameWorkerPool.submit(() -> {
                try {
                    MapleServerHandler.handlePacket(packet, client);
                } catch (Exception e) {
                    System.err.println("[Netty] Error handling packet from " + client.getRemoteAddress() + ":");
                    e.printStackTrace();
                }
            });
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // Reduced to just closing the context on critical errors without spamming the console
        if (!(cause instanceof java.io.IOException)) {
            // cause.printStackTrace();
        }
        ctx.close();
    }
}

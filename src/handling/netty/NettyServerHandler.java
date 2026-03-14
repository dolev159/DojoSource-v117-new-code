package handling.netty;

import client.MapleClient;
import handling.MapleServerHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import constants.ServerConstants;
import tools.MapleAESOFB;
import server.Randomizer;
import tools.packet.LoginPacket;

public class NettyServerHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        String address = ctx.channel().remoteAddress().toString();

        final byte ivRecv[] = new byte[] { (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255),
                (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255) };
        final byte ivSend[] = new byte[] { (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255),
                (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255) };

        final MapleClient client = new MapleClient(
                new MapleAESOFB(ivSend, (short) (0xFFFF - ServerConstants.MAPLE_VERSION)),
                new MapleAESOFB(ivRecv, ServerConstants.MAPLE_VERSION),
                (io.netty.channel.Channel) ctx.channel()
        );
        client.setNettyChannel(ctx.channel());

        ctx.channel().attr(MapleClient.CLIENT_KEY).set(client);

        // Send Hello packet
        byte[] hello = LoginPacket.getHello(ServerConstants.MAPLE_VERSION, ivSend, ivRecv);
        ctx.writeAndFlush(hello);

        System.out.println("[Netty] Session opened: " + address);
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();
        if (client != null) {
            byte state = MapleClient.CHANGE_CHANNEL;
            boolean loggedIn = client.isLoggedIn();
            if (loggedIn) {
                state = client.getLoginState();
            }
            try {
                if (state != MapleClient.CHANGE_CHANNEL && state != MapleClient.LOGIN_SERVER_TRANSITION) {
                    client.disconnect(true, false);
                }
            } finally {
                ctx.channel().attr(MapleClient.CLIENT_KEY).set(null);
            }
        }
        System.out.println("[Netty] Session closed: " + ctx.channel().remoteAddress());
        super.channelInactive(ctx);
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        byte[] packet = (byte[]) msg;
        MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();

        if (client != null) {
            MapleServerHandler.handlePacket(packet, client);
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        if (!(cause instanceof java.io.IOException)) {
            // cause.printStackTrace();
        }
        ctx.close();
    }
}

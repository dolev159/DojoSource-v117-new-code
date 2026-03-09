package handling.netty;

import client.MapleClient;
import handling.MapleServerHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.ChannelPromise;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;
import tools.MapleAESOFB;
import server.Randomizer;
import tools.packet.LoginPacket;
import constants.ServerConstants;
import io.netty.util.AttributeKey;

public class NettyServerHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        // Start IP checking (simplified for now, mimicking MapleServerHandler.sessionOpened)
        String address = ctx.channel().remoteAddress().toString().split(":")[0];
        // In a real implementation, you'd integrate the tracker/BlockedIP logic here.

        final byte ivRecv[] = new byte[]{(byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255)};
        final byte ivSend[] = new byte[]{(byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255)};

        final MapleClient client = new MapleClient(
                new MapleAESOFB(ivSend, (short) (0xFFFF - ServerConstants.MAPLE_VERSION)),
                new MapleAESOFB(ivRecv, ServerConstants.MAPLE_VERSION),
                null // We'll need to update MapleClient to handle Netty Channel or null-Mina Session
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
            client.disconnect(true, true);
            ctx.channel().attr(MapleClient.CLIENT_KEY).set(null);
        }
        System.out.println("[Netty] Session closed: " + ctx.channel().remoteAddress());
        super.channelInactive(ctx);
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        byte[] packet = (byte[]) msg;
        MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();
        
        if (client != null) {
            // Processing packet using the existing logic in MapleServerHandler
            // We might need to refactor handlePacket slightly or just call it
            MapleServerHandler.handlePacket(packet, client); 
        }
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof IdleStateEvent) {
            IdleStateEvent e = (IdleStateEvent) evt;
            if (e.state() == IdleState.READER_IDLE || e.state() == IdleState.WRITER_IDLE) {
                ctx.close();
            }
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // Log error
        // cause.printStackTrace();
        ctx.close();
    }
}

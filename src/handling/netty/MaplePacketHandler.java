package handling.netty;

import client.MapleClient;
import handling.MapleServerHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;
import tools.Randomizer;
import tools.packet.LoginPacket;
import constants.ServerConstants;
import tools.MapleAESOFB;

/**
 * MaplePacketHandler handles incoming decrypted packets.
 * Decouples game logic from the Netty Event Loop using GameWorkerPool.
 */
public class MaplePacketHandler extends SimpleChannelInboundHandler<byte[]> {

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        final String address = ctx.channel().remoteAddress().toString().split(":")[0];

        // Generate IVs for AES encryption
        final byte ivRecv[] = new byte[]{(byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255)};
        final byte ivSend[] = new byte[]{(byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255), (byte) Randomizer.nextInt(255)};

        final MapleClient client = new MapleClient(
                new MapleAESOFB(ivSend, (short) (0xFFFF - ServerConstants.MAPLE_VERSION)),
                new MapleAESOFB(ivRecv, ServerConstants.MAPLE_VERSION),
                null
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
            // DECOUPLING: Move heavy game logic to the GameWorkerPool
            // This prevents blocking the I/O event loop.
            GameWorkerPool.submit(() -> {
                try {
                    MapleServerHandler.handlePacket(packet, client);
                } catch (Exception e) {
                    // Log packet handling exception
                    System.err.println("[Netty] Error handling packet from " + client.getRemoteAddress() + ": " + e.getMessage());
                }
            });
        }
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof IdleStateEvent) {
            IdleStateEvent e = (IdleStateEvent) evt;
            if (e.state() == IdleState.READER_IDLE || e.state() == IdleState.WRITER_IDLE) {
                // Close connection on idle
                ctx.close();
            }
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // Silent close on network errors
        ctx.close();
    }
}

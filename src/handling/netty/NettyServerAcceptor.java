package handling.netty;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.epoll.Epoll;
import io.netty.channel.epoll.EpollEventLoopGroup;
import io.netty.channel.epoll.EpollServerSocketChannel;

public class NettyServerAcceptor {

    private final int port;
    private EventLoopGroup bossGroup;
    private EventLoopGroup workerGroup;
    private ChannelFuture channelFuture;
    private final boolean useEpoll;

    public NettyServerAcceptor(int port) {
        this.port = port;
        // Use Netty's built-in Epoll check + OS check
        boolean linux = System.getProperty("os.name").toLowerCase().contains("linux");
        this.useEpoll = linux && Epoll.isAvailable();
    }

    public void run() {
        // Boss thread for accepting connections, Worker pool for I/O operations
        bossGroup = useEpoll ? new EpollEventLoopGroup(1) : new NioEventLoopGroup(1);
        workerGroup = useEpoll ? new EpollEventLoopGroup() : new NioEventLoopGroup();

        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup)
                    .channel(useEpoll ? EpollServerSocketChannel.class : NioServerSocketChannel.class)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        public void initChannel(SocketChannel ch) throws Exception {
                            // Removed ReadTimeoutHandler per user request to prevent accidental disconnections
                            ch.pipeline().addLast("decoder", new NettyPacketDecoder());
                            ch.pipeline().addLast("encoder", new NettyPacketEncoder());
                            ch.pipeline().addLast("handler", new MaplePacketHandler());
                        }
                    })
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childOption(ChannelOption.ALLOCATOR, io.netty.buffer.PooledByteBufAllocator.DEFAULT)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    .childOption(ChannelOption.TCP_NODELAY, true);

            channelFuture = b.bind(port).sync();
            System.out.println("[Netty] Server listening on port " + port + (useEpoll ? " (using Native Epoll)" : " (using NIO)"));
        } catch (InterruptedException e) {
            System.err.println("[Netty] Server interrupted during bootstrap: " + e.getMessage());
            Thread.currentThread().interrupt(); // Restore interrupted status
        }
    }

    public void close() {
        if (channelFuture != null) {
            channelFuture.channel().close().syncUninterruptibly();
        }
        if (bossGroup != null) {
            bossGroup.shutdownGracefully();
        }
        if (workerGroup != null) {
            workerGroup.shutdownGracefully();
        }
    }
}

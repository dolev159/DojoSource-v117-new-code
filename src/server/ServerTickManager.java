package server;

import handling.channel.ChannelServer;
import client.MapleCharacter;
import server.maps.MapleMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Managed by ChannelServer.
 * Responsible for the main game engine heartbeat (ticks).
 */
public class ServerTickManager {
    private final ChannelServer channelServer;
    private ScheduledExecutorService executor;
    private final AtomicBoolean running = new AtomicBoolean(false);
    private static final int TICK_RATE = 100; // 100ms

    public ServerTickManager(ChannelServer channelServer) {
        this.channelServer = channelServer;
    }

    public void start() {
        if (running.compareAndSet(false, true)) {
            executor = Executors.newSingleThreadScheduledExecutor(r -> {
                Thread t = new Thread(r, "Channel-" + channelServer.getChannel() + "-TickManager");
                t.setPriority(Thread.MAX_PRIORITY);
                return t;
            });

            executor.scheduleAtFixedRate(this::tick, 0, TICK_RATE, TimeUnit.MILLISECONDS);
            System.out.println("Channel " + channelServer.getChannel() + " ServerTickManager started.");
        }
    }

    public void stop() {
        if (running.compareAndSet(true, false)) {
            if (executor != null) {
                executor.shutdown();
                try {
                    if (!executor.awaitTermination(1, TimeUnit.SECONDS)) {
                        executor.shutdownNow();
                    }
                } catch (InterruptedException e) {
                    executor.shutdownNow();
                }
            }
            System.out.println("Channel " + channelServer.getChannel() + " ServerTickManager stopped.");
        }
    }

    private void tick() {
        long now = System.currentTimeMillis();
        try {
            // 1. Update Map States (Mobs, Items)
            for (MapleMap map : channelServer.getMapFactory().getAllMaps()) {
                map.updateMobs(now);
                map.updateMapItems(now);
            }

            // 2. Update Character States (Regeneration, Timers)
            for (MapleCharacter chr : channelServer.getPlayerStorage().getAllCharacters()) {
                chr.updateStats(now);
            }

            // 2. Update Character States (Buffs, etc)
            for (MapleCharacter chr : channelServer.getPlayerStorage().getAllCharacters()) {
                chr.updateBuffs(now);
            }

            // 3. Process Expired Events / Other time-based logic
            channelServer.updateExpiredEvents(now);
            
        } catch (Exception e) {
            System.err.println("Error in ServerTickManager for channel " + channelServer.getChannel() + ": " + e.getMessage());
            e.printStackTrace();
        }
        
        long elapsed = System.currentTimeMillis() - now;
        if (elapsed > TICK_RATE) {
            System.err.println("Warning: Channel " + channelServer.getChannel() + " tick took " + elapsed + "ms! System is overloaded.");
        }
    }
}

package handling.channel;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import client.MapleCharacter;
import server.maps.MapleMap;
import tools.FileoutputUtil;

/**
 * ServerTickManager - The Heartbeat of the World.
 * Manages the main game loop for a specific ChannelServer.
 */
public class ServerTickManager {

    private final ScheduledExecutorService executor;
    private final ChannelServer cserv;
    private static final int TICK_INTERVAL = 100; // 100ms
    private final AtomicInteger tickCount = new AtomicInteger(0);

    public ServerTickManager(ChannelServer cserv) {
        this.cserv = cserv;
        this.executor = Executors.newSingleThreadScheduledExecutor(r -> {
            Thread t = new Thread(r, "ServerTick-Ch" + cserv.getChannel());
            t.setPriority(Thread.MAX_PRIORITY);
            return t;
        });
    }

    public void start() {
        executor.scheduleAtFixedRate(this::mainTick, 0, TICK_INTERVAL, TimeUnit.MILLISECONDS);
        System.out.println("[ServerTick] Started main loop for Channel " + cserv.getChannel() + " (Interval: " + TICK_INTERVAL + "ms)");
    }

    private void mainTick() {
        long startTime = System.currentTimeMillis();
        try {
            updateBuffs(startTime);
            updateMobs(startTime);
            updateMapItems(startTime);
            updateExpiredEvents(startTime);
        } catch (Throwable t) {
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, t);
            System.err.println("[ServerTick] Error in tick loop on Channel " + cserv.getChannel());
            t.printStackTrace();
        }

        long endTime = System.currentTimeMillis();
        long executionTime = endTime - startTime;

        // Health check: warn if the tick takes longer than the interval
        if (executionTime > TICK_INTERVAL) {
            System.err.println("[ServerTick] WARNING: Tick took " + executionTime + "ms on Channel " + cserv.getChannel() + " (Limit: " + TICK_INTERVAL + "ms)");
        }
        tickCount.incrementAndGet();
    }

    /**
     * Update player buffs and durations.
     */
    private void updateBuffs(long now) {
        for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
            if (chr != null) {
                chr.updateBuffs(now);
            }
        }
    }

    /**
     * Update monsters (HP regen, AI, and Respawn).
     */
    private void updateMobs(long now) {
        for (MapleMap map : cserv.getMapFactory().getAllMaps()) {
            if (map.getCharactersSize() > 0) {
                map.respawn(false, now);
            }
        }
    }

    /**
     * Manage item expiration on the ground.
     */
    private void updateMapItems(long now) {
        for (MapleMap map : cserv.getMapFactory().getAllMaps()) {
            if (map.getCharactersSize() > 0) {
                map.updateMapItems(now);
            }
        }
    }

    /**
     * Clean up expired events and instances.
     */
    private void updateExpiredEvents(long now) {
        // Implementation for EventInstanceManager cleanup if needed
    }

    public void stop() {
        executor.shutdown();
        try {
            if (!executor.awaitTermination(5, TimeUnit.SECONDS)) {
                executor.shutdownNow();
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
        System.out.println("[ServerTick] Stopped main loop for Channel " + cserv.getChannel());
    }
}

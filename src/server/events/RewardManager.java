package server.events;

import client.MapleCharacter;
import server.Timer.EtcTimer;
import server.maps.MapleMap;
import server.maps.MapleMapItem;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Handles instance-based rewards, participation tracking, and drop protection.
 * 
 * @author Lead Architect
 */
public class RewardManager {

    private static final int PROTECTION_DURATION_SECONDS = 30;
    private static final long PROTECTION_DURATION_MS = (long) PROTECTION_DURATION_SECONDS * 1000;
    
    // Maps EventInstance ID to its RewardManager instance
    private static final Map<Integer, RewardManager> instances = new ConcurrentHashMap<>();
    
    private final EventInstance eim;
    private final Map<Integer, MapleMapItem> protectedDrops = new ConcurrentHashMap<>();
    private final Map<Integer, Long> playerDamage = new ConcurrentHashMap<>();
    private long protectionEndTime = 0;

    private RewardManager(EventInstance eim) {
        this.eim = eim;
    }

    public static RewardManager getInstance(EventInstance eim) {
        return instances.computeIfAbsent(eim.hashCode(), k -> new RewardManager(eim));
    }

    public static void removeInstance(EventInstance eim) {
        instances.remove(eim.hashCode());
    }

    /**
     * Tracks damage dealt by a player in this instance.
     */
    public void addDamage(int characterId, long damage) {
        playerDamage.merge(characterId, damage, Long::sum);
    }

    /**
     * Registers a drop as part of this instance's rewards.
     */
    public void registerDrop(MapleMapItem item) {
        protectedDrops.put(item.getObjectId(), item);
    }

    /**
     * Checks if a player can pick up an item.
     */
    public boolean canPickup(MapleCharacter chr, MapleMapItem item) {
        // If it's not a protected drop, let normal logic handle it
        if (!protectedDrops.containsKey(item.getObjectId())) {
            return true;
        }

        // If protection is still active
        if (System.currentTimeMillis() < protectionEndTime) {
            // Only participants can pick up
            boolean isParticipant = eim.getPlayers().contains(chr);
            if (!isParticipant) {
                // Phase G: Error Reporting / Hacker Logging
                tools.FileoutputUtil.log(tools.FileoutputUtil.Hacker_Log, 
                    "[LootStealer] Player " + chr.getName() + " (ID: " + chr.getId() + ") " +
                    "tried to pick up protected loot (Item: " + item.getItemId() + ") " +
                    "in Instance: " + eim.getName() + " (ID: " + ((AbstractEventInstance)eim).getId() + ")"
                );
            }
            return isParticipant;
        }

        return true;
    }

    public int getProtectedDropCount() {
        return protectedDrops.size();
    }

    /**
     * Starts the 30-second protection window.
     */
    public void startProtectionTimer() {
        this.protectionEndTime = System.currentTimeMillis() + (PROTECTION_DURATION_SECONDS * 1000);
        
        // Schedule cleanup after protection expires
        EtcTimer.getInstance().schedule(this::cleanupUncollectedDrops, PROTECTION_DURATION_MS);
    }

    /**
     * Cleans up all uncollected drops belonging to this instance.
     */
    public void cleanupUncollectedDrops() {
        for (MapleCharacter chr : eim.getPlayers()) {
            MapleMap map = chr.getMap();
            if (map != null) {
                for (MapleMapItem item : protectedDrops.values()) {
                    if (map.getMapObject(item.getObjectId(), item.getType()) != null) {
                        map.removeMapObject(item);
                        // Optional: Broadcast item removal to clients if needed
                    }
                }
            }
        }
        protectedDrops.clear();
    }

    /**
     * Calculates participation rewards (bonus items/exp/etc).
     * This can be extended based on specific boss requirements.
     */
    public void distributeGlobalRewards() {
        long totalDamage = playerDamage.values().stream().mapToLong(Long::longValue).sum();
        if (totalDamage == 0) return;

        for (Map.Entry<Integer, Long> entry : playerDamage.entrySet()) {
            double participation = (double) entry.getValue() / totalDamage;
            // TODO: Apply bonus exp or special currency based on participation %
            // Example: eim.getChannelServer().getPlayerStorage().getCharacterById(entry.getKey()).gainExp(...);
        }
    }
}

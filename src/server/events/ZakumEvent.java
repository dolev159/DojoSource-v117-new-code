package server.events;

import java.awt.Point;
import java.util.List;
import client.MapleCharacter;
import handling.channel.ChannelServer;
import handling.world.MaplePartyCharacter;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;

/**
 * ZakumEvent - Proof of Concept for the new Event system.
 * Handles map isolation, party requirements, boss spawning, and cleanup.
 */
public class ZakumEvent extends AbstractEventInstance {

    private static final int ZAKUM_MAP_ID = 280030000;
    private static final int ZAKUM_BOSS_ID = 8800002; // Zakum's body
    private static final long DURATION_MS = 60 * 60 * 1000; // 60 minutes
    private static final int RETURN_MAP_ID = 211042300; // Dead Mine: El Nath
    private int currentPhase = 1;

    public ZakumEvent(String eventName, int channelId) {
        super(eventName, channelId);
    }

    @Override
    public void startInstance() {
        this.startTime = System.currentTimeMillis();
        this.expirationTime = startTime + DURATION_MS;

        // 1. Clone the Zakum Map to isolate this group
        ChannelServer channel = ChannelServer.getInstance(channelId);
        int instanceId = scripting.EventScriptManager.getNewInstanceMapId();
        
        // MapleMapFactory.CreateInstanceMap(mapid, respawns, npcs, reactors, instanceid)
        MapleMap isolatedMap = channel.getMapFactory().CreateInstanceMap(ZAKUM_MAP_ID, false, true, true, instanceId);
        
        if (isolatedMap != null) {
            mapInstances.add(isolatedMap);
            isolatedMap.setEventInstance(this); // Associate map with this event
            
            // 2. Spawn Zakum at a specific location
            MapleMonster zakum = MapleLifeFactory.getMonster(ZAKUM_BOSS_ID);
            if (zakum != null) {
                // Link the complex AI to this boss
                zakum.setPriorityAI(new server.life.BossAI());
                
                // Fixed spawn position for Zakum (Altar center)
                isolatedMap.spawnMonsterOnGroundBelow(zakum, new Point(0, -215));
            }
        }
        
        System.out.println("[ZakumEvent] Started instance " + id + " on channel " + channelId);
    }

    @Override
    public void registerPlayer(MapleCharacter chr) {
        if (chr == null || disposed) return;

        // Requirements: Player MUST be in a party
        if (chr.getParty() == null) {
            chr.dropMessage(5, "You must be in a party to challenge Zakum.");
            return;
        }

        // Registry logic: Only the leader can register the whole party
        // But for this POC, we register them as they enter.
        
        super.registerPlayer(chr);
        
        // Warp the player into the instance map
        if (!mapInstances.isEmpty()) {
            MapleMap target = mapInstances.get(0);
            chr.changeMap(target, target.getPortal(0));
        }
    }

    @Override
    public void dispose() {
        if (disposed) return;
        
        System.out.println("[ZakumEvent] Disposing instance " + id);
        
        // Finalize results and distribute global rewards (e.g. bonus exp, medals)
        RewardManager.getInstance(this).distributeGlobalRewards();
        
        // Warp all players out safely before destroying maps
        MapleMap returnMap = ChannelServer.getInstance(channelId).getMapFactory().getMap(RETURN_MAP_ID);
        for (MapleCharacter chr : players) {
            if (chr != null && chr.getMapId() == mapInstances.get(0).getId()) { // Check if still in instance
                chr.changeMap(returnMap, returnMap.getPortal(0));
                chr.dropMessage(6, "The Zakum instance has ended.");
            }
        }

        // Safety: Clean up all monsters in the maps
        for (MapleMap map : mapInstances) {
            map.killAllMonsters(false);
        }

        super.dispose();
    }

    public void nextPhase() {
        this.currentPhase++;
    }

    @Override
    public String getStatus() {
        return "Phase " + currentPhase;
    }
}

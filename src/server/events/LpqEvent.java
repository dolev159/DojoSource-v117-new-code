package server.events;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;
import client.MapleCharacter;
import handling.channel.ChannelServer;
import server.MaplePortal;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;

/**
 * LpqEvent - Ludibrium Party Quest implementation using State Machine.
 * Manages multiple maps, stage transitions, and party synchronization.
 */
public class LpqEvent extends AbstractEventInstance {

    private int currentStage = 0;
    
    // LPQ Map sequence
    private static final int[] LPQ_MAPS = {
        221024500, // Stage 1
        221024501, // Stage 2
        221024502, // Stage 3
        221024503, // Stage 4
        221024504, // Stage 5
        221024505, // Stage 6
        221024506, // Stage 7
        221024507, // Stage 8
        221024508  // Boss (Alishar)
    };
    
    private static final int BONUS_MAP = 221024509;
    private static final int EXIT_MAP = 221023300;
    private static final long TIME_LIMIT = 60 * 60 * 1000; // 60 mins

    public LpqEvent(String eventName, int channelId) {
        super(eventName, channelId);
    }

    @Override
    public void lock() {
        this.lastWarpTime = System.currentTimeMillis();
    }

    /**
     * Called when a player logs off or disconnects.
     */
    public void onPlayerLogoff(MapleCharacter chr) {
        unregisterPlayer(chr);
        if (players.isEmpty()) {
            dispose();
        }
    }

    @Override
    public void startInstance() {
        this.startTime = System.currentTimeMillis();
        this.expirationTime = startTime + TIME_LIMIT;
        this.currentStage = 1;

        ChannelServer channel = ChannelServer.getInstance(channelId);
        int instanceId = scripting.EventScriptManager.getNewInstanceMapId();

        // 1. Clone all LPQ maps immediately for isolation
        for (int mapId : LPQ_MAPS) {
            MapleMap clonedMap = channel.getMapFactory().CreateInstanceMap(mapId, false, true, true, instanceId);
            if (clonedMap != null) {
                mapInstances.add(clonedMap);
                // Initially close exit portals for stages
                for (MaplePortal portal : clonedMap.getPortals()) {
                    if (portal.getName().equals("next00")) {
                        portal.setPortalState(false);
                    }
                }
            }
        }
        
        System.out.println("[LPQ] Instance " + id + " initialized with " + mapInstances.size() + " maps.");
        initStage(1);
    }

    /**
     * Initializes a specific stage (spawning mobs, etc).
     */
    private void initStage(int stage) {
        System.out.println("[LPQ] Entering Stage " + stage);
        MapleMap map = getMapByStage(stage);
        if (map == null) return;

        switch (stage) {
            case 1:
                // Spawn Ratz or other mobs for Stage 1
                spawnMobs(map, 9300000, 10, new Point(0, 0)); 
                break;
            case 9:
                // Boss Alishar
                MapleMonster alishar = MapleLifeFactory.getMonster(9300012);
                if (alishar != null) {
                    map.spawnMonsterOnGroundBelow(alishar, new Point(0, -215));
                }
                break;
            default:
                break;
        }
    }

    /**
     * State Machine: Transitions to the next stage.
     */
    public void nextStage(MapleCharacter chr) {
        if (disposed || isLocked()) return;
        
        // 1. Leader Check
        if (!isLeader(chr)) {
            chr.dropMessage(5, "Only the leader can trigger the next stage.");
            return;
        }

        // 2. Validate All Parties / Players
        MapleMap currentMap = getMapByStage(currentStage);
        if (!PartyValidator.allMembersInMap(players, currentMap)) {
            PartyValidator.sendMessage(players, "All members must be in this map to proceed!");
            return;
        }

        System.out.println("[LPQ] Transitioning from Stage " + currentStage);
        
        // 2. Open the portal for the current stage
        if (currentMap != null) {
            for (MaplePortal portal : currentMap.getPortals()) {
                if (portal.getName().equals("next00")) {
                    portal.setPortalState(true);
                    currentMap.broadcastMessage(tools.packet.CField.environmentChange("gate", 2));
                    currentMap.broadcastMessage(tools.packet.CField.environmentChange("quest/party/clear", 3));
                }
            }
        }

        // 2. Increment state
        currentStage++;
        
        // 3. Init next stage logic if not finished
        if (currentStage <= LPQ_MAPS.length) {
            initStage(currentStage);
        } else {
            // Completed all stages!
            finishPQ();
        }
    }

    /**
     * Warps the entire expedition to a specific map in the instance.
     */
    public void warpParty(int stageId) {
        if (isLocked()) return;
        lock(); // Apply 3-second sync lock

        MapleMap targetMap = getMapByStage(stageId);
        if (targetMap == null) return;

        warpExpedition(targetMap, 0);
    }

    private void finishPQ() {
        // Warp to Bonus map
        ChannelServer channel = ChannelServer.getInstance(channelId);
        MapleMap bonus = channel.getMapFactory().getMap(BONUS_MAP);
        for (MapleCharacter chr : players) {
            chr.changeMap(bonus, bonus.getPortal(0));
        }
        // Set short expiration for bonus
        this.expirationTime = System.currentTimeMillis() + (5 * 60 * 1000); // 5 mins for bonus
    }

    @Override
    public void dispose() {
        if (disposed) return;
        
        // Warp out to exit map
        MapleMap exit = ChannelServer.getInstance(channelId).getMapFactory().getMap(EXIT_MAP);
        for (MapleCharacter chr : players) {
            chr.changeMap(exit, exit.getPortal(0));
        }
        
        // Clean up all monsters in all cloned maps
        for (MapleMap map : mapInstances) {
            map.killAllMonsters(false);
        }

        super.dispose();
    }

    private MapleMap getMapByStage(int stage) {
        if (stage < 1 || stage > mapInstances.size()) return null;
        return mapInstances.get(stage - 1);
    }

    private void spawnMobs(MapleMap map, int mobId, int count, Point center) {
        for (int i = 0; i < count; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(mobId);
            if (mob != null) {
                map.spawnMonsterOnGroundBelow(mob, new Point(center.x + (i * 50), center.y));
            }
        }
    }

    public long getTimeLeft(long now) {
        return Math.max(0, expirationTime - now);
    }

    /**
     * Checks if the character is the leader of the expedition or the first party.
     */
    public boolean isLeader(MapleCharacter chr) {
        if (chr == null) return false;
        if (expedition != null) {
            return chr.getId() == expedition.getLeader();
        }
        // Fallback: Check if they are the party leader of the first party registered
        if (chr.getParty() != null) {
            return chr.getParty().getLeader().getId() == chr.getId();
        }
        return false;
    }

    public int getCurrentStage() {
        return currentStage;
    }

    @Override
    public String getStatus() {
        return "Stage " + currentStage;
    }
}

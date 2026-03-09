package server.events;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import client.MapleCharacter;
import handling.world.exped.MapleExpedition;
import server.maps.MapleMap;
import handling.world.MapleParty;
import handling.world.World;
import handling.channel.ChannelServer;

/**
 * AbstractEventInstance - The base for all isolated game content (PQs, Bosses).
 * Handles isolated map instances, player registration, and lifecycle.
 */
public abstract class AbstractEventInstance implements EventInstance {
    
    @Override
    public String getName() {
        return eventName;
    }

    protected final String id;
    protected final String eventName;
    protected final int channelId;
    protected final List<MapleCharacter> players = new CopyOnWriteArrayList<>();
    protected final List<MapleMap> mapInstances = new ArrayList<>();
    
    protected long startTime;
    protected long expirationTime;
    protected long lastWarpTime = 0; // Lock mechanism
    protected boolean disposed = false;
    protected MapleExpedition expedition;
    protected long lastTickDuration = 0;
    protected String status = "Idle";

    public AbstractEventInstance(String eventName, int channelId) {
        this.id = java.util.UUID.randomUUID().toString();
        this.eventName = eventName;
        this.channelId = channelId;
    }

    /**
     * Checks if the instance is currently locked (e.g. during transitions).
     */
    public boolean isLocked() {
        return System.currentTimeMillis() - lastWarpTime < 3000; // 3 seconds lock
    }

    public void lock() {
        this.lastWarpTime = System.currentTimeMillis();
    }

    public void setExpedition(MapleExpedition expedition) {
        this.expedition = expedition;
    }

    public MapleExpedition getExpedition() {
        return expedition;
    }

    /**
     * Warps the entire expedition to a target map and portal.
     */
    public void warpExpedition(MapleMap target, int portalId) {
        if (expedition == null) {
            // Fallback to players list if no expedition
            for (MapleCharacter chr : players) {
                chr.changeMap(target, target.getPortal(portalId));
            }
            return;
        }

        ChannelServer channel = ChannelServer.getInstance(channelId);
        for (int partyId : expedition.getParties()) {
            MapleParty party = World.Party.getParty(partyId);
            if (party != null) {
                for (handling.world.MaplePartyCharacter mpc : party.getMembers()) {
                    MapleCharacter chr = channel.getPlayerStorage().getCharacterById(mpc.getId());
                    if (chr != null && players.contains(chr)) {
                        chr.changeMap(target, target.getPortal(portalId));
                    }
                }
            }
        }
    }

    /**
     * Checks if all parties in the expedition are in the same lobby map.
     */
    public boolean allPartiesReady(MapleMap lobbyMap) {
        if (expedition == null) return true;
        
        ChannelServer channel = ChannelServer.getInstance(channelId);
        for (int partyId : expedition.getParties()) {
            MapleParty party = World.Party.getParty(partyId);
            if (party != null) {
                for (handling.world.MaplePartyCharacter mpc : party.getMembers()) {
                    MapleCharacter chr = channel.getPlayerStorage().getCharacterById(mpc.getId());
                    if (chr == null || chr.getMapId() != lobbyMap.getId()) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public String getId() {
        return id;
    }

    public String getEventName() {
        return eventName;
    }

    /**
     * Initializes the instance, clones maps, and sets up the environment.
     */
    public abstract void startInstance();

    /**
     * Registers a player to this instance.
     */
    public void registerPlayer(MapleCharacter chr) {
        if (disposed || chr == null) {
            return;
        }
        if (!players.contains(chr)) {
            players.add(chr);
        }
    }

    /**
     * Unregisters a player from this instance.
     */
    public void unregisterPlayer(MapleCharacter chr) {
        players.remove(chr);
    }

    /**
     * Disposes of the instance, cleaning up maps and removing players.
     */
    public void dispose() {
        if (disposed) {
            return;
        }
        disposed = true;
        
        for (MapleCharacter chr : players) {
            unregisterPlayer(chr);
        }
        
        // Cleanup map instances from factory
        for (MapleMap map : mapInstances) {
            ChannelServer.getInstance(channelId).getMapFactory().removeInstanceMap(map.getInstanceId());
        }
        
        mapInstances.clear();
        players.clear();
        
        RewardManager.removeInstance(this);
        EventInstanceManager.getInstance().unregisterInstance(this.id);
    }

    public boolean isExpired(long now) {
        return expirationTime > 0 && now >= expirationTime;
    }

    public List<MapleCharacter> getPlayers() {
        return Collections.unmodifiableList(players);
    }

    public List<MapleMap> getMapInstances() {
        return Collections.unmodifiableList(mapInstances);
    }

    public long getStartTime() {
        return startTime;
    }

    @Override
    public void monsterDamaged(MapleCharacter chr, server.life.MapleMonster mob, int damage) {
        RewardManager.getInstance(this).addDamage(chr.getId(), damage);
    }

    @Override
    public void monsterKilled(MapleCharacter chr, server.life.MapleMonster mob) {
        // Handle logic when a specific monster dies in the instance
    }

    public long getTimeLeft(long now) {
        return Math.max(0, expirationTime - now);
    }

    @Override
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public long getLastTickDuration() {
        return lastTickDuration;
    }

    public void setLastTickDuration(long duration) {
        this.lastTickDuration = duration;
    }
}

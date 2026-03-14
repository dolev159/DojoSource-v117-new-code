package server.pqs;

import server.maps.MapleMap;
import handling.world.MapleParty;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.atomic.AtomicInteger;
import tools.packet.CField;
import client.MapleCharacter;
import handling.channel.ChannelServer;

import tools.packet.CWvsContext;
import java.util.Collection;
import server.Timer.EventTimer;
import java.util.concurrent.ScheduledFuture;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Represents an active PQ instance.
 */
public class MaplePQInstance {
    private static final AtomicInteger idCounter = new AtomicInteger(1);
    private final int id;
    private final List<MapleParty> parties = new ArrayList<>();
    private final List<MapleMap> maps = new ArrayList<>();
    private final Map<String, String> properties = new HashMap<>();
    private final List<ScheduledFuture<?>> tasks = new ArrayList<>();
    private final MaplePQHandler handler;
    private long startTime;
    private int timeLimitSeconds;

    public MaplePQInstance(MapleParty party, MaplePQHandler handler) {
        this.id = idCounter.getAndIncrement();
        this.parties.add(party);
        this.handler = handler;
    }

    public void addParty(MapleParty party) {
        this.parties.add(party);
    }

    public List<MapleParty> getParties() {
        return parties;
    }

    public List<MapleCharacter> getPlayers() {
        List<MapleCharacter> players = new ArrayList<>();
        for (MapleParty p : parties) {
            for (handling.world.MaplePartyCharacter member : p.getMembers()) {
                MapleCharacter chr = ChannelServer.getInstance(member.getChannel()).getPlayerStorage().getCharacterById(member.getId());
                if (chr != null && chr.getMap().getInstanceId() == id) {
                    players.add(chr);
                }
            }
        }
        return players;
    }

    public void broadcastPlayerMsg(int type, String msg) {
        byte[] packet = CWvsContext.serverNotice(type, msg);
        broadcastMessage(packet);
    }

    public MaplePQHandler getHandler() {
        return handler;
    }

    public int getId() {
        return id;
    }

    public void addMap(MapleMap map) {
        maps.add(map);
        map.setEventInstance(null); // Clear any legacy event references
        map.setInstanceId(id);
    }

    public void setProperty(String key, String value) {
        properties.put(key, value);
    }

    public String getProperty(String key) {
        return properties.get(key);
    }

    public void broadcastMessage(byte[] packet) {
        for (MapleMap map : maps) {
            map.broadcastMessage(packet);
        }
    }

    public void startEventTimer(int seconds) {
        this.startTime = System.currentTimeMillis();
        this.timeLimitSeconds = seconds;
        broadcastMessage(CField.getClock(seconds));
    }

    public void warpParty(int mapId) {
        for (MapleParty p : parties) {
            for (handling.world.MaplePartyCharacter member : p.getMembers()) {
                MapleCharacter chr = ChannelServer.getInstance(member.getChannel()).getPlayerStorage().getCharacterById(member.getId());
                if (chr != null) {
                    chr.changeMap(getMapById(mapId));
                }
            }
        }
    }

    public MapleMap getMap(int mapId) {
        return getMapById(mapId);
    }

    private MapleMap getMapById(int mapId) {
        for (MapleMap map : maps) {
            if (map.getId() == mapId) {
                return map;
            }
        }
        return null;
    }

    public void start() {
        this.startTime = System.currentTimeMillis();
    }

    public void scheduleTask(final String taskName, long delayMs) {
        ScheduledFuture<?> future = EventTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                handler.onTaskTrigger(MaplePQInstance.this, taskName);
            }
        }, delayMs);
        tasks.add(future);
    }

    public void dispose() {
        cleanup();
        for (ScheduledFuture<?> future : tasks) {
            if (future != null) {
                future.cancel(false);
            }
        }
        tasks.clear();
        MaplePQEngine.getInstance().removeInstance(this.id);
    }

    public void cleanup() {
        for (MapleMap map : maps) {
            map.resetFully();
            map.setInstanceId(-1);
        }
    }
}

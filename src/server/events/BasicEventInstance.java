package server.events;

import java.util.UUID;
import client.MapleCharacter;
import server.maps.MapleMap;

/**
 * BasicEventInstance - A standard implementation of an event instance.
 */
public class BasicEventInstance extends AbstractEventInstance {

    public BasicEventInstance(String eventName, long durationMs) {
        super(eventName, -1);
        this.startTime = System.currentTimeMillis();
        this.expirationTime = startTime + durationMs;
    }

    @Override
    public void startInstance() {
        System.out.println("[EIM] Starting instance " + id + " for event " + eventName);
        // Map cloning logic would go here, e.g.:
        // MapleMap clonedMap = channel.getMapFactory().CreateInstanceMap(100000000, true, true, true, EventScriptManager.getNewInstanceMapId());
        // mapInstances.add(clonedMap);
    }

    @Override
    public void registerPlayer(MapleCharacter chr) {
        super.registerPlayer(chr);
        if (mapInstances.size() > 0) {
            chr.changeMap(mapInstances.get(0), mapInstances.get(0).getPortal(0));
        }
    }
}

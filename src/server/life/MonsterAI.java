package server.life;

import server.events.EventInstance;

/**
 * MonsterAI - Interface for custom monster behaviors and finite state machines.
 */
public interface MonsterAI {
    
    /**
     * Called periodically by the server heartbeat to update monster logic.
     * @param monster The monster instance.
     * @param eim The event instance (if applicable).
     */
    void tick(MapleMonster monster, EventInstance eim);
}

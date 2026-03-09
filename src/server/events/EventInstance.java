package server.events;

import java.util.List;
import client.MapleCharacter;
import server.maps.MapleMap;

/**
 * EventInstance - Uniform interface for all event instances (old and new).
 */
public interface EventInstance {
    String getName();
    List<MapleCharacter> getPlayers();
    List<MapleMap> getMapInstances();
    void dispose();

    void monsterDamaged(MapleCharacter chr, server.life.MapleMonster mob, int damage);
    void monsterKilled(MapleCharacter chr, server.life.MapleMonster mob);
    
    // Phase G: Observability
    String getStatus();
    long getLastTickDuration();
}

package server.events;

import java.awt.Rectangle;
import java.util.List;
import client.MapleCharacter;
import server.maps.MapleMap;

/**
 * PartyValidator - Utility for performing atomic checks on a group of players.
 */
public class PartyValidator {

    /**
     * Checks if all players in the provided list are currently in the specified map.
     */
    public static boolean allMembersInMap(List<MapleCharacter> players, MapleMap map) {
        if (players.isEmpty() || map == null) {
            return false;
        }
        for (MapleCharacter chr : players) {
            if (chr == null || chr.getMapId() != map.getId()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if all players are alive.
     */
    public static boolean allMembersAlive(List<MapleCharacter> players) {
        for (MapleCharacter chr : players) {
            if (chr == null || !chr.isAlive()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if every player is within the specified bounds (platform/area).
     */
    public static boolean allMembersOnPlatform(List<MapleCharacter> players, Rectangle bounds) {
        if (bounds == null) return true;
        for (MapleCharacter chr : players) {
            if (chr == null || !bounds.contains(chr.getPosition())) {
                return false;
            }
        }
        return true;
    }

    /**
     * Sends a message to all players in the list.
     */
    public static void sendMessage(List<MapleCharacter> players, String message) {
        for (MapleCharacter chr : players) {
            if (chr != null) {
                chr.dropMessage(5, message);
            }
        }
    }
}

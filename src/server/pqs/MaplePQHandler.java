package server.pqs;

import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.life.MapleMonster;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Base template for all Party Quest handlers.
 */
public abstract class MaplePQHandler {

    protected int minLevel;
    protected int maxLevel;
    protected int minPartySize;
    protected int maxPartySize;

    public MaplePQHandler(int minLevel, int maxLevel, int minPartySize, int maxPartySize) {
        this.minLevel = minLevel;
        this.maxLevel = maxLevel;
        this.minPartySize = minPartySize;
        this.maxPartySize = maxPartySize;
    }

    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        // Default implementation does nothing
    }

    public void onTaskTrigger(MaplePQInstance instance, String taskName) {
        // Default implementation does nothing
    }

    public boolean validate(MapleParty party, NPCConversationManager cm) {
        if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
            cm.sendOk("You can't enter alone. If you want to enter, the party leader must talk to me.");
            return false;
        }

        if (party.getMembers().size() < minPartySize || party.getMembers().size() > maxPartySize) {
            cm.sendOk("You need a party of " + minPartySize + " to " + maxPartySize + " people to enter.");
            return false;
        }

        for (handling.world.MaplePartyCharacter member : party.getMembers()) {
            if (member.getLevel() < minLevel || member.getLevel() > maxLevel) {
                cm.sendOk("One of your party members does not meet the level requirement.");
                return false;
            }
        }
        return true;
    }

    public abstract MaplePQInstance createInstance(MapleParty party);
}

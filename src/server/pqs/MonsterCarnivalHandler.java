package server.pqs;

import java.util.List;
import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.maps.MapleMapFactory;
import server.maps.MapleMap;
import handling.channel.ChannelServer;
import client.MapleCharacter;
import tools.packet.CField;
import tools.packet.CWvsContext;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Monster Carnival 1 & 2.
 */
public class MonsterCarnivalHandler extends MaplePQHandler {

    public MonsterCarnivalHandler() {
        super(30, 200, 2, 6); // Lv 30-200, 2-6 players per party
    }

    @Override
    public boolean validate(MapleParty party, NPCConversationManager cm) {
        if (!super.validate(party, cm)) {
            return false;
        }
        return true;
    }

    @Override
    public MaplePQInstance createInstance(MapleParty party) {
        MaplePQInstance instance = new MaplePQInstance(party, this);
        instance.setProperty("started", "false");
        
        // Maps will be added when the game starts/room is selected
        // We'll manage maps inside the instance
        
        return instance;
    }

    /**
     * Specialized join for Carnival PQs
     */
    public boolean joinInstance(MaplePQInstance instance, MapleParty challenger) {
        if (instance.getParties().size() >= 2) {
            return false;
        }
        instance.addParty(challenger);
        instance.setProperty("started", "waiting_to_start");
        instance.broadcastPlayerMsg(5, "A challenger has joined! The match will start shortly.");
        
        // Start countdown to warp
        instance.startEventTimer(10); 
        return true;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, server.life.MapleMonster mob) {
        // CP gain logic
    }
}

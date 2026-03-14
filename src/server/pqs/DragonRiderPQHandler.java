package server.pqs;

import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.maps.MapleMapFactory;
import server.maps.MapleMap;
import handling.channel.ChannelServer;
import client.MapleCharacter;
import java.awt.Point;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import tools.packet.CField;
import tools.packet.CWvsContext;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Dragon Rider PQ.
 */
public class DragonRiderPQHandler extends MaplePQHandler {

    public DragonRiderPQHandler() {
        super(120, 200, 3, 6); // Lv 120+, 3-6 players
    }

    @Override
    public boolean validate(MapleParty party, NPCConversationManager cm) {
        if (!super.validate(party, cm)) {
            return false;
        }
        // Check for Soaring skill? 
        return true;
    }

    @Override
    public MaplePQInstance createInstance(MapleParty party) {
        MaplePQInstance instance = new MaplePQInstance(party, this);
        int channel = party.getLeader().getChannel();
        MapleMapFactory mf = ChannelServer.getInstance(channel).getMapFactory();

        // Register Maps - Dragon Rider sequence
        int[] maps = {240080100, 240080200, 240080300, 240080400, 240080500};
        
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            if (map != null) {
                instance.addMap(map);
                map.resetFully();
            }
        }

        instance.setProperty("state", "1");

        // Start 20 minute timer
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(240080100);
        
        instance.broadcastPlayerMsg(5, "You are entering Crimson Sky.");

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        MapleMap map = mob.getMap();
        
        if (map.getId() == 240080100 || map.getId() == 240080200) {
            int remaining = map.getAllMonstersThreadsafe().size();
            if (remaining > 0) {
                map.broadcastMessage(CWvsContext.getTopMsg("There are " + remaining + " monsters left."));
            } else {
                map.broadcastMessage(CWvsContext.getTopMsg("Please use the portal to move on to the next stage."));
                map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
                map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
            }
        } else if (mobId == 8300006 || mobId == 8300007) { // Bosses
            map.broadcastMessage(CWvsContext.getTopMsg("The portal has been opened."));
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
            if (mobId == 8300007) {
                 map.spawnNpc(2085003, new Point(-337, -10)); // Reward NPC
            }
        }
    }
}

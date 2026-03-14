package server.pqs;

import java.awt.Point;
import java.util.Random;

import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import handling.channel.ChannelServer;
import tools.packet.CField;
import tools.packet.CWvsContext;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Kenta in Danger PQ.
 */
public class KentaPQHandler extends MaplePQHandler {

    public KentaPQHandler() {
        super(120, 200, 2, 6); // Lv 120+, 2-6 players
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
        int channel = party.getLeader().getChannel();
        MapleMapFactory mf = ChannelServer.getInstance(channel).getMapFactory();

        // Register Maps - Kenta PQ sequence
        int[] maps = {923040100, 923040200, 923040300, 923040400};
        
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            if (map != null) {
                instance.addMap(map);
                map.resetFully();
            }
        }

        instance.setProperty("state", "1");
        
        // Initial spawns in stage 3 & 4
        MapleMap stage3 = instance.getMap(923040300);
        if (stage3 != null) {
            stage3.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9300460), new Point(0, 620)); // Kenta to protect
            stage3.setSpawns(false);
        }
        
        MapleMap stage4 = instance.getMap(923040400);
        if (stage4 != null) {
            stage4.spawnNpc(9020004, new Point(-161, 123)); // Kenta Reward NPC
            stage4.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9300461), new Point(400, 123)); // Pianus
            stage4.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9300468), new Point(-1000, 123)); // Pianus
        }

        // Start 20 minute timer
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(923040100);

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        MapleMap map = mob.getMap();
        
        if (mobId == 9300460) { // Kenta died
             instance.broadcastPlayerMsg(6, "You have failed the mission because the Kenta you were guarding died.");
             instance.dispose();
        } else if (mobId == 9300461 || mobId == 9300468) { // Pianus
             // Both must be killed logic would go here
             map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
             map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
             map.startMapEffect("You beat Pianus!!!", 5120052);
        }
    }
}

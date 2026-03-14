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
 * Java Implementation of Escape PQ (Prison).
 */
public class EscapePQHandler extends MaplePQHandler {

    public EscapePQHandler() {
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

        // Register Maps - Escape PQ sequence
        int[] maps = {921160100, 921160200, 921160300, 921160310, 921160320, 921160330, 921160340, 921160350, 921160400, 921160500, 921160600, 921160700};
        
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            if (map != null) {
                instance.addMap(map);
                map.resetFully();
            }
        }

        instance.setProperty("state", "1");
        
        // Spawn Boss on the last map
        MapleMap lastMap = instance.getMap(921160700);
        if (lastMap != null) {
            lastMap.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9300454), new Point(-961, -186)); // Prison Guard Ani
        }

        // Start 20 minute timer
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(921160100);

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        MapleMap map = mob.getMap();
        int mapId = map.getId();
        
        if (mapId == 921160200 || mapId == 921160400) {
            if (map.getAllMonstersThreadsafe().size() < 1) {
                map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
                map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
            }
        } else if (mobId == 9300454) { // Ani killed
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
            map.spawnNpc(9020006, new Point(-1561, -186));
            map.startMapEffect("You finally defeated Prison Guard Ani.", 5120053);
        }
    }
}

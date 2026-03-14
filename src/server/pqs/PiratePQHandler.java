package server.pqs;

import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.maps.MapleMapFactory;
import server.maps.MapleMap;
import handling.channel.ChannelServer;
import server.life.MapleMonster;
import tools.packet.CField;
import tools.packet.CWvsContext;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Lord Pirate PQ.
 */
public class PiratePQHandler extends MaplePQHandler {

    public PiratePQHandler() {
        super(70, 200, 3, 6); // Lv 70+, 3-6 players
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

        // Register Maps - Pirate PQ sequence
        int[] maps = {925100000, 925100100, 925100200, 925100300, 925100400, 925100500, 925100700};
        
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            instance.addMap(map);
            if (mapId == 925100100 || mapId == 925100400) {
                map.killAllMonsters(true);
                map.setSpawns(false);
            }
        }

        instance.setProperty("state", "1");
        
        // Start 20 minute timer
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(925100000);

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        MapleMap map = mob.getMap();
        
        if (mobId == 9300119 || mobId == 9300105 || mobId == 9300106) { // Lord Pirate
            map.broadcastMessage(CWvsContext.serverNotice(5, "The Lord Pirate has been defeated!"));
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
            instance.setProperty("state", "2");
        }
    }
}

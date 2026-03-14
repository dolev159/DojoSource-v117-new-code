package server.pqs;

import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.maps.MapleMapFactory;
import server.maps.MapleMap;
import handling.channel.ChannelServer;
import server.life.MapleMonster;
import tools.packet.CWvsContext;
import tools.packet.CField;
import java.awt.Point;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Romeo PQ.
 */
public class RomeoPQHandler extends MaplePQHandler {

    public RomeoPQHandler() {
        super(70, 200, 4, 4); // Lv 70+, exactly 4 players
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

        // Register Maps - Romeo sequence (926100000 - 926100600)
        int[] maps = {926100000, 926100001, 926100100, 926100200, 926100201, 926100202, 926100203,
                      926100300, 926100301, 926100302, 926100303, 926100304, 926100400, 926100401,
                      926100500, 926100600};
        
        for (int mapId : maps) {
            instance.addMap(mf.getMap(mapId));
        }

        // Spawn NPCs
        mf.getMap(926100203).spawnNpc(2112000, new Point(200, 188));
        mf.getMap(926100401).spawnNpc(2112000, new Point(200, 100));
        mf.getMap(926100500).spawnNpc(2112001, new Point(200, 100));
        mf.getMap(926100600).spawnNpc(2112002, new Point(400, 100));
        mf.getMap(926100600).spawnNpc(2112018, new Point(200, 100));

        instance.setProperty("state", "1");
        instance.setProperty("whog_hp", "0");
        
        // Start 20 minute timer
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(926100000);

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        MapleMap map = mob.getMap();
        
        if ((mobId == 9300145 || mobId == 9300146) && map.getAllMonstersThreadsafe().size() <= 1) { // 1 because this one might still be in the list
            map.broadcastMessage(CWvsContext.serverNotice(5, "The entrance to the next area has been opened."));
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
        }
        
        if ((mobId == 9300143 || mobId == 9300144) && map.getAllMonstersThreadsafe().size() <= 1) {
            map.broadcastMessage(CWvsContext.serverNotice(5, "The entrance to the next area has been opened."));
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
            // Trigger reactor
            map.getReactorByName("rnj6_out").forceHitReactor((byte) 1);
        }
        
        if (mobId == 9300139 || mobId == 9300140) {
            instance.startEventTimer(3 * 60);
            instance.setProperty("stage7", "2");
            
            map.killMonster(9300150);
            map.killMonster(9300150);
            map.setSpawns(false);
            map.spawnNpc(2112006, new Point(50, 100));
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
        }
        
        if (mobId == 9300137) {
            map.broadcastMessage(CWvsContext.serverNotice(5, "Saving Juliet failed."));
        }
    }
}

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

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Hoblin PQ (Resurrection of the Hoblin King).
 */
public class HoblinPQHandler extends MaplePQHandler {

    public HoblinPQHandler() {
        super(70, 200, 2, 6); // Lv 70+, 2-6 players
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

        // Register Maps - Hoblin PQ sequence
        int[] maps = {921120000, 921120005, 921120100, 921120200, 921120300, 921120400};
        
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            if (map != null) {
                instance.addMap(map);
                map.resetFully();
            }
        }

        instance.setProperty("state", "1");
        instance.setProperty("stage0", "0");
        instance.setProperty("stage1", "0");
        instance.setProperty("stage2", "0");

        // Start 20 minute timer
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(921120000);

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        MapleMap map = mob.getMap();
        
        if (mobId == 9300281) { // Rex the Hoblin King
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
            instance.setProperty("cleared", "1");
        }
        
        // stage logic for Shammos escorting
        // ... (This would be complex to fully port but this is the foundation)
    }
}

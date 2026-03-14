package server.pqs;

import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.maps.MapleMapFactory;
import server.maps.MapleMap;
import handling.channel.ChannelServer;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Ludi PQ (Dimensional Crack).
 */
public class LudiPQHandler extends MaplePQHandler {

    public LudiPQHandler() {
        super(30, 200, 3, 6); // Lv 30+, 3-6 players
    }

    @Override
    public boolean validate(MapleParty party, NPCConversationManager cm) {
        if (!super.validate(party, cm)) {
            return false;
        }
        
        // Additional Ludi PQ specific checks can go here
        return true;
    }

    @Override
    public MaplePQInstance createInstance(MapleParty party) {
        MaplePQInstance instance = new MaplePQInstance(party, this);
        int channel = party.getLeader().getChannel();
        MapleMapFactory mf = ChannelServer.getInstance(channel).getMapFactory();

        // Register Maps - Dimensional Crack sequence (922010100 - 922010900)
        int[] maps = {922010100, 922010400, 922010401, 922010402, 922010403, 922010404, 922010405, 922010600, 922010700, 922010800, 922010900};
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            instance.addMap(map);
            if (mapId == 922010700) {
                map.getPortal("next00").setScriptName("ludi_s4Clear");
            } else if (mapId == 922010800) {
                map.getPortal("next00").setScriptName("ludi_s5Clear");
            }
        }

        // Initialize stage properties
        instance.setProperty("state", "1");
        instance.setProperty("stage", "1");

        // Start 20 minute timer
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(922010100);

        return instance;
    }
}

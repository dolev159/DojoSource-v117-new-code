package server.pqs;

import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.maps.MapleMapFactory;
import server.maps.MapleMap;
import handling.channel.ChannelServer;
import client.MapleCharacter;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Boss Balrog (Easy).
 */
public class BossBalrogEasyHandler extends MaplePQHandler {

    public BossBalrogEasyHandler() {
        super(65, 200, 1, 6); // Lv 65+, 1-6 players
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

        // Register Maps - Boss Balrog Easy
        int[] maps = {105100300, 105100301};
        
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            instance.addMap(map);
        }

        instance.setProperty("state", "1");
        
        // Schedule Balrog appearance and left claw release
        instance.scheduleTask("BossBalrog", 3 * 1000);
        instance.scheduleTask("releaseLeftClaw", 1 * 60000);

        // Start 30 minute timer
        instance.startEventTimer(30 * 60);

        // Warp party to first map
        instance.warpParty(105100300);

        return instance;
    }
}

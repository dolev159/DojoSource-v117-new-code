package server.pqs;

import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.maps.MapleMapFactory;
import server.maps.MapleMap;
import handling.channel.ChannelServer;
import client.MapleCharacter;
import java.util.Iterator;
import handling.world.MaplePartyCharacter;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Amoria PQ.
 */
public class AmoriaPQHandler extends MaplePQHandler {

    public AmoriaPQHandler() {
        super(40, 200, 4, 6); // Lv 40+, 4-6 players
    }

    @Override
    public boolean validate(MapleParty party, NPCConversationManager cm) {
        if (!super.validate(party, cm)) {
            return false;
        }

        // Additional validation specific to APQ if needed (e.g. marriage check)
        int gmCount = 0;
        Iterator<MaplePartyCharacter> it = party.getMembers().iterator();
        while (it.hasNext()) {
            MaplePartyCharacter cPlayer = it.next();
            MapleCharacter ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
            if (ccPlayer == null || ccPlayer.getLevel() < 40) {
                cm.sendOk("All 4+ members of your party must be here and at least Level 40.");
                return false;
            }
            if (ccPlayer.isGM()) {
                gmCount += 5; // GMs count towards party size bypass
            }
        }
        
        if (party.getMembers().size() + gmCount < 4) {
             cm.sendOk("You need a party of at least 4 players.");
             return false;
        }

        return true;
    }

    @Override
    public MaplePQInstance createInstance(MapleParty party) {
        MaplePQInstance instance = new MaplePQInstance(party, this);
        int channel = party.getLeader().getChannel();
        MapleMapFactory mf = ChannelServer.getInstance(channel).getMapFactory();

        // Register Maps - Amoria PQ sequence
        int[] maps = {670010200, 670010300, 670010301, 670010302, 670010400, 670010500, 670010600, 670010700, 670010750, 670010800};
        
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            instance.addMap(map);
            if (mapId == 670010200) {
                map.getPortal("go00").setScriptName("apq00");
                map.getPortal("go01").setScriptName("apq01");
                map.getPortal("go02").setScriptName("apq02");
            }
        }

        instance.setProperty("state", "1");
        
        // Start 60 minute timer (Amoria is usually long)
        instance.startEventTimer(60 * 60);

        // Warp party to first map
        instance.warpParty(670010200);

        return instance;
    }
}

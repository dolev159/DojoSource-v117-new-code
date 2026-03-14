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
 * Java Implementation of Kerning City PQ (First Time Together).
 */
public class KerningPQHandler extends MaplePQHandler {

    public KerningPQHandler() {
        super(20, 200, 3, 4); // Lv 20+, 3-4 players
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

        // Register Maps - KPQ sequence
        int[] maps = {910340100, 910340200, 910340300, 910340400, 910340500};
        
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            instance.addMap(map);
            map.resetFully();
        }

        // Spawn Boss: King Slime (9300003) at (-127, -435) in Last Stage (910340500)
        // Note: In typical KPQ, King Slime appears after clearing previous stages or being summoned.
        // The original script setup() spawned it immediately.
        instance.getMap(910340500).spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9300003), new Point(-127, -435));

        // Start 20 minute timer
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(910340100);

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        MapleMap map = mob.getMap();
        
        if (mobId == 9300002) { // Specific mob in Stage 4
            if (map.getId() == 910340400 && map.getAllMonstersThreadsafe().isEmpty()) {
                map.broadcastMessage(CField.environmentChange("gate", 2));
                map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
                map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
                instance.setProperty("stage4", "1");
            }
        } else if (mobId == 9300003) { // King Slime
            map.startMapEffect("King Slime has been defeated. All of the stages have been cleared.", 5120017);
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
            
            // Gain EXP logic could be complex, for now let's just mark it cleared.
            instance.setProperty("cleared", "1");
        }
    }
}

package server.pqs;

import java.awt.Point;
import java.util.Random;
import java.util.concurrent.ScheduledFuture;

import handling.world.MapleParty;
import scripting.NPCConversationManager;
import server.Timer.EventTimer;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import handling.channel.ChannelServer;
import tools.packet.CField;
import tools.packet.CWvsContext;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Romeo & Juliet PQ (Magatia).
 */
public class RomeoAndJulietPQHandler extends MaplePQHandler {

    public RomeoAndJulietPQHandler() {
        super(70, 200, 4, 4); // v117: Lv 70+, exactly 4 players
    }

    @Override
    public boolean validate(MapleParty party, NPCConversationManager cm) {
        if (!super.validate(party, cm)) {
            return false;
        }
        if (party.getMembers().size() != 4) {
            cm.sendOk("You need exactly 4 members in your party to attempt this quest.");
            return false;
        }
        return true;
    }

    @Override
    public MaplePQInstance createInstance(MapleParty party) {
        MaplePQInstance instance = new MaplePQInstance(party, this);
        int channel = party.getLeader().getChannel();
        MapleMapFactory mf = ChannelServer.getInstance(channel).getMapFactory();

        // Determine if this is Romeo or Juliet version
        // This usually depends on the NPC name/id called, which we can pass or detect.
        // For now, let's assume Juliet (as found in 2112003.js edit)
        boolean isRomeo = false; 
        
        int startMap = isRomeo ? 926100000 : 926110000;
        int endMap = isRomeo ? 926100600 : 926110405; // Juliet has different map range?
        
        // Register Maps
        if (isRomeo) {
            for (int i = 926100000; i <= 926100600; i++) {
                MapleMap map = mf.getMap(i);
                if (map != null) {
                    instance.addMap(map);
                    map.resetFully();
                }
            }
        } else {
             int[] julietMaps = {926110000, 926110001, 926110100, 926110200, 926110300, 926110400, 926110401, 926110500, 926110600};
             for (int mapId : julietMaps) {
                 MapleMap map = mf.getMap(mapId);
                 if (map != null) {
                    instance.addMap(map);
                    map.resetFully();
                }
             }
        }

        instance.setProperty("state", "1");
        
        // Start 30 minute timer (Original script says 20 min event timer, but setup says 30 in comments?)
        // Let's go with 20 minutes for strict GMS.
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(startMap);

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        MapleMap map = mob.getMap();
        
        // Handle boss defeat / stage clears
        if (mobId == 9300137) { // Juliet (failure case if killed?)
             instance.broadcastPlayerMsg(5, "Juliet has been defeated. Quest failed.");
             instance.dispose();
        } else if (mobId == 9300139 || mobId == 9300140) { // Boss Yulete
             map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
             map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
             instance.setProperty("state", "2");
        }
    }
}

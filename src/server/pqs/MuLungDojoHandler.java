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
 * Java Implementation of Mu Lung Dojo.
 */
public class MuLungDojoHandler extends MaplePQHandler {

    public MuLungDojoHandler() {
        super(25, 200, 1, 6); // Lv 25+, 1-6 players
    }

    @Override
    public boolean validate(MapleParty party, NPCConversationManager cm) {
        // Dojo allows solo (party == null in some implementations, but PQEngine expects party)
        // If solo, we usually create a 1-person party or handle it in cm.
        return true; 
    }

    @Override
    public MaplePQInstance createInstance(MapleParty party) {
        MaplePQInstance instance = new MaplePQInstance(party, this);
        int channel = party.getLeader().getChannel();
        MapleMapFactory mf = ChannelServer.getInstance(channel).getMapFactory();

        // Dojo has many maps, we'll index them as needed. 
        // For simplicity in the engine, we just register the entry map and dynamic warping.
        instance.addMap(mf.getMap(925020100)); // First floor

        instance.setProperty("stage", "1");

        // Warp to first stage
        instance.warpParty(925020100);

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        // Logic for moving to next floor
        MapleMap map = mob.getMap();
        if (map.getAllMonstersThreadsafe().size() < 1) {
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
            // Spawn portal or NPC to move up
        }
    }
}

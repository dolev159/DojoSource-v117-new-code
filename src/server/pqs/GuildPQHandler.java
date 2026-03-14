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
 * Java Implementation of Guild PQ (Sharenian).
 */
public class GuildPQHandler extends MaplePQHandler {

    public GuildPQHandler() {
        super(10, 200, 1, 30); // Guild PQ has large party size support
    }

    @Override
    public boolean validate(MapleParty party, NPCConversationManager cm) {
        if (!super.validate(party, cm)) {
            return false;
        }
        if (cm.getPlayer().getGuildId() <= 0) {
            cm.sendOk("You must be in a guild to attempt this.");
            return false;
        }
        return true;
    }

    @Override
    public MaplePQInstance createInstance(MapleParty party) {
        MaplePQInstance instance = new MaplePQInstance(party, this);
        int channel = party.getLeader().getChannel();
        MapleMapFactory mf = ChannelServer.getInstance(channel).getMapFactory();

        // Register Maps - Guild PQ sequence (990000000 - 990001100)
        for (int i = 0; i <= 11; i++) {
            int mapId = 990000000 + (i * 100);
            MapleMap map = mf.getMap(mapId);
            if (map != null) {
                instance.addMap(map);
                map.resetFully();
            }
        }

        instance.setProperty("state", "0"); // Waiting room state
        MapleCharacter leader = ChannelServer.getInstance(party.getLeader().getChannel()).getPlayerStorage().getCharacterById(party.getLeader().getId());
        if (leader != null) {
            instance.setProperty("guildId", String.valueOf(leader.getGuildId()));
        }

        // Start waiting room timer (3 minutes)
        instance.startEventTimer(3 * 60);
        instance.scheduleTask("startGPQ", 3 * 60 * 1000);

        // Warp party to first map (Waiting Room)
        instance.warpParty(990000000);

        return instance;
    }

    @Override
    public void onTaskTrigger(MaplePQInstance instance, String taskName) {
        if (taskName.equals("startGPQ")) {
            instance.setProperty("state", "1"); // Active state
            instance.startEventTimer(120 * 60); // 2 hours
            instance.broadcastPlayerMsg(5, "The gate to the castle has been opened.");
        }
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        if (mobId == 9300028) { // Ergoth
            MapleMap map = mob.getMap();
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
        }
    }
}

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
import java.util.Random;
import server.MapleItemInformationProvider;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Java Implementation of Orbis PQ (Remnant of the Goddess).
 */
public class OrbisPQHandler extends MaplePQHandler {

    public OrbisPQHandler() {
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

        // Register Maps - OPQ sequence
        int[] maps = {920010000, 920010100, 920010200, 920010300, 920010400, 920010500, 920010600, 
                      920010601, 920010602, 920010603, 920010604, 920010700, 920010800, 920010900, 
                      920010910, 920010911, 920010912, 920010920, 920010921, 920010922, 920010930, 
                      920010931, 920010932, 920011000, 920011100};
        
        for (int mapId : maps) {
            MapleMap map = mf.getMap(mapId);
            instance.addMap(map);
            map.resetFully();
        }

        instance.setProperty("stage2", "0");

        // Start 20 minute timer
        instance.startEventTimer(20 * 60);

        // Warp party to first map
        instance.warpParty(920010000);
        
        // entry effects and buffs
        Random rand = new Random();
        for (MapleCharacter chr : instance.getPlayers()) {
            MapleItemInformationProvider.getInstance().getItemEffect(2022090 + rand.nextInt(4)).applyTo(chr); // Wonky's Blessing
        }
        
        instance.getMap(920010000).startMapEffect("Hi, I am the steward of the goddess. I have been sealed, so you cannot see me now. Can you help me unseal it?", 5120019);

        return instance;
    }

    @Override
    public void onMonsterKilled(MaplePQInstance instance, MapleMonster mob) {
        int mobId = mob.getId();
        MapleMap map = mob.getMap();
        
        if (mobId == 9300049) { // Specific mob to spawn Papa Pixie
             map.broadcastMessage(CField.environmentChange("Papa Pixie has been spawned.", 5));
             map.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9300039), new Point(-830, 563));
        } else if (mobId == 9300039) { // Papa Pixie
            map.broadcastMessage(CField.environmentChange("Please bring the Life Grass and go save the goddess as soon as possible.", 5));
            map.broadcastMessage(CField.environmentChange("quest/party/clear", 3));
            map.broadcastMessage(CField.environmentChange("Party1/Clear", 4));
        } else if (mobId == 9300040) { // Cellion in warehouse
            int st = Integer.parseInt(instance.getProperty("stage2"));
            if (st < 14) {
                instance.setProperty("stage2", String.valueOf(st + 1));
                // Spawn another one randomly? (This is simplified stage logic)
                map.broadcastMessage(CField.environmentChange("Cellion has been spawned somewhere in the map.", 5));
            }
        }
    }
}

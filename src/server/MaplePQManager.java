package server;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Item;
import java.awt.Rectangle;
import scripting.EventInstanceManager;
import server.life.MapleMonster;
import server.life.MapleLifeFactory;
import server.maps.MapleMap;
import tools.packet.CField;
import tools.packet.CWvsContext;
import java.awt.Rectangle;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * Centralized Party Quest Manager for Zipangu
 * Handles entry requirements, rewards, and instance tracking.
 */
public class MaplePQManager {

    private static final Map<Integer, Long> lastEntryTime = new HashMap<>();

    public enum PQType {
        HENESYS(10, 200, 3, 6, 910010000),
        KERNING(20, 200, 3, 6, 910340000),
        LUDI(30, 200, 3, 6, 221024500),
        ORBIS(51, 200, 3, 6, 200080101),
        PIRATE(71, 200, 3, 6, 251010404),
        ROMEO(71, 200, 3, 6, 921120000),
        JULIET(71, 200, 3, 6, 921120000),
        DRAGON_RIDER(100, 200, 3, 6, 240080000),
        KENTA(120, 200, 3, 6, 923040000),
        ESCAPE(120, 200, 3, 6, 921160000),
        ICE_KNIGHT(30, 200, 3, 6, 932000000),
        HOB_KING(75, 200, 3, 6, 921110000),
        LUDI_MAZE(50, 200, 3, 6, 910300000),
        GHOST_SHIP(60, 200, 3, 3, 923020000),
        MONSTER_CARNIVAL(30, 200, 2, 6, 980000000),
        MONSTER_PARK(10, 200, 1, 6, 951000000),
        NETT_PYRAMID(40, 200, 1, 6, 926010000),
        CWKPQ(90, 200, 5, 30, 610030010),
        AMORIA_PQ(40, 200, 6, 6, 670010000),
        GUILD_PQ(10, 200, 1, 100, 101030104),
        ELLIN_PQ(70, 255, 2, 6, 300000010);

        private final int minLevel, maxLevel, minParty, maxParty, mapId;

        PQType(int minLevel, int maxLevel, int minParty, int maxParty, int mapId) {
            this.minLevel = minLevel;
            this.maxLevel = maxLevel;
            this.minParty = minParty;
            this.maxParty = maxParty;
            this.mapId = mapId;
        }

        public int getMinLevel() { return minLevel; }
        public int getMaxLevel() { return maxLevel; }
        public int getMinParty() { return minParty; }
        public int getMaxParty() { return maxParty; }
        public int getMapId() { return mapId; }
    }

    public static boolean canEnter(MapleCharacter chr, PQType pq) {
        if (chr == null || chr.getParty() == null) {
            chr.dropMessage(5, "You must be in a party to enter this Party Quest.");
            return false;
        }
        if (!chr.isLeader()) {
            chr.dropMessage(5, "Only the party leader may request entry.");
            return false;
        }
        if (chr.getParty().getMembers().size() < pq.getMinParty() || chr.getParty().getMembers().size() > pq.getMaxParty()) {
            chr.dropMessage(5, "Your party must have between " + pq.getMinParty() + " and " + pq.getMaxParty() + " members.");
            return false;
        }
        
        for (handling.world.MaplePartyCharacter m : chr.getParty().getMembers()) {
            MapleCharacter member = chr.getMap().getCharacterById(m.getId());
            if (member == null) {
               chr.dropMessage(5, "All party members must be in the same map.");
               return false;
            }
            if (member.getLevel() < pq.getMinLevel() || member.getLevel() > pq.getMaxLevel()) {
                chr.dropMessage(5, "Member " + member.getName() + " does not meet the level requirement (" + pq.getMinLevel() + "-" + pq.getMaxLevel() + ").");
                return false;
            }
            if (pq == PQType.AMORIA_PQ && member.getMarriageId() <= 0) {
                chr.dropMessage(5, "Member " + member.getName() + " is not married.");
                return false;
            }
        }
        if (pq == PQType.GUILD_PQ && (chr.getGuildId() <= 0 || chr.getGuildRank() >= 3)) {
            chr.dropMessage(5, "Only a Guild Master or Jr. Master can start the Guild Quest.");
            return false;
        }
        return true;
    }

    public static final String[] KPQ_QUESTIONS = {
        "Collect coupons as the minimum level for 1st job warrior.",
        "Collect coupons as the minimum STR for 1st job warrior.",
        "Collect coupons as the minimum INT for 1st job magician.",
        "Collect coupons as the minimum DEX for 1st job bowman.",
        "Collect coupons as the minimum DEX for 1st job thief.",
        "Collect coupons as the minimum level for 2nd job."
    };
    public static final int[] KPQ_ANSWERS = {10, 35, 20, 25, 25, 30};

    public static int getKPQQuestion(MapleCharacter chr) {
        return (int) (Math.random() * KPQ_ANSWERS.length);
    }

    public static boolean checkItems(MapleCharacter chr, int itemId, int quantity) {
        if (chr == null || chr.getParty() == null) {
            return false;
        }
        int total = 0;
        for (handling.world.MaplePartyCharacter m : chr.getParty().getMembers()) {
            MapleCharacter member = chr.getMap().getCharacterById(m.getId());
            if (member != null) {
                total += member.getItemQuantity(itemId, false);
            }
        }
        if (total >= quantity) {
            for (handling.world.MaplePartyCharacter m : chr.getParty().getMembers()) {
                MapleCharacter member = chr.getMap().getCharacterById(m.getId());
                if (member != null) {
                    member.removeAll(itemId);
                }
            }
            return true;
        }
        return false;
    }

    public static final int[] KPQ_PRIZE_SCROLLS = {2040502, 2040505, 2040802, 2040002, 2040402, 2040602};
    public static final int[] KPQ_PRIZE_USE = {2000001, 2000002, 2000003, 2000006, 2000004, 2022000, 2022003};
    public static final int[] KPQ_PRIZE_EQUIP = {1032004, 1032005, 1032009, 1032006, 1032007, 1032010, 1032002, 1002026, 1002089, 1002090};

    public static void giveKPQPrize(MapleCharacter chr) {
        if (chr == null) return;
        double rand = Math.random();
        int itemId;
        int qty = 1;
        if (rand < 0.3) {
            itemId = KPQ_PRIZE_SCROLLS[(int)(Math.random() * KPQ_PRIZE_SCROLLS.length)];
        } else if (rand < 0.6) {
            itemId = KPQ_PRIZE_EQUIP[(int)(Math.random() * KPQ_PRIZE_EQUIP.length)];
        } else {
            itemId = KPQ_PRIZE_USE[(int)(Math.random() * KPQ_PRIZE_USE.length)];
            qty = 15;
        }
        if (chr.getInventory(client.inventory.MapleInventoryType.USE).getNextFreeSlot() > -1) {
            chr.gainItem(itemId, qty);
            chr.gainItem(4001531, 1); // Smooshy Liquid
            chr.modifyCSPoints(1, 30, true); // NX
        }
    }

    public static final int[] LUDI_PRIZE_EQUIP = {1072238, 1072383, 1072355, 1072356}; // GMS Like rewards
    public static final int[] LUDI_PRIZE_USE = {2000004, 2000005, 2022000, 2022003, 2040002, 2040402};

    public static void giveLudiPQPrize(MapleCharacter chr) {
        if (chr == null) return;
        double rand = Math.random();
        int itemId;
        int qty = 1;
        if (rand < 0.4) {
             itemId = LUDI_PRIZE_USE[(int)(Math.random() * LUDI_PRIZE_USE.length)];
             qty = 30;
        } else if (rand < 0.7) {
             itemId = LUDI_PRIZE_EQUIP[(int)(Math.random() * LUDI_PRIZE_EQUIP.length)];
        } else {
             itemId = 2040000 + (int)(Math.random() * 100); // Random scroll
        }
        chr.gainItem(itemId, qty);
        chr.modifyCSPoints(1, 100, true); // LPQ gives more NX
    }

    public static void completePQ(MapleCharacter chr, PQType pq) {
        if (chr == null) return;
        chr.getMap().broadcastMessage(tools.packet.CField.showEffect("quest/party/clear"));
        chr.getMap().broadcastMessage(tools.packet.CField.playSound("Party1/Clear"));
        
        if (pq == PQType.KERNING) {
            chr.getTrait(client.MapleTrait.MapleTraitType.will).addExp(8, chr);
            chr.endPartyQuest(1201);
            chr.changeMap(910340600, 0);
        }
    }

    public static boolean isStageCleared(MapleMap map, int stage) {
        if (map == null) return false;
        // In this source, properties are often stored in the EventInstance
        // We'll check if any character in the map has an event instance with the property
        for (MapleCharacter chr : map.getCharactersThreadsafe()) {
            EventInstanceManager eim = chr.getEventInstance();
            if (eim != null) {
                String status = eim.getProperty("stage" + stage + "status");
                return status != null && status.equalsIgnoreCase("clear");
            }
        }
        return false;
    }

    public static boolean checkOrbisPQStage3(MapleCharacter chr, int selection) {
        // Selection corresponds to the LP item ID
        // Weekdays in Calendar: Sunday = 1, Monday = 2, ..., Saturday = 7
        // LP IDs: 4001056 (Sun), 4001057 (Mon), ..., 4001062 (Sat)
        int day = Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
        int requiredLP = 4001055 + day;
        
        return selection == requiredLP;
    }

    public static boolean checkOrbisPQStatue(MapleCharacter chr) {
        // Requires all 6 pieces: 4001044 to 4001049
        for (int i = 4001044; i <= 4001049; i++) {
            if (!chr.haveItem(i, 1)) return false;
        }
        return true;
    }

    public static void stageClear(MapleCharacter chr, int stage) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        MapleMap map = chr.getMap();
        map.broadcastMessage(tools.packet.CField.showEffect("quest/party/clear"));
        map.broadcastMessage(tools.packet.CField.playSound("Party1/Clear"));
        map.broadcastMessage(tools.packet.CField.environmentChange("gate", 2));
        
        EventInstanceManager eim = chr.getEventInstance();
        if (eim != null) {
            eim.setProperty("stage" + stage + "status", "clear");
        }
        
        if (stage == 9) { // Boss stage
            map.broadcastMessage(CWvsContext.serverNotice(6, "[LudiPQ] Congratulations! You have defeated Alishar!"));
        } else {
            map.broadcastMessage(CWvsContext.serverNotice(6, "[LudiPQ] The portal to the next stage is now open. Hurry!"));
        }
    }

    public static boolean checkLudiPQStage5(MapleCharacter chr) {
        if (chr == null || chr.getEventInstance() == null) {
            return false;
        }
        EventInstanceManager eim = chr.getEventInstance();
        int[] subMaps = {922010501, 922010502, 922010503, 922010504, 922010505, 922010506};
        for (int mapId : subMaps) {
            MapleMap map = eim.getMapInstance(mapId);
            if (map != null && map.getMonsterCount() > 0) {
                return false;
            }
        }
        return true;
    }

    public static boolean checkLudiPQStage6(MapleCharacter chr) {
        if (chr == null || chr.getEventInstance() == null) {
            return false;
        }
        EventInstanceManager eim = chr.getEventInstance();
        // The combo is stored as properties like "stage6_00", "stage6_01", etc.
        // We'll check if the current combo matches the expected one.
        // For Stage 6, it's usually 10 boxes (0-9) with 3 states each.
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 3; j++) {
                String val = eim.getProperty("stage6_" + i + "" + j);
                if (val == null) return false;
            }
        }
        return true; 
    }

    public static boolean checkLudiPQStage8(MapleCharacter chr) {
        if (chr == null || chr.getMap() == null || chr.getEventInstance() == null) {
            return false;
        }
        MapleMap map = chr.getMap();
        EventInstanceManager eim = chr.getEventInstance();
        
        // Stage 8 has 9 platforms (1-9)
        // Authentic GMS combo logic involves reading property set in LudiPQ.js
        String combo = eim.getProperty("stage8_combo");
        if (combo == null) return false;
        
        // Area definitions for Stage 8 platforms (Simplified for logic demonstration)
        // In a real scenario, these would be precise Rectangles from the WZ/map
        Rectangle[] areas = new Rectangle[9];
        for (int i = 0; i < 9; i++) {
            areas[i] = new Rectangle(0, 0, 10, 10); // Placeholder
        }
        
        int[] correctPos = new int[9];
        // Parse combo string (e.g., "123")
        for (char c : combo.toCharArray()) {
            int pos = Character.getNumericValue(c) - 1;
            if (pos >= 0 && pos < 9) correctPos[pos] = 1;
        }
        
        return checkCombination(map, areas, correctPos);
    }

    public static void onMonsterDeath(MapleCharacter chr, MapleMonster monster) {
        if (chr == null || monster == null) {
            return;
        }
        int mobId = monster.getId();
        int mapId = chr.getMapId();

        // Kerning PQ
        if (mobId == 9300003 && mapId == 910340500) { // King Slime
            monster.getMap().spawnItemDrop(monster, chr, new Item(4001008, (byte) 0, (short) 1), monster.getTruePosition(), true, true);
        }
        
        // Ludi PQ
        if (mobId == 9300012 && mapId == 922010900) { // Alishar
            monster.getMap().spawnItemDrop(monster, chr, new client.inventory.Item(4001008, (byte) 0, (short) 1), monster.getTruePosition(), true, true);
        }

        // Orbis PQ
        if (mobId == 9300049 && mapId == 920010800) { // Dark Nependeath
            EventInstanceManager eim = chr.getEventInstance();
            if (eim != null && "0".equals(eim.getProperty("stage7"))) {
                eim.setProperty("stage7", "1");
                chr.getMap().broadcastMessage(tools.packet.CWvsContext.serverNotice(6, "Papa Pixie has been spawned."));
                MapleMonster pixie = MapleLifeFactory.getMonster(9300039);
                chr.getMap().spawnMonsterOnGroundBelow(pixie, new java.awt.Point(-830, 563));
            }
        } else if (mobId == 9300040 && mapId == 920010300) { // Cellion
            EventInstanceManager eim = chr.getEventInstance();
            if (eim != null) {
                int st = Integer.parseInt(eim.getProperty("stage2"));
                if (st < 14) {
                    int[] cx = {200, -300, -300, -300, 200, 200, 200, -300, -300, 200, 200, -300, -300, 200};
                    int[] cy = {-2321, -2114, -2910, -2510, -1526, -2716, -717, -1310, -3357, -1912, -1122, -1736, -915, -3116};
                    eim.setProperty("stage2", String.valueOf(st + 1));
                    chr.getMap().broadcastMessage(tools.packet.CWvsContext.serverNotice(6, "Cellion has been spawned somewhere in the map."));
                    MapleMonster nextCellion = MapleLifeFactory.getMonster(9300040);
                    chr.getMap().spawnMonsterOnGroundBelow(nextCellion, new java.awt.Point(cx[st], cy[st]));
                }
            }
        }

        // Ellin Forest PQ
        if (mobId == 9300165 && mapId == 930000600) { // Poison Golem Phase 1
             MapleMonster next = MapleLifeFactory.getMonster(9300166);
             chr.getMap().spawnMonsterOnGroundBelow(next, monster.getTruePosition());
        } else if (mobId == 9300166 && mapId == 930000600) { // Poison Golem Phase 2
             MapleMonster next = MapleLifeFactory.getMonster(9300167);
             chr.getMap().spawnMonsterOnGroundBelow(next, monster.getTruePosition());
        } else if (mobId == 9300167 && mapId == 930000600) { // Poison Golem Phase 3
             // Clear PQ or spawn reward
        }
    }

    public static boolean checkEllinPQStage1(MapleCharacter chr) {
        return chr.getMap().getAllMonstersThreadsafe().size() == 0;
    }

    public static boolean checkEllinPQStage2(MapleCharacter chr) {
        server.maps.MapleReactor reactor = chr.getMap().getReactorByName("spine");
        return reactor != null && reactor.getState() >= 4;
    }

    public static boolean checkOrbisPQStage4(MapleCharacter chr) {
        MapleMap map = chr.getMap();
        EventInstanceManager eim = chr.getEventInstance();
        
        // Stage 4 has 3 areas
        Rectangle[] areas = new Rectangle[3];
        areas[0] = new Rectangle(-231, -1510, 100, 100); // Placeholder
        areas[1] = new Rectangle(-113, -1510, 100, 100); // Placeholder
        areas[2] = new Rectangle(5, -1510, 100, 100);    // Placeholder
        
        int[] players = new int[3];
        for (int i = 0; i < 3; i++) {
            for (MapleCharacter c : map.getCharactersThreadsafe()) {
                if (areas[i].contains(c.getTruePosition())) {
                    players[i]++;
                }
            }
        }
        
        int total = players[0] + players[1] + players[2];
        if (total != 3) return false;

        for (int i = 0; i < 3; i++) {
            if (!eim.getProperty("stage4_" + i).equals(String.valueOf(players[i]))) {
                return false;
            }
        }
        return true;
    }

    public static boolean checkOrbisPQStage6(MapleCharacter chr) {
        MapleMap map = chr.getMap();
        EventInstanceManager eim = chr.getEventInstance();
        
        // Stage 6 uses reactors (levers)
        int correctCount = 0;
        for (int i = 0; i < 3; i++) {
            boolean reactorState = map.getReactorByName(String.valueOf(i + 1)).getState() > 0;
            String prop = eim.getProperty("stage62_" + i);
            if (prop != null && prop.equals(reactorState ? "1" : "0")) {
                correctCount++;
            }
        }
        
        return correctCount == 3;
    }

    public static boolean canActivateSigil(MapleCharacter chr, int reactorId) {
        if (chr == null) return false;
        int jobId = chr.getJob();
        switch (reactorId) {
            case 6109016: // Warrior
                return (jobId / 100 == 1 || jobId / 100 == 11 || jobId / 100 == 21 || jobId / 100 == 31);
            case 6109017: // Archer
                return (jobId / 100 == 3 || jobId / 100 == 13 || jobId / 100 == 23 || jobId / 100 == 33);
            case 6109018: // Mage
                return (jobId / 100 == 2 || jobId / 100 == 12 || jobId / 100 == 22 || jobId / 100 == 32);
            case 6109019: // Thief
                return (jobId / 100 == 4 || jobId / 100 == 14 || (jobId >= 3000 && jobId <= 3112) || jobId / 100 == 24); // DB and Xenon/Phantom included
            case 6109020: // Pirate
                return (jobId / 100 == 5 || jobId / 100 == 15 || jobId / 100 == 35);
        }
        return false;
    }

    public static boolean checkAPQStage2(MapleCharacter chr) {
        if (chr == null || chr.getEventInstance() == null) return false;
        MapleMap map = chr.getMap();
        EventInstanceManager eim = chr.getEventInstance();
        
        // Areas for the 3 ropes
        Rectangle[] areas = new Rectangle[3];
        areas[0] = new Rectangle(-100, -100, 50, 50); // Placeholder
        areas[1] = new Rectangle(0, -100, 50, 50);    // Placeholder
        areas[2] = new Rectangle(100, -100, 50, 50);  // Placeholder
        
        int[] players = new int[3];
        for (int i = 0; i < 3; i++) {
             for (MapleCharacter c : map.getCharactersThreadsafe()) {
                 if (areas[i].contains(c.getTruePosition())) {
                     players[i]++;
                 }
             }
        }
        
        for (int i = 0; i < 3; i++) {
            if (!eim.getProperty("apq2_" + i).equals(String.valueOf(players[i]))) {
                return false;
            }
        }
        return true;
    }

    public static boolean checkAPQStage3(MapleCharacter chr) {
        if (chr == null || chr.getEventInstance() == null) return false;
        MapleMap map = chr.getMap();
        EventInstanceManager eim = chr.getEventInstance();
        
        // 9 platforms
        Rectangle[] areas = new Rectangle[9];
        // Placeholder rectangle initialization
        for (int i = 0; i < 9; i++) areas[i] = new Rectangle(0, 0, 10, 10);
        
        int[] active = new int[9];
        for (int i = 0; i < 9; i++) {
             // Check for players or items
             for (MapleCharacter c : map.getCharactersThreadsafe()) {
                 if (areas[i].contains(c.getTruePosition())) {
                     active[i] = 1;
                     break;
                 }
             }
             if (active[i] == 0) {
                 // Check for items if no player
                 // map.getItemQuantity(itemId) isn't helpful for specific areas
                 // Need to check MapObjects of type ITEM
             }
        }
        
        int correctCount = 0;
        for (int i = 0; i < 9; i++) {
            if (eim.getProperty("apq3_" + i).equals(String.valueOf(active[i]))) {
                if (active[i] == 1) correctCount++;
            }
        }
        return correctCount == 3;
    }

    public static boolean checkCombination(server.maps.MapleMap map, java.awt.Rectangle[] areas, int[] correctPos) {
        int onCount = 0;
        for (int i = 0; i < areas.length; i++) {
            boolean found = false;
            for (MapleCharacter chr : map.getCharactersThreadsafe()) {
                if (areas[i].contains(chr.getTruePosition())) {
                    found = true;
                    break;
                }
            }
            if (found) {
                if (correctPos[i] == 0) return false; // Wrong position
                onCount++;
            } else {
                if (correctPos[i] == 1) return false; // Missing player on required position
            }
        }
        return onCount == 3; // Standard PQs usually require 3 people
    }

    public static boolean checkKPQCombination(server.maps.MapleMap map, int correctSequence) {
        // Area definition for KPQ platforms (Dummy logic, needs real coordinates)
        java.awt.Rectangle[] areas = new java.awt.Rectangle[10];
        for (int i = 0; i < 10; i++) areas[i] = new java.awt.Rectangle(0, 0, 10, 10);
        
        int[][] sequences = {
            {1, 1, 1, 0, 0, 0, 0, 0, 0, 0},
            {1, 1, 0, 1, 0, 0, 0, 0, 0, 0}
            // ... more
        };
        return checkCombination(map, areas, sequences[correctSequence]);
    }

    public static boolean checkOrbisPQTeleport(MapleCharacter chr, String portalName) {
        EventInstanceManager eim = chr.getEventInstance();
        if (eim == null || portalName == null || portalName.length() < 5) return false;
        
        // Portal name format: rp001, rp002, etc. (per script)
        String comboProp = eim.getProperty("stage6_" + portalName.substring(2, 5));
        return "1".equals(comboProp);
    }

    public static void sendRewardEXP(MapleCharacter chr, int exp) {
        // GMS v117 Scaling logic could be added here
        chr.gainExp(exp, true, true, true);
    }

    // Guild PQ Logic
    public static boolean checkGPQStage1(MapleCharacter chr) {
        EventInstanceManager eim = chr.getEventInstance();
        if (eim == null) return false;
        String combo = eim.getProperty("stage1combo");
        String guess = eim.getProperty("stage1guess");
        return combo != null && combo.equals(guess);
    }

    public static boolean checkGPQStage2(server.maps.MapleMap map) {
        if (map == null) return false;
        // Check for 4 spears and the gate state
        return map.getReactorByName("spear1").getState() >= 1 &&
               map.getReactorByName("spear2").getState() >= 1 &&
               map.getReactorByName("spear3").getState() >= 1 &&
               map.getReactorByName("spear4").getState() >= 1;
    }

    public static int[] compareGPQStage3(int[] answer, int[] guess) {
        int correct = 0;
        int incorrect = 0;
        java.util.List<Integer> answerList = new java.util.ArrayList<>();
        java.util.List<Integer> guessList = new java.util.ArrayList<>();

        for (int i = 0; i < answer.length; i++) {
            if (answer[i] == guess[i]) {
                correct++;
            } else {
                answerList.add(answer[i]);
                guessList.add(guess[i]);
            }
        }

        int[] answerItems = new int[4];
        int[] guessItems = new int[4];
        for (int a : answerList) {
            if (a >= 0 && a < 4) answerItems[a]++;
        }
        for (int g : guessList) {
            if (g >= 0 && g < 4) guessItems[g]++;
        }

        for (int i = 0; i < 4; i++) {
            incorrect += Math.min(answerItems[i], guessItems[i]);
        }

        return new int[]{correct, incorrect, 4 - correct - incorrect};
    }

    public static boolean checkGPQStage4(MapleCharacter chr) {
        if (chr == null || chr.getEventInstance() == null) return false;
        String clear = chr.getEventInstance().getProperty("stage4clear");
        return clear != null && clear.equals("true");
    }

    public static void completeGPQStage4(MapleCharacter chr) {
        if (chr == null || chr.getMap() == null || chr.getEventInstance() == null) return;
        chr.getEventInstance().setProperty("stage4clear", "true");
        server.maps.MapleReactor reactor = chr.getMap().getReactorByName("ghostgate");
        if (reactor != null) {
            reactor.forceHitReactor((byte) 1);
        }
        chr.getMap().broadcastMessage(tools.packet.CField.showEffect("quest/party/clear"));
        chr.getMap().broadcastMessage(tools.packet.CField.playSound("Party1/Clear"));
    }
}

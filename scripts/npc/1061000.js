/*
    NPC Name: Cloto
    NPC ID: 1061000
    Function: Kerning City Party Quest Starter
    
    Architect: Nexus Omni
    Date: March 7, 2026
*/

var status = -1;
var MIN_PLAYERS = 3;
var MAX_PLAYERS = 4;
var MIN_LEVEL = 21;
var MAX_LEVEL = 30;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            cm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        cm.sendSimple("Greetings, brave adventurers! I am Cloto, the keeper of this challenge. A terrible creature, the King Slime, has taken over the sewers below. Are you and your party strong enough to defeat it? What would you like to do?\r\n\r\n" +
            "#b#L0#I want to start the Party Quest.#l\r\n" +
            "#b#L1#Tell me more about this quest.#l");
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getParty() == null) {
                cm.sendOk("You must be in a party to start this quest.");
                cm.dispose();
                return;
            }
            if (!cm.isLeader()) {
                cm.sendOk("Only the party leader can decide to start the quest.");
                cm.dispose();
                return;
            }

            var party = cm.getParty().getMembers();
            if (party.size() < MIN_PLAYERS || party.size() > MAX_PLAYERS) {
                cm.sendOk("Your party must have between " + MIN_PLAYERS + " and " + MAX_PLAYERS + " members to start the quest.");
                cm.dispose();
                return;
            }

            var party_in_map = true;
            var level_check = true;
            var party_leader_map = cm.getPlayer().getMapId();

            for (var i = 0; i < party.size(); i++) {
                var p = party.get(i);
                if (p.getLevel() < MIN_LEVEL || p.getLevel() > MAX_LEVEL) {
                    level_check = false;
                    break;
                }
                if (p.getMapId() != party_leader_map) {
                    party_in_map = false;
                    break;
                }
            }

            if (!level_check) {
                cm.sendOk("One or more members of your party are not within the required level range of " + MIN_LEVEL + " to " + MAX_LEVEL + ".");
                cm.dispose();
                return;
            }

            if (!party_in_map) {
                cm.sendOk("All members of your party must be in this map to start the quest.");
                cm.dispose();
                return;
            }
            
            var em = cm.getEventManager("KerningPQ");
            if (em == null) {
                cm.sendOk("The Kerning Party Quest is currently unavailable. Please contact a GM.");
                cm.dispose();
                return;
            }
            
            if (em.getProperty("state") == "1") {
                cm.sendOk("Another party is currently attempting the quest. Please wait.");
                cm.dispose();
                return;
            }

            em.startInstance(cm.getParty(), cm.getMap());
            cm.dispose();
            
        } else if (selection == 1) {
            cm.sendOk("The Kerning City Party Quest is a challenge for a party of 3 to 4 adventurers between levels 21 and 30. You will face a series of puzzles and monsters, culminating in a battle against the mighty King Slime. Teamwork is essential!");
            cm.dispose();
        }
    }
}

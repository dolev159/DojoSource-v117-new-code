/*
    Lakelis - Victoria Road: Kerning City (103000000)
    
    Refactored by Nexus Omni for v117 authenticity and stability.
    - Removed global state check to allow full instancing.
    - Removed faulty MaplePQManager dependency.
    - Implemented GMS-accurate level and party size checks.
    - Separated PQ entry logic from item reward logic.
*/

var GMS_LOWER_LEVEL = 21;
var GMS_UPPER_LEVEL = 30;
var MIN_PARTY_SIZE = 3;
var MAX_PARTY_SIZE = 4;
var PQ_EVENT_NAME = "KerningPQ";

function start() {
    var player = cm.getPlayer();

    // Separate logic for shoe exchange completely
    if (player.getMapId() == 910340700) {
        cm.sendSimple("Do you want to exchange 10 Smooshy Liquids for a pair of Fluffy Shoes?\r\n#b#L0#Yes, please.#l");
        return;
    }

    if (cm.getParty() == null) {
        cm.sendOk("You must be in a party to enter the Party Quest.");
        cm.dispose();
        return;
    }

    if (!cm.isLeader()) {
        cm.sendOk("Only the leader of your party can start the Party Quest.");
        cm.dispose();
        return;
    }

    var party = cm.getParty().getMembers();

    // Validate party size
    if (party.size() < MIN_PARTY_SIZE || party.size() > MAX_PARTY_SIZE) {
        cm.sendOk("Your party must have between " + MIN_PARTY_SIZE + " and " + MAX_PARTY_SIZE + " members to attempt the quest.");
        cm.dispose();
        return;
    }

    // Validate all members are present and meet level requirements
    var validationMessage = checkPartyMembers();
    if (validationMessage != null) {
        cm.sendOk(validationMessage);
        cm.dispose();
        return;
    }
    
    // Check if any member is in another PQ instance
    var eventManager = cm.getEventManager(PQ_EVENT_NAME);
    if (eventManager == null) {
        cm.sendOk("The Kerning Party Quest is currently disabled.");
        cm.dispose();
        return;
    }
    
    if (cm.getParty().getMembers().stream().anyMatch(p -> p.getEventInstance() != null)) {
        cm.sendOk("One of your party members is already in an event. Please make sure everyone is available.");
        cm.dispose();
        return;
    }

    // All checks passed, attempt to start the instance
    eventManager.startInstance(cm.getParty(), cm.getMap());
    cm.dispose();
}

// Check all party members for level and map presence
function checkPartyMembers() {
    var party = cm.getParty().getMembers();
    var currentMapId = cm.getMapId();

    for (var i = 0; i < party.size(); i++) {
        var partyMember = party.get(i);
        if (partyMember.getLevel() < GMS_LOWER_LEVEL || partyMember.getLevel() > GMS_UPPER_LEVEL) {
            return "All party members must be between level " + GMS_LOWER_LEVEL + " and " + GMS_UPPER_LEVEL + ".";
        }
        if (partyMember.getMapId() != currentMapId) {
            return "All party members must be in the same map as the leader.";
        }
    }
    return null; // All good
}


function action(mode, type, selection) {
    if (mode == 1 && selection == 0) { // Assuming this is for the shoe exchange
        if (!cm.canHold(1072533, 1)) {
            cm.sendOk("Please make room in your inventory for the Fluffy Shoes.");
        } else if (cm.haveItem(4001531, 10)) {
            cm.gainItem(4001531, -10);
            cm.gainItem(1072533, 1); // Fluffy Shoes
            cm.sendOk("Enjoy your Fluffy Shoes!");
        } else {
            cm.sendOk("You need 10 Smooshy Liquids to get the shoes.");
        }
    }
    cm.dispose();
}

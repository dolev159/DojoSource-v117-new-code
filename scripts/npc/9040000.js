/*
	Name: Shuan
	Map: Guild Quest Entrance
	Description: 102040200
    Nexus Omni - GMS v117 Java Engine Transition
*/

function start() {
    if (cm.getParty() == null) {
        cm.sendOk("You must be in a guild party to attempt the Guild Quest.");
        cm.dispose();
        return;
    }
    if (!cm.isLeader()) {
        cm.sendOk("The party leader must talk to me.");
        cm.dispose();
        return;
    }
    
    var res = cm.getPQEngine().startInstance(cm.getParty(), "Guild PQ", cm);
    if (!res) {
        // Validation messages are handled inside the PQ Engine
    }
    cm.dispose();
}
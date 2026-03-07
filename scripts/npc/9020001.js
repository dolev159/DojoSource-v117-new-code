/*
    NPC 9020001 - Clue (Kerning PQ Stage 1)

    Refactored by Nexus Omni for v117 authenticity and stability.
    - This NPC acts as the gate for Stage 1 clear.
    - It calls the centralized logic in the Event Manager.
*/

function start() {
    var player = cm.getPlayer();
    var eim = player.getEventInstance();

    if (eim == null) {
        cm.sendOk("An error has occurred. Please try leaving and re-entering the Party Quest.");
        cm.dispose();
        return;
    }

    // Call the centralized function in the event manager
    eim.attemptStage1Clear(player);
    cm.dispose();
}

function action(mode, type, selection) {
    cm.dispose();
}

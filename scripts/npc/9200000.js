function start() {
    cm.sendSimple("Psst... Hey you! Want some... *looks around nervously* ... NX? I might have... acquired it through... alternative means...\r\n#b#L0#Yes, I'll take some 'found' NX#l");
}

function action(mode, type, selection) {
    if (mode > 0) {
        if (selection == 0) {
            var player = cm.getPlayer();
            if (player != null) {
                var currentNX = player.getCSPoints(1);
                player.modifyCSPoints(1, 999999);
                var newNX = player.getCSPoints(1);
                cm.sendOk("*Whispers* Here's your NX... Quick, take it and go! Don't tell anyone where you got it from!\r\n\r\nPrevious NX: " + currentNX + "\r\nNew NX: " + newNX);
            } else {
                cm.sendOk("Error: Could not find player data.");
            }
        }
    }
    cm.dispose();
} 
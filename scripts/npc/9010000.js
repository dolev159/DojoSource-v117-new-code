// GM NPC Script
// Basic GM functionality

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    
    if (mode == 0) {
        cm.dispose();
        return;
    }
    
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    
    if (status == 0) {
        if (!cm.getPlayer().isGM()) {
            cm.sendOk("This NPC is only available to GMs.");
            cm.dispose();
            return;
        }
        
        cm.sendSimple("Welcome to the GM Menu.\r\n#b#L0#View Online Players#l\r\n#L1#Toggle Patrol Mode#l\r\n#L2#Leave#l");
    } else if (status == 1) {
        if (selection == 0) {
            var text = "Online Players:\r\n";
            var total = 0;
            
            // Get all players from all channels
            var channelServer = cm.getChannelServer();
            var players = channelServer.getPlayerStorage().getAllCharacters();
            if (players != null) {
                for (var i = 0; i < players.size(); i++) {
                    var chr = players.get(i);
                    if (chr != null) {
                        total++;
                        text += "\r\n#b" + total + ". " + chr.getName() + " (Level " + chr.getLevel() + ")#k";
                    }
                }
            }
            
            if (total == 0) {
                text = "There are no players online.";
            } else {
                text = "Total Online Players: " + total + "\r\n" + text;
            }
            
            cm.sendOk(text);
            cm.dispose();
        } else if (selection == 1) {
            // Toggle Patrol Mode
            var player = cm.getPlayer();
            var currentMode = player.isPatrolMode();
            player.dropMessage(6, "Current mode before toggle: " + currentMode);
            
            player.setPatrolMode(!currentMode);
            player.dropMessage(6, "New mode after toggle: " + player.isPatrolMode());
            
            if (player.isPatrolMode()) {
                player.dropMessage(6, "Patrol Mode: Enabled - Use !next to view next player");
            } else {
                player.dropMessage(6, "Patrol Mode: Disabled");
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.dispose();
        }
    }
}
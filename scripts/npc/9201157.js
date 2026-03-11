var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        var text = "Welcome to my GM Command help Menu. (Kerning v117 Pre-Pre-Pre-Pre-Pre-Alpha\r\n";
        text += "Please select your GM level to view available commands:\r\n\r\n";

        if (cm.getPlayer().getGMLevel() >= 3) { // Intern
            text += "#L0#Intern Commands#l\r\n";
        }
        if (cm.getPlayer().getGMLevel() >= 4) { // GM
            text += "#L1#GM Commands#l\r\n";
        }
        if (cm.getPlayer().getGMLevel() >= 5) { // SuperGM
            text += "#L2#SuperGM Commands#l\r\n";
        }
        if (cm.getPlayer().getGMLevel() >= 7) { // Admin
            text += "#L3#Admin Commands#l\r\n";
        }

        cm.sendSimple(text);
    } else if (status == 1) {
        var text = "";
        var gmLevel = cm.getPlayer().getGMLevel();

        switch(selection) {
            case 0: // Intern Commands
                if (gmLevel < 3) {
                    cm.dispose();
                    return;
                }
                text = "Intern Commands:\r\n";
                text += "!hide - Toggle hide mode\r\n";
                text += "!lowhp - Set HP to 1\r\n";
                text += "!heal - Heal yourself\r\n";
                text += "!healhere - Heal everyone on map\r\n";
                text += "!song <songid> - Play a song\r\n";
                text += "!tempban <name> <reason> <days> - Temp ban a player\r\n";
                text += "!ban <name> <reason> - Ban a player\r\n";
                text += "!cc <channel> - Change channel\r\n";
                text += "!ccplayer <name> - Change channel to player\r\n";
                text += "!dc <name> - Disconnect a player\r\n";
                text += "!kill <name> - Kill a player\r\n";
                text += "!whereami - Show current map ID\r\n";
                text += "!clearinv <type> - Clear inventory\r\n";
                text += "!onlinechannel <channel> - List online players\r\n";
                text += "!itemcheck <name> - Check player's items\r\n";
                text += "!checkpoint <name> - Check player's points\r\n";
                text += "!checkvpoint <name> - Check player's vpoints\r\n";
                text += "!checkbpoint <name> - Check player's bpoints\r\n";
                text += "!charinfo <name> - Show character info\r\n";
                text += "!clock <seconds> - Show countdown\r\n";
                text += "!reports - Show reports\r\n";
                text += "!clearreport <name> <type> - Clear reports\r\n";
                text += "!cheaters - Show cheaters\r\n";
                text += "!dispel <name> - Dispel debuffs\r\n";
                text += "!refundexped <name> <exped> - Refund expedition\r\n";
                break;

            case 1: // GM Commands
                if (gmLevel < 4) {
                    cm.dispose();
                    return;
                }
                text = "GM Commands:\r\n";
                text += "!getskill <skillid> [level] [masterlevel] - Get skill\r\n";
                text += "!fame <name> <amount> - Give fame\r\n";
                text += "!invincible - Toggle invincibility\r\n";
                text += "!sp <amount> - Set SP\r\n";
                text += "!job <jobid> - Change job\r\n";
                text += "!shop <shopid> - Open shop\r\n";
                text += "!getitem <itemid> [quantity] - Get item\r\n";
                text += "!levelup - Level up\r\n";
                text += "!level <level> - Set level\r\n";
                text += "!startautoevent - Start auto event\r\n";
                text += "!setevent - Set event\r\n";
                text += "!startevent - Start event\r\n";
                text += "!scheduleevent <type> - Schedule event\r\n";
                text += "!removeitem <name> <itemid> - Remove item\r\n";
                text += "!killmap - Kill all players\r\n";
                text += "!speakmega <name> <message> - Speak megaphone\r\n";
                text += "!cloneme - Clone yourself\r\n";
                text += "!disposeclones - Remove clones\r\n";
                text += "!buffme - Buff yourself\r\n";
                text += "!setinstanceproperty <event> <property> <value> - Set instance property\r\n";
                text += "!buffmap - Buff all players\r\n";
                text += "!listinstanceproperty <event> <property> - List instance property\r\n";
                text += "!leaveinstance - Leave instance\r\n";
                text += "!whosthere - Show players on map\r\n";
                text += "!startinstance <event> <instance> - Start instance\r\n";
                text += "!resetmobs - Reset mobs\r\n";
                text += "!killmonsterbyoid <oid> - Kill monster by OID\r\n";
                text += "!removenpcs - Remove NPCs\r\n";
                text += "!notice <type> <message> - Send notice\r\n";
                text += "!givepet <name> <petid> <name> <level> <closeness> <fullness> - Give pet\r\n";
                text += "!gmm <message> - GM message\r\n";
                text += "!y <message> - Yellow message\r\n";
                text += "!whatsmyip - Show IP\r\n";
                text += "!tempbanip <name> <reason> <days> - Temp ban IP\r\n";
                text += "!banip <name> <reason> - Ban IP\r\n";
                text += "!tdrops - Toggle drops\r\n";
                text += "!findalts <name> - Find alts\r\n";
                text += "!stalk <name> - Stalk player\r\n";
                text += "!stopstalk - Stop stalking\r\n";
                text += "!help - Show this help\r\n";
                text += "!frz <name> - Freeze player\r\n";
                text += "!unfrz <name> - Unfreeze player\r\n";
                text += "!frza - Freeze area\r\n";
                text += "!unfrza - Unfreeze area\r\n";
                text += "!patrol - Toggle patrol mode\r\n";
                text += "!next - Next patrol target\r\n";
                text += "!giveep <name> - Give EP to player\r\n";
                break;

            case 2: // SuperGM Commands
                if (gmLevel < 5) {
                    cm.dispose();
                    return;
                }
                text = "SuperGM Commands:\r\n";
                text += "!giveskill <name> <skillid> [level] [masterlevel] - Give skill\r\n";
                text += "!unlockinv - Unlock inventory\r\n";
                text += "!setname <name> <newname> - Change name\r\n";
                text += "!drop <itemid> [quantity] [x] [y] - Drop item\r\n";
                text += "!marry <name1> <name2> - Marry players\r\n";
                text += "!givepoint <name> <amount> - Give points\r\n";
                text += "!givevpoint <name> <amount> - Give vpoints\r\n";
                text += "!givebpoint <name> <amount> - Give bpoints\r\n";
                text += "!monitor <name> - Monitor player\r\n";
                text += "!resetother <name> - Reset player\r\n";
                text += "!fstartother <name> <quest> - Force start quest\r\n";
                text += "!fcompleteother <name> <quest> - Force complete quest\r\n";
                text += "!threads - Show threads\r\n";
                text += "!showtrace <name> - Show trace\r\n";
                text += "!toggleoffense - Toggle offense\r\n";
                text += "!tmegaphone <message> - Team megaphone\r\n";
                text += "!sreactor - Show reactor\r\n";
                text += "!clearsquads - Clear squads\r\n";
                text += "!hitmonsterbyoid <oid> <damage> - Hit monster\r\n";
                text += "!hitall <damage> - Hit all monsters\r\n";
                text += "!hitmonster <damage> - Hit monster\r\n";
                text += "!killmonster - Kill monster\r\n";
                text += "!killalldrops - Kill all drops\r\n";
                text += "!killallexp - Kill all exp\r\n";
                break;

            case 3: // Admin Commands
                if (gmLevel < 7) {
                    cm.dispose();
                    return;
                }
                text = "Admin Commands:\r\n";
                text += "!stripeveryone - Strip everyone\r\n";
                text += "!mesoeveryone <amount> - Give meso to everyone\r\n";
                text += "!saveall - Save all\r\n";
                text += "!exprate <rate> - Set exp rate\r\n";
                text += "!droprate <rate> - Set drop rate\r\n";
                text += "!mesorate <rate> - Set meso rate\r\n";
                text += "!dcall - Disconnect all\r\n";
                text += "!shutdown - Shutdown server\r\n";
                text += "!shutdowntime <minutes> - Shutdown in time\r\n";
                text += "!lolcastle - LOL castle\r\n";
                text += "!startprofiling - Start profiling\r\n";
                text += "!stopprofiling - Stop profiling\r\n";
                text += "!fixednpc - Fixed NPC\r\n";
                text += "!unban <name> - Unban player\r\n";
                text += "!givenx <name> <amount> - Give NX\r\n";
                text += "!givedonationpoints <name> <amount> - Give donation points\r\n";
                text += "!loadsellyconfig - Load selly config\r\n";
                text += "!reloadwheel - Reload wheel\r\n";
                break;
        }

        cm.sendNext(text);
    } else if (status == 2) {
        cm.dispose();
    }
} 
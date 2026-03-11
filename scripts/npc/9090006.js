var status = 0;
var cm;

function start() {
    status = 0;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 1) {
        var text = "Welcome to the GM Command Help NPC!\r\n";
        text += "Please select your GM level to view available commands:\r\n\r\n";
        text += "#rSome of these commands do not work#k\r\n";


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
    } else if (status == 2) {
        var text = "";
        var gmLevel = cm.getPlayer().getGMLevel();

        switch(selection) {
            case 0: // Intern Commands
                if (gmLevel < 3) {
                    cm.dispose();
                    return;
                }
                text = "Intern Commands:\r\n";
                text += "#b!hide#k - Toggle hide mode\r\n";
                text += "#b!lowhp#k - Set HP to 1\r\n";
                text += "#b!heal#k - Heal yourself\r\n";
                text += "#b!healhere#k - Heal everyone on map\r\n";
                text += "#b!song <songid>#k - Play a song\r\n";
                text += "#b!tempban <name> <reason> <days>#k - Temp ban a player\r\n";
                text += "#b!ban <name> <reason>#k - Ban a player\r\n";
                text += "#b!cc <channel>#k - Change channel\r\n";
                text += "#b!ccplayer <name>#k - Change channel to player\r\n";
                text += "#b!dc <name>#k - Disconnect a player\r\n";
                text += "#b!kill <name>#k - Kill a player\r\n";
                text += "#b!whereami#k - Show current map ID\r\n";
                text += "#b!clearinv <type>#k - Clear inventory\r\n";
                text += "#b!onlinechannel <channel>#k - List online players\r\n";
                text += "#b!itemcheck <name>#k - Check player's items\r\n";
                text += "#b!checkpoint <name>#k - Check player's points\r\n";
                text += "#b!checkvpoint <name>#k - Check player's vpoints\r\n";
                text += "#b!checkbpoint <name>#k - Check player's bpoints\r\n";
                text += "#b!charinfo <name>#k - Show character info\r\n";
                text += "#b!clock <seconds>#k - Show countdown\r\n";
                text += "#b!reports#k - Show reports\r\n";
                text += "#b!clearreport <name> <type>#k - Clear reports\r\n";
                text += "#b!cheaters#k - Show cheaters\r\n";
                text += "#b!connected#k - Show connected players\r\n";
                text += "#b!nearestportal#k - Find nearest portal\r\n";
                text += "#b!spawndebug#k - Debug monster spawns\r\n";
                text += "#b!fakerelog#k - Fake relog\r\n";
                text += "#b!removedrops#k - Remove drops\r\n";
                text += "#b!listsquads#k - List squads\r\n";
                text += "#b!listinstances#k - List instances\r\n";
                text += "#b!uptime#k - Show server uptime\r\n";
                text += "#b!eventinstance#k - Show event instance\r\n";
                text += "#b!goto <mapname>#k - Go to map\r\n";
                text += "#b!monsterdebug#k - Debug monsters\r\n";
                text += "#b!looknpc#k - Show NPCs\r\n";
                text += "#b!lookreactor#k - Show reactors\r\n";
                text += "#b!lookportals#k - Show portals\r\n";
                text += "#b!mynpcpos#k - Show position\r\n";
                text += "#b!warphere <name>#k - Warp player to you\r\n";
                text += "#b!warp <name> [mapid] [portal]#k - Warp player\r\n";
                text += "#b!jail <name> <minutes>#k - Jail player\r\n";
                text += "#b!listallsquads#k - List all squads\r\n";
                text += "#b!say <message>#k - Say message\r\n";
                text += "#b!letter <color> <text>#k - Create letter\r\n";
                text += "#b!find <type> <search>#k - Search for items/maps/etc\r\n";
                text += "#b!whosfirst#k - Show first players\r\n";
                text += "#b!whoslast <type>#k - Show last players\r\n";
                text += "#b!whosnext <type>#k - Show next players\r\n";
                text += "#b!warpmap <mapid>#k - Warp all to map\r\n";
                text += "#b!warptome <name>#k - Warp player to you\r\n";
                text += "#b!killall#k - Kill all monsters\r\n";
                text += "#b!listdroppeditems#k - List dropped items\r\n";
                text += "#b!dispel <name>#k - Dispel debuffs\r\n";
                text += "#b!refundexped <name> <exped>#k - Refund expedition\r\n";
                break;

            case 1: // GM Commands
                if (gmLevel < 4) {
                    cm.dispose();
                    return;
                }
                text = "GM Commands:\r\n";
                text += "#b!getskill <skillid> [level] [masterlevel]#k - Get skill\r\n";
                text += "#b!fame <name> <amount>#k - Give fame\r\n";
                text += "#b!invincible#k - Toggle invincibility\r\n";
                text += "#b!sp <amount>#k - Set SP\r\n";
                text += "#b!job <jobid>#k - Change job\r\n";
                text += "#b!shop <shopid>#k - Open shop\r\n";
                text += "#b!getitem <itemid> [quantity]#k - Get item\r\n";
                text += "#b!levelup#k - Level up\r\n";
                text += "#b!level <level>#k - Set level\r\n";
                text += "#b!startautoevent#k - Start auto event\r\n";
                text += "#b!setevent#k - Set event\r\n";
                text += "#b!startevent#k - Start event\r\n";
                text += "#b!scheduleevent <type>#k - Schedule event\r\n";
                text += "#b!removeitem <name> <itemid>#k - Remove item\r\n";
                text += "#b!killmap#k - Kill all players\r\n";
                text += "#b!speakmega <name> <message>#k - Speak megaphone\r\n";
                text += "#b!cloneme#k - Clone yourself\r\n";
                text += "#b!disposeclones#k - Remove clones\r\n";
                text += "#b!buffme#k - Buff yourself\r\n";
                text += "#b!setinstanceproperty <event> <property> <value>#k - Set instance property\r\n";
                text += "#b!buffmap#k - Buff all players\r\n";
                text += "#b!listinstanceproperty <event> <property>#k - List instance property\r\n";
                text += "#b!leaveinstance#k - Leave instance\r\n";
                text += "#b!whosthere#k - Show players on map\r\n";
                text += "#b!startinstance <event> <instance>#k - Start instance\r\n";
                text += "#b!resetmobs#k - Reset mobs\r\n";
                text += "#b!killmonsterbyoid <oid>#k - Kill monster by OID\r\n";
                text += "#b!removenpcs#k - Remove NPCs\r\n";
                text += "#b!notice <type> <message>#k - Send notice\r\n";
                text += "#b!givepet <name> <petid> <name> <level> <closeness> <fullness>#k - Give pet\r\n";
                text += "#b!gmm <message>#k - GM message\r\n";
                text += "#b!y <message>#k - Yellow message\r\n";
                text += "#b!whatsmyip#k - Show IP\r\n";
                text += "#b!tempbanip <name> <reason> <days>#k - Temp ban IP\r\n";
                text += "#b!banip <name> <reason>#k - Ban IP\r\n";
                text += "#b!tdrops#k - Toggle drops\r\n";
                text += "#b!findalts <name>#k - Find alts\r\n";
                text += "#b!stalk <name>#k - Stalk player\r\n";
                text += "#b!stopstalk#k - Stop stalking\r\n";
                text += "#b!help#k - Show this help\r\n";
                text += "#b!frz <name>#k - Freeze player\r\n";
                text += "#b!unfrz <name>#k - Unfreeze player\r\n";
                text += "#b!frza#k - Freeze area\r\n";
                text += "#b!unfrza#k - Unfreeze area\r\n";
                text += "#b!patrol#k - Toggle patrol mode\r\n";
                text += "#b!next#k - Next patrol target\r\n";
                text += "#b!giveep <name>#k - Give EP to player\r\n";
                break;

            case 2: // SuperGM Commands
                if (gmLevel < 5) {
                    cm.dispose();
                    return;
                }
                text = "SuperGM Commands:\r\n";
                text += "#b!giveskill <name> <skillid> [level] [masterlevel]#k - Give skill\r\n";
                text += "#b!unlockinv#k - Unlock inventory\r\n";
                text += "#b!setname <name> <newname>#k - Change name\r\n";
                text += "#b!drop <itemid> [quantity] [x] [y]#k - Drop item\r\n";
                text += "#b!marry <name1> <name2>#k - Marry players\r\n";
                text += "#b!givepoint <name> <amount>#k - Give points\r\n";
                text += "#b!givevpoint <name> <amount>#k - Give vpoints\r\n";
                text += "#b!givebpoint <name> <amount>#k - Give bpoints\r\n";
                text += "#b!monitor <name>#k - Monitor player\r\n";
                text += "#b!resetother <name>#k - Reset player\r\n";
                text += "#b!fstartother <name> <quest>#k - Force start quest\r\n";
                text += "#b!fcompleteother <name> <quest>#k - Force complete quest\r\n";
                text += "#b!threads#k - Show threads\r\n";
                text += "#b!showtrace <name>#k - Show trace\r\n";
                text += "#b!toggleoffense#k - Toggle offense\r\n";
                text += "#b!tmegaphone <message>#k - Team megaphone\r\n";
                text += "#b!sreactor#k - Show reactor\r\n";
                text += "#b!clearsquads#k - Clear squads\r\n";
                text += "#b!hitmonsterbyoid <oid> <damage>#k - Hit monster\r\n";
                text += "#b!hitall <damage>#k - Hit all monsters\r\n";
                text += "#b!hitmonster <damage>#k - Hit monster\r\n";
                text += "#b!killmonster#k - Kill monster\r\n";
                text += "#b!killalldrops#k - Kill all drops\r\n";
                text += "#b!killallexp#k - Kill all exp\r\n";
                text += "#b!npc <npcid>#k - Spawn NPC\r\n";
                text += "#b!makepnpc <name>#k - Make permanent NPC\r\n";
                text += "#b!destroypnpc#k - Destroy permanent NPC\r\n";
                text += "#b!servermessage <message>#k - Server message\r\n";
                text += "#b!spawn <mobid> [quantity] [x] [y]#k - Spawn monster\r\n";
                text += "#b!reloadmap#k - Reload map\r\n";
                text += "#b!respawn#k - Respawn\r\n";
                text += "#b!rev#k - Show revision\r\n";
                text += "#b!reloadipmonitor#k - Reload IP monitor\r\n";
                text += "#b!addipmonitor <ip>#k - Add IP monitor\r\n";
                text += "#b!fillbook#k - Fill book\r\n";
                text += "#b!listbook#k - List book\r\n";
                text += "#b!subcategory#k - Show subcategory\r\n";
                text += "#b!gainmeso <amount>#k - Gain meso\r\n";
                text += "#b!gaincash <amount>#k - Gain cash\r\n";
                text += "#b!gainmp <amount>#k - Gain MP\r\n";
                text += "#b!gainp <amount>#k - Gain points\r\n";
                text += "#b!gainvp <amount>#k - Gain vpoints\r\n";
                text += "#b!gainbp <amount>#k - Gain bpoints\r\n";
                text += "#b!reloadops#k - Reload ops\r\n";
                text += "#b!reloaddrops#k - Reload drops\r\n";
                text += "#b!reloadportal#k - Reload portal\r\n";
                text += "#b!reloadshops#k - Reload shops\r\n";
                text += "#b!reloadevents#k - Reload events\r\n";
                text += "#b!reloadquests#k - Reload quests\r\n";
                text += "#b!resetmap#k - Reset map\r\n";
                text += "#b!resetquest <quest>#k - Reset quest\r\n";
                text += "#b!startquest <quest>#k - Start quest\r\n";
                text += "#b!completequest <quest>#k - Complete quest\r\n";
                text += "#b!fstartquest <quest>#k - Force start quest\r\n";
                text += "#b!fcompletequest <quest>#k - Force complete quest\r\n";
                text += "#b!hreactor#k - Hide reactor\r\n";
                text += "#b!fhreactor#k - Force hide reactor\r\n";
                text += "#b!dreactor#k - Destroy reactor\r\n";
                text += "#b!setreactor <state>#k - Set reactor state\r\n";
                text += "#b!resetreactor#k - Reset reactor\r\n";
                text += "#b!sendallnote <message>#k - Send note to all\r\n";
                text += "#b!buffskill <skillid>#k - Buff skill\r\n";
                text += "#b!buffitem <itemid>#k - Buff item\r\n";
                text += "#b!buffitemex <itemid>#k - Buff item EX\r\n";
                text += "#b!itemsize#k - Show item size\r\n";
                text += "#b!hottime <itemid>#k - Hot time\r\n";
                text += "#b!chattype#k - Show chat type\r\n";
                break;

            case 3: // Admin Commands
                if (gmLevel < 7) {
                    cm.dispose();
                    return;
                }
                text = "Admin Commands:\r\n";
                text += "#b!stripeveryone#k - Strip everyone\r\n";
                text += "#b!mesoeveryone <amount>#k - Give meso to everyone\r\n";
                text += "#b!saveall#k - Save all\r\n";
                text += "#b!exprate <rate>#k - Set exp rate\r\n";
                text += "#b!droprate <rate>#k - Set drop rate\r\n";
                text += "#b!mesorate <rate>#k - Set meso rate\r\n";
                text += "#b!dcall#k - Disconnect all\r\n";
                text += "#b!shutdown#k - Shutdown server\r\n";
                text += "#b!shutdowntime <minutes>#k - Shutdown in time\r\n";
                text += "#b!lolcastle#k - LOL castle\r\n";
                text += "#b!startprofiling#k - Start profiling\r\n";
                text += "#b!stopprofiling#k - Stop profiling\r\n";
                text += "#b!fixednpc#k - Fixed NPC\r\n";
                text += "#b!unban <name>#k - Unban player\r\n";
                text += "#b!givenx <name> <amount>#k - Give NX\r\n";
                text += "#b!givedonationpoints <name> <amount>#k - Give donation points\r\n";
                text += "#b!loadsellyconfig#k - Load selly config\r\n";
                text += "#b!reloadwheel#k - Reload wheel\r\n";
                break;
        }

        cm.sendNext(text);
    } else if (status == 3) {
        cm.dispose();
    }
}
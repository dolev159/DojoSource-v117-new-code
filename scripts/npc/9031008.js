/*
	名字:	隱藏地圖
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
*/

var ticket = [4001482, 4001483, 4001480, 4001481];
var map = [910001003, 910001004, 910001005, 910001006];
var name = ["Novice Secret Herb Patch", "Intermediate Secret Herb Patch", "Novice Secret Mine", "Intermediate Secret Mine"];

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getProfessionLevel(92000000) >0 || cm.getPlayer().getProfessionLevel(92010000) > 0 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendOk("You must be learn Herbalism from Saffron, Mining from Cole, or have a Secret Herb Patch/Secret Mine Ticket to enter.");
		cm.dispose();
}
}

function action1(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3197)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3198)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3195)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3196)).getStatus() == 1 ? 2 : 5);
	eval(reactor)(mode, type, selection);
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Where do you want to go? \r\n#L3##bSaffron's Herb Field#l\r\n#L4#Cole's Mine#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3195)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3196)).getStatus() == 1) {
			cm.getPlayer().changeMap(cm.getMap(910001001), cm.getMap(910001001).getPortal(1)); //斯塔切的藥草田
			cm.dispose();
			return;
			}
			cm.sendOk("You must attend Saffron's lecture first.");
			cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3197)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3198)).getStatus() == 1) {
			cm.getPlayer().changeMap(cm.getMap(910001002), cm.getMap(910001002).getPortal(1)); //諾本的礦山
			cm.dispose();
			return;
			}
			cm.sendOk("You must attend Cole's lecture first.");
			cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Where do you want to go? \r\n#L0##bNovice Secret Herb Patch#k (Silver Herb, Magenta Herb)#l\r\n#L1##bIntermediate Secret Herb Patch#k (Blue Herb, Brown Herb)#l\r\n#L2##bNovice Secret Mine#k (Silver Vein, Magenta Vein)#l\r\n#L3##bIntermediate Secret Mine#k (Blue Vein, Brown Vein)#l");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(ticket[selection])) {
			cm.gainItem(ticket[selection], -1);
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Yon will now enter the " + name[selection] + ". You will not be able to re-enter after you leave."));
			cm.getPlayer().changeMap(cm.getMap(map[selection]), cm.getMap(map[selection]).getPortal(1));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You cannot enter without an " + name[selection] + " Ticket."));
			cm.dispose();
}
}
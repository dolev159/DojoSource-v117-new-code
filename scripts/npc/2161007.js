/*
	名字:	簡的弟弟
	地圖:	危險的第一座塔樓
	描述:	921140100
*/

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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendNext("You came to save me? No, Ani is not here at the moment, but his monsters are. If we want to escape this tower, we'll have to start by getting rid of his Red Crockies!");
			cm.dispose();
			return;
			}
			cm.sendNext("Sob... I... I want to go home.");
			break;
	case 1:
		cm.sendNextPrev("Eh? Wh-who are you? Did you come here to help me?Please, get me out of here! I'm so, so scared!");
		break;
	case 2:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You're carrying too much to take Jenn's brother."));
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainItem(4032831, 1);
			cm.getPlayer().changeMap(cm.getMap(211060200), cm.getMap(211060200).getPortal(3));
}
}
/*
	名字:	洛哈
	地圖:	亞泰爾營地
	描述:	300000000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21752)).getStatus() != 1) {
		cm.sendOk("So, you don't need the keys?");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4032326) > 9) {
		cm.sendOk("You didn't find all the lost keys?");
		cm.dispose();
		return;
		}
		cm.sendYesNo("Haven't you found all #b10 Wooden Keys#k? Would you like to go now and find them?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("I guarantee those Wild Boars stole the keys!");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(930010001), cm.getMap(930010001).getPortal(1));
		}
		cm.dispose();
}
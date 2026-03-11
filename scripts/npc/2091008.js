/*
	名字:	真真
	地圖:	桃花仙境
	描述:	250000000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21743)).getStatus() != 1) {
		cm.sendOk("You don't look like someone who needs materials.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4000588) > 49 && cm.getPlayer().itemQuantity(4000589) > 49 && cm.getPlayer().itemQuantity(4000590) > 99) {
		cm.sendOk("It looks like you're almost done finding the Special Ink materials.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("Haven't you found #b50 #t4000588#s#k, #b50 #t4000589#s#k, and #b100 #t4000590#s#k yet? I know a place where you can easily find the materials. Would you like to go there now?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Hmm, it'll be difficult for you to find them, unless you go the place I was thinking about sending you.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(925041000), cm.getMap(925041000).getPortal(1));
		}
		cm.dispose();
}
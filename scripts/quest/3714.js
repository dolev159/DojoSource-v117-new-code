/*
	名字:	闇黑龍王遺留下來的東西…
	地圖:	九靈龍巢穴
	描述:	240040612
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Kyuuu... kyuuu... \r\n\r\n#L0##b(Oh my gosh, it's cute! Move in close to see what it's doing.)#l");
		break;
	case 1:
		qm.sendAcceptDecline("Kyuuu...cough cough! \r\n\r\n#b(The dragon was coughing like something was stuck in its throat. Would you like to help the dragon spit it out?)");
		break;
	case 2:
		qm.sendNext("The baby dragon wound up coughing out a red piece of rock. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v2041200# 1 #t2041200#");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Use item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(3714).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4001094, -1);
			qm.gainItem(2041200, 1);
			qm.dispose();
}
}
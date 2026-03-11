/*
	名字:	駱駝計程車
	地圖:	快速移動
	描述:	快速移動
*/

function start() {
	cm.sendYesNoS("Would you like to take the #b#p2110005##k to #b" + (cm.getPlayer().getMap().getId() == 261000000 ? "#m260000000#" : "#m261000000#") + "#k, the " + (cm.getPlayer().getMap().getId() == 261000000 ? "Oasis town" : "town of Alchemy") + "? The fare is #b1500 mesos#k.", 4);
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNextS("Take a moment to think about it, then talk to me when you're ready.", 4);
		break;
	case 1:
		if (cm.getPlayer().getMeso() < 1500) {
			cm.sendNextS("You don't have enough mesos.", 4);
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(cm.getPlayer().getMap().getId() == 260000000 ? 261000000 : 260000000), cm.getMap(cm.getPlayer().getMap().getId() == 260000000 ? 261000000 : 260000000).getPortal(0));
			cm.gainMeso(-1500);
			}
			cm.dispose();
}
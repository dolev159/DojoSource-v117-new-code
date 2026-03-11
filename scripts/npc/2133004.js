/*
	名字:	小精靈
	地圖:	森林空地
	描述:	930000500
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
		reactor = 'action' + cm.getPlayer().getMap().getId();
		eval(reactor)(mode, type, selection);
}

function action930000400(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendNext("Thank you for rescuing me. I was poisoned and forced to work as the mysterious man's slave. But now I can use all the knowledge against him! Talk to your party leader to proceed.");
			cm.dispose();
			return;
			}
			cm.sendNext("Thank you for rescuing me. I was poisoned and forced to work as the mysterious man's slave. But now I can use all the knowledge against him! I'll send you deeper into the forest.");
			break;
	case 1:
		cm.warpMap(930000500, 0);
		cm.dispose();
}
}

function action930000500(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().itemQuantity(4001163) < 1) {
			cm.sendOk("He was using the Purple Stone of Magic to study something... He probably has a bunch of spares at his desk. Get one!");
			cm.dispose();
			return;
			}
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			cm.sendNext("You have the Purple Stone of Magic! My evil captor used to take it to the altar for 'research.' Maybe you ought to try that, too. I'll send you to the #bForest of Poison#k right away!");
			break;
	case 1:
		cm.warpMap(930000600, 0);
		cm.dispose();
}
}
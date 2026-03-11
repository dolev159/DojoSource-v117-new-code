/*
	名字:	天藍氣球
	地圖:	遺棄之塔&amp;lt;第4階段&gt;
	描述:	922010700
*/

var status;

var open = true;

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
		eim = cm.getPlayer().getEventInstance();
		reactor = 'action' + (eim.getProperty("stage4") == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId() ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Welcome to the fourth stage. Here, you must face the powerful #b#o9300010##k. #b#o9300010##k is a fearsome opponent, so do not let your guard down. Once you defeat it, let me know and I'll show you to the next stage.");
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		if (eim.getProperty("stage4") > 0 && open) {
			cm.sendNext("Congratulations on clearing the quests for this stage. Please use the portal you see over there and move on to the next stage.");
			cm.dispose();
			return;
			}
			open = false;
			cm.sendNext("Wow, not a single #b#o9300010##k left! I'm impressed! I can open the portal to the next stage now.");
			break;
	case 1:
		eim.setProperty("stage4", 1);
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("gate", 2));
		cm.sendNextPrev("The portal that leads you to the next stage is now open.");
		break;
	case 2:
		cm.dispose();
}
}
/*
	名字:	邪摩斯
	地圖:	冰雪峽谷入口
	描述:	921120000
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
		if (status < 1) {
		cm.sendOk("What, you're still not ready? Talk to me when you're ready, geez.");
		cm.dispose();
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
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("You're not a party leader. Have your party leader talk to me.");
			cm.dispose();
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 921120000) {
			cm.sendNext("Hey, what did you do with all your party members? You have to have all your party members along.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Are you all ready? If you're ready, follow me. Just remember that if I die, it's all over. Your mission is to protect me.");
			break;
	case 1:
		cm.sendNext("Okay. Let's go. Follow me.");
		break;
	case 2:
			var tick = 0;
			cm.showNpcSpecialEffect(2022005, "start");
			schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
		if (tick == 1) {
			schedule.cancel(true);
		if (party.size() < 2) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Please enter after forming a party of two or more."));
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Rex");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Some other party has already gotten in to try clearing the quest. Please try again later."));
			cm.dispose();
			return;
			}
			tick++;
		}, 8000);
}
}
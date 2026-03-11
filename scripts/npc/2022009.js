/*
	名字:	邪摩斯
	地圖:	冰雪峽谷1
	描述:	921120005
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
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId() ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendOk("Eliminate all the monsters.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7816)).getCustomData() == 2) {
			cm.dispose();
			return;
			}
			cm.sendNext("Good job, you've eliminated all the monsters. Now, let's go seal up Rex.");
			break;
	case 1:
		cm.dispose();
		Packages.server.quest.MapleQuest.getInstance(7816).forceStart(cm.getPlayer(), 0, 2);
		cm.showNpcSpecialEffect(2022009, "start");
		var tick = 0;
		schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
		if (tick == 1) {
			cm.warpMap(921120100, 0);
			schedule.cancel(true);
			return;
			}
			tick++;
		}, 7000);
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendOk("You're not a party leader. Have your party leader talk to me.");
		cm.dispose();
}
}
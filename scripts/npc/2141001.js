/*
	名字:	被遺忘的神殿管理人
	地圖:	被遺忘的黃昏
	描述:	270050000
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
	switch (status) {
	case 0:
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("You can request to enter only in a party.");
			cm.dispose();
			return;
			}
			cm.sendSimple("#e<Boss: Boss: Pink Bean>#n \r\nThe intruder is headed toward the goddess's altar! If you don't stop them soon, something awful is bound to happen! \r\n\r\n#L0##bRequest to enter <Boss: Pink Bean>.");
			break;
	case 1:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Only party leaders can initiate entry.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); i++)
		if (cm.getPlayer().getParty().getMembers().get(i).getMapid() != 270050000) {
			cm.sendNext("All party members must be on the same map to enter.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("PinkBeanBattle");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Another party is already inside.");
			cm.dispose();
}
}
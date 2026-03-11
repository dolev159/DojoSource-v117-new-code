/*
	名字:	崔斯坦的遺物
	地圖:	神殿底層
	描述:	105100100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Does it sound like too much work? You might find something good there, you know...");
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
		qm.sendAcceptDecline("I supposed my master's old keepsake is still in storage. No one's ever asked for it before. Why don't you go retrieve it?");
		break;
	case 1:
		if (qm.getMap(910510700).getCharacters().size() > 0) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
			qm.dispose();
			return;
			}
			qm.dispose();
			qm.getMap(910510700).resetFully();
			qm.getPlayer().changeMap(qm.getMap(910510700), qm.getMap(910510700).getPortal(0));
			Packages.server.quest.MapleQuest.getInstance(2635).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}
/*
	名字:	基礎體力測試
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Aran, is 5 not enough? It's fine if you want to defeat more for training. It saddens me, but I'll turn a blind eye this time and let you hunt a bit more...");
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
		qm.sendNext("Now, you will undergo a test that will determine whether you're fit or not. All you have to do is take on the most powerful monster on this island, #o0100134#s. About #r50#k of them would suffice, but...");
		break;
	case 1:
		qm.sendAcceptDecline("We can't have you wipe out the entire population of #o0100134#s, since they aren't many of them out there. How about 5 of them? You're here to train, not to destroy the ecosystem.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21018).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1"));
		qm.dispose();
}
}
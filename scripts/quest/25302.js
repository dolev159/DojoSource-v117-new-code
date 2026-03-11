/*
	名字:	時尚移動方法
	地圖:	研究所1樓走道
	描述:	261010000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Huh? You want it later? You sure? All that money looks pretty heavy...");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25302)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(25302).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("You got the 10 million Mesos? Thank goodness! I already made you a new engine. If you didn't bring that money, I would've been up to my neck in debt! But I guess you're ready to get on the road...");
			break;
	case 1:
		qm.gainMeso(-10000000);
		Packages.server.quest.MapleQuest.getInstance(25302).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20031160), 1, 1, -1);
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Rolls Mount skill obtained!"));
		qm.sendNext("Here's the convertible Mr.#p1401000# ordered! Feast your eyes on... Rolls! As requested, it's got a luxurious eggshell finish with slick turquoise stripes! Perfect, isn't she?");
		break;
	case 2:
		qm.dispose();
}
}
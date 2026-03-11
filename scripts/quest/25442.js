/*
	名字:	不是一個人的戰鬥
	地圖:	耶雷弗散步步道
	描述:	913050204
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("I am glad to finally meet you... again, Phantom.");
		break;
	case 1:
		qm.sendNextPrev("I am sure you had your reasons for denying me the chance to thank you last time we met, but I have something important to tell you.");
		break;
	case 2:
		qm.sendNextPrev("I know how difficult it is to face a corrupted Transcendent... and how much effort you and the heroes put into sealing the Black Mage.");
		break;
	case 3:
		qm.sendNextPrev("Hundreds of years ago, only five people were brave enough to stand up and fight the Black Mage, but things are different today. There are hundreds who would fight alongside you.");
		break;
	case 4:
		qm.sendNextPrev("Please do not carry the burden of this fight on your shoulders. You have allies, if you are willing to trust us. Whenever you are in danger, I will always offer a helping hand...");
		break;
	case 5:
		qm.sendNextPrev("Just as you've done for us.");
		break;
	case 6:
		qm.sendNextPrevS("You make a compelling argument, Cygnus. I suppose you and your friends could have helped me out a bit back there.", 16);
		break;
	case 7:
		qm.sendNextPrevS("I'll join your cause. I figure an alliance like yours could use a little help from the greatest thief in the history of Maple World.", 16);
		break;
	case 8:
		qm.sendNextPrev("Hehehe, I welcome you to our alliance, Master Thief Phantom. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 36700 exp");
		break;
	case 9:
		qm.dispose();
		qm.gainExp(36700);
		qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20030190), 1, 1, -1);
		Packages.server.quest.MapleQuest.getInstance(25442).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(25442));
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("WiIl of the Alliance obtained!"));
}
}
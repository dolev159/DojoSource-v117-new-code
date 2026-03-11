/*
	名字:	調查黑色翅膀的幹部
	地圖:	特魯的情報商店
	描述:	104000004
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 7) {
		qm.sendNext("Oh well, I get paid either way.");
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
		qm.sendNext("You know I've been collecting information on Seal Stones since I found that one on Victoria lslands, right? I told #p1401002# about it.");
		break;
	case 1:
		qm.sendNextPrevS("I heard that someone almost took that Seal Stone out from underneath #p1404002#'s crooked nose. I guess a few hundred years on ice can dull the senses...", 2);
		break;
	case 2:
		qm.sendNextPrev("I don't think it was #p1404002#'s fault. Trying to protect the stone here and the one in #m130000000# was a bit much. Besides, the Victoria lsland Seal Stone is still safe.");
		break;
	case 3:
		qm.sendNextPrevS("lf you say it's safe, I'll take that as a good sign. Besides, the Seal Stone is useless as long as the Black Mage remains locked away. I wouldn't concern myself with it if I were you.", 2);
		break;
	case 4:
		qm.sendNextPrev("I still have a feeling we should look into it, but enough of that for now. I've been tracking that #rBlack Wings member#k I encountered on Victoria lsland...");
		break;
	case 5:
		qm.sendNextPrevS("#rPuppeteer Francis#k?", 2);
		break;
	case 6:
		qm.sendNextPrev("That's the one. He's kept himself on the move, but I located a hideout over at the Stone Golem Temple not too long ago that seems to match up with his needs.");
		break;
	case 7:
		qm.sendNextPrevS("You've proven yourself quite useful, my friend.", 2);
		break;
	case 8:
		qm.sendAcceptDecline("I do what I can. I've had eyes on the area for a while, but I haven't seen anything too suspicious. Do you want to go over there now? #bIf you want, I can send you there directly.");
		break;
	case 9:
		qm.sendNextS("I'm glad the information was helpful. lt sort of seems like #p1404000# is on the outs with the Black Wings, but he might have a good lead. I'll let you know if I find anything else.", 1);
		break;
	case 10:
		Packages.server.quest.MapleQuest.getInstance(25419).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(100040000), qm.getMap(100040000).getPortal(0));
		qm.dispose();
}
}
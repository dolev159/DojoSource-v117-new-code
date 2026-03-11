/*
	名字:	疑惑
	地圖:	瑞安西部場地
	描述:	914040001
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
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		qm.sendNextS("There's something I've always wanted to ask about you heroes. I'd ask #p1404002#. but you know... the memories. Maybe you can tell me.", 1);
		break;
	case 2:
		qm.sendNextPrevS("And what quandary would you pose for a great hero of the past? I promise, I will do my best to answer.", 17);
		break;
	case 3:
		qm.sendNextPrevS("When you were fighting the Black Mage all those years ago, did the common folks know who you were? I mean, did they even know you were fighting?", 1);
		break;
	case 4:
		qm.sendNextPrevS("lt would be hard to miss a villain as overtly awful as the Black Mage, my dear. Yes, we were well known for saving the little folk and standing against his tyranny. Why do you ask?", 17);
		break;
	case 5:
		qm.sendNextPrevS("I thought so. lt seemed like it would be impossible to miss your accomplishments... but, #rwhy were you all forgotten#k?", 1);
		break;
	case 6:
		qm.sendNextPrevS("Forgotten? What are you talking about?", 17);
		break;
	case 7:
		qm.sendNextPrevS("You and the others SAVED Maple World. You defeated a monster that everybody thought was going to rule them for eternity. That sort of thing usually goes down in the history books.", 1);
		break;
	case 8:
		qm.sendNextPrevS("I just find it so odd that there are no records of one of the greatest battles EVER, even if it was hundreds of years ago.", 1);
		break;
	case 9:
		qm.sendNextPrevS("ln fact, it's almost impossible to find any mention of when you were around. You may have been heroes back then, but nobody knows it these days.", 1);
		break;
	case 10:
		qm.sendNextPrevS("I certainly feel more heroic now...", 17);
		break;
	case 11:
		qm.sendNextPrevS("The Rien Clan knows who you are. We've got a list of every feat and achievement you and your friends ever made.", 1);
		break;
	case 12:
		qm.sendNextPrevS("Of course, nobody ELSE knows who you are, but they don't know who the Black Mage is either. Sort of like you all got wiped from the history books. That smells fishy to me...", 1);
		break;
	case 13:
		qm.sendNextPrevS("Fishy?", 17);
		break;
	case 14:
		qm.sendNextPrevS("Do you really think every book or ledger in the world could somehow miss a huge event like that? No. #rSomeone has been erasing you and the Black Mage from history#k.", 1);
		break;
	case 15:
		qm.sendNextPrevS("You think this has been going on for hundreds of years?!", 17);
		break;
	case 16:
		qm.sendNextPrevS("I'm not sure, but I'd have to guess that it would have to be.", 1);
		break;
	case 17:
		qm.sendNextPrevS("I went through a lot to make that history... I was hoping I'd have a FEW adoring fans when I got here. I'm assuming this is not one of your untested theories?", 17);
		break;
	case 18:
		qm.sendNextPrevS("Well, I don't have any evidence yet. Maybe if you could dig some up while you're out on adventuring...", 1);
		break;
	case 19:
		qm.sendNextPrevS("I'll look into it. lf someone has been mucking about history for hundreds of years, there must be a few clues. Nobody can cover their tracks for that long.", 17);
		break;
	case 20:
		qm.sendNextPrevS("Are you going to get #p1404002#'s help? You two were supposed to be friends, right?", 1);
		break;
	case 21:
		qm.sendNextPrevS("#p1404002#'s already found a spot in the new world. It would be right for me to intrude. Besides, I always work alone!", 17);
		break;
	case 22:
		qm.sendNextPrevS("...", 1);
		break;
	case 23:
		qm.sendNextPrevS("H-hey... I'll call on my old friends when I need them, and not a moment before!", 17);
		break;
	case 24:
		qm.sendNextPrevS("What are you planning next?", 1);
		break;
	case 25:
		qm.sendNextPrevS("I'll do some digging on the missing historical records. Are you going to stay here? lt might be dangerous. I could certainly set you up in a nice cottage on a warm beach somewhere if you want...", 17);
		break;
	case 26:
		qm.sendNextPrevS("Rien is my home. We may have been caught off-guard this time, but we're on the defense now. Between #p1404002# and the other warriors, this may be the safest place in the world. If things get too bad, I'll send the Seal Stone to the alliance.", 1);
		break;
	case 27:
		qm.sendNextPrevS("I was wondering how #p1404002# was keeping it together after all these years. A capable lady-friend can get a hero far in life. Keep yourself safe, my lady. Be seeing you.", 17);
		break;
	case 28:
		qm.sendNextPrevS("Is that so?", 1);
		break;
	case 29:
		qm.dispose();
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		qm.getPlayer().changeMap(qm.getMap(140000000), qm.getMap(140000000).getPortal(0));
		var tick = 0;
		schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
		if (tick == 1) {
			Packages.server.quest.MapleQuest.getInstance(25427).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(25427));
			schedule.cancel(true);
			qm.dispose();
			return;
			}
			tick++;
		}, 4000);
}
}
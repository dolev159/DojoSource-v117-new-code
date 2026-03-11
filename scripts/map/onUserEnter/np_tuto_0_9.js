/*
	名字:	Hidden Street
	地圖:	Nautilus Bunkroom
	描述:	552000050
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		ms.dispose();
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53257)).getStatus() > 0) {
			ms.dispose();
			return;
			}
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		ms.sendNextS("You're up. How ya feeling? Any concussions? Fuzzy vision? Head injury rage?", 5, 9270089);
		break;
	case 2:
		ms.sendNextPrevS("What's going on...? Are you the... royal guards? l didn't do anything!", 3);
		break;
	case 3:
		ms.sendNextPrevS("Yep, definitely a concussion... Relax, cowpoke! You're safe here with us scallywags.", 5, 9270088);
		break;
	case 4:
		ms.sendNextPrevS("Calm yourself down before I shackle you to the bed. You're on board the Nautilus and I'm her captain, Kyrin.", 5, 9270089);
		break;
	case 5:
		ms.sendNextPrevS("Bark talls me you're from... space? Why did you come to Maple World?", 5, 9270089);
		break;
	case 6:
		ms.sendNextPrevS("#b(Maple... World? l've never even heard of that! This place must be a real dump to get left off the galactic charts.)", 3);
		break;
	case 7:
		ms.sendNextPrevS("#b(I'd better keep low for now... let these outlaws think? I'm not a threat. They saved my backside, but a bounty as big as mine has a funny way of changin' people's minds.)", 3);
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 9:
		ms.sendNextS("I was on a space-vaoation when my ship's converter fan pooped out. Lucky for me your, planet was close and soft enough to touch down on.", 3);
		break;
	case 10:
		ms.sendNextPrevS("Y-You're sayin' you came from OUTER SPACE?! Hahahahaha! Captain, you don't believe this nonsense, do you?", 5, 9270088);
		break;
	case 11:
		ms.sendNextPrevS("#b(I knew that ship wasn't regular old Maple tech. I wonder how much I could make off of a real live alien...)", 5, 9270089);
		break;
	case 12:
		ms.sendNextPrevS("Put your tongue back in your mouth, Bark. Tell me about your ship, alien. lt was awfully small to be pumping out that kind of power. You sure you're not just trying to cover up some secret government experiment?", 5, 9270089);
		break;
	case 13:
		ms.sendNextPrevS("Captain... You gotta be kidding.", 5, 9270088);
		break;
	case 14:
		ms.sendNextPrevS("My kin figured out focus-beam propulsion a hundred years ago. You can believe whatever you want, but it works.", 3);
		break;
	case 15:
		ms.sendNextPrevS("(With that kind of power, the Nautilus would be unstoppable! I am gonna be SO RICH.)", 5, 9270088);
		break;
	case 16:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 17:
		ms.sendNextS("We'll help you fix up your craft. In the meantime, you need to stay here and rest. I'll make sure the crew gives you a wide berth.", 5, 9270089);
		break;
	case 18:
		ms.sendNextPrevS("lf the Captain likes you, so do I. That's why I'm gonna give you back all the stuff I stole from you when you crashed.", 5, 9270088);
		break;
	case 19:
		ms.sendNextPrevS("Good show of hospitality there, Bark. That's a fancy looking gun you've got, alien, but what's with the busted up chunk of rock?", 5, 9270089);
		break;
	case 20:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 21:
		ms.sendNextS("#b(That light... It has to be the core! B-but,it's all broken!)", 3);
		break;
	case 22:
		ms.sendNextS("Oh! l know that look! This is the thing you were looking for at the crash, ain't it?", 5, 9270088);
		break;
	case 23:
		ms.sendNextS("That's the one. Thanks for... giving it back to me. I'll make it up to you.", 3);
		break;
	case 24:
		ms.sendNextPrevS("Ha! I'd be careful about what you say around old Black Bark. He never forgets a debt!", 5, 9270088);
		break;
	case 25:
		ms.sendNextS("(These outlaws should be the perfect bunch to keep me hidden for now. All l've gotta do is stick with them and lay low.)", 3);
		break;
	case 26:
		ms.sendNextPrevS("Why don't you get out and stretch your legs. lf you're gonna stay a while, you should start getting in good with the crew right away. They're a lively bunch at the best of times. Come by the #m120000101# when you're done.", 5, 9270089);
		break;
	case 27:
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Follow the arrows to the portal."));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 100));
		break;
	case 28:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.sendNextS("(Even this tiny fragment of the Core is giving off a lot of power. I may make it yet.)", 17);
		break;
	case 29:
		while (ms.getPlayer().getLevel() < 10) {
			ms.getPlayer().levelUp();
			}
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53257)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(53257).forceStart(ms.getPlayer(), ms.getNpc(), 1);
			ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53256)).setStatus(1);
			ms.getPlayer().updateQuest(ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53256)), true);
			ms.getPlayer().changeJob(508);
			ms.getPlayer().gainSP(-26, 0);
			ms.gainEquip(1352300, -10);
			ms.resetStats(4, 20, 4, 4);
			ms.gainItem(1492139, 1);
			}
			ms.sendNextPrevS("(If I'm gonna surround myself with outlaws, I need my gun at my side. \r\nJust need to open my inventory first. I wonder if the l key still works.)", 3);
			break;
	case 30:
		ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.AranTutInstructionalBalloon("UI/tutorial.img/29"));
		ms.dispose();
}
}
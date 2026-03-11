/*
	名字:	人質
	地圖:	克蘭卡叢林盆地
	描述:	600010200
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28763)).getStatus() > 0 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28749)).getStatus() < 1) {
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getPosition().x > 300 || cm.getPlayer().getPosition().y > -1091) {
			cm.sendOkS("(It's too far away.)", 3);
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		cm.sendNextS("Help! I yelled at some aliens about digging without a permit and they nabbed me! I don't deserve this!", 1);
		break;
	default:
		nun = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28762)).getStatus() + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28763)).getStatus() + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28764)).getStatus() + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28765)).getStatus() + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28766)).getStatus();
		reactor = 'action' + (nun < 4 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("(Press the Ctrl key rapidly to break the lock)"));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/guide1/0", 5000, 0, -200, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 5000));
		break;
	case 3:
		cm.sendNextS("(The lock popped off with a couple of good whacks.)", 3);
		break;
	case 4:
		cm.sendNextPrevS("Take this Return Scroll and get back to NLC!", 3);
		break;
	case 5:
		cm.sendNextPrevS("You saved me! I'll never yell at an alien about digging a hole again!", 1);
		break;
	case 6:
		cm.sendNextPrevS("Onlly " + (4 - nun) + " more to go.", 3);
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(28763).forceStart(cm.getPlayer(), 0, null);
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNextPrevS("(The lock popped off with a couple of good whacks.)", 3);
		break;
	case 3:
		cm.sendNextPrevS("Take this Return Scroll and get back to NLC!", 3);
		break;
	case 4:
		cm.sendNextPrevS("You saved me! I'll never yell at an alien about digging a hole again!", 1);
		break;
	case 5:
		cm.sendNextPrevS("The townspeople are safe. Time to go talk to the mayor.", 3);
		break;
	case 6:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 7:
		cm.sendNextS("You! You're the one messing with our mining operation!", 5, 9201174);
		break;
	case 8:
		cm.sendNextPrevS("Get out of here, you space jerks--is what l would say if there weren't a whole bunch of you... Hello, aliens, how's it goin?", 3);
		break;
	case 9:
		cm.sendNextPrevS("The aliens have us surrounded!", 1);
		break;
	case 10:
		cm.sendNextPrevS("There's no choice! Use the Return Scroll l gave you and get back to town!", 3);
		break;
	case 11:
		cm.sendNextPrevS("B-but what about you?!", 1);
		break;
	case 12:
		cm.sendNextPrevS("I can totally beat up a bunch of wimpy aliens!", 3);
		break;
	case 13:
		cm.sendNextPrevS("The Mapling is ours now! Lock it up until we can use the brainwasher on it!", 5, 9201174);
		break;
	case 14:
		cm.sendNextPrevS("Yes, sir! I love the brainwasher!", 5, 9201174);
		break;
	case 15:
		cm.sendNextPrevS("No! My brain doesn't need washing! It's totally clean, I promise!", 3);
		break;
	case 16:
		cm.sendNextPrevS("It's never clean enough! Knock this stinky beast out!", 5, 9201174);
		break;
	case 17:
		cm.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("demonSlayer/whiteOut", 3));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/BasicEff.img/CannonJump", 0, 0, -50, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 18:
		cm.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face00"));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 4));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 19:
		cm.dispose();
		Packages.server.quest.MapleQuest.getInstance(28763).forceStart(cm.getPlayer(), 0, null);
		Packages.server.quest.MapleQuest.getInstance(28749).forceComplete(cm.getPlayer(), 0);
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		cm.getPlayer().changeMap(cm.getMap(610040500), cm.getMap(610040500).getPortal(0));
}
}
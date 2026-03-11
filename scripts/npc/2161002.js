/*
	名字:	盧頓
	地圖:	第四座塔
	描述:	211060800
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 211060200 ? 0 : cm.getPlayer().getMap().getId() == 211060400 ? 3 : cm.getPlayer().getMap().getId() == 211060600 ? 6 : 11);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3139)).getStatus() == 0 ? 1 : 2);
	eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("It has been some time since anyone set foot within these walls. Brave you are, but foolhardy as well!", 4);
		break;
	case 1:
		cm.sendNextPrevS("...W-who's there...?! Are you a g-ghost???", 16);
		break;
	case 2:
		cm.sendNextPrevS("My apologies. I will not harm you. I am #b#p2161002##k, guardian of this castle. I passed on long ago, but my spirit remain trapped here.", 4);
		break;
	case 3:
		cm.sendNextPrevS("Why are you're stuck? Are you one of those 'avenge me so I can go free' type ghosts? 'Cause I'm getting kind of tired of those.", 16);
		break;
	case 4:
		cm.sendNextPrevS("Well... In a way, yes. Come to me, and I will tell you more. First, ascend to the roof of the First Tower, face the creatures that prowl upon it, and break the magic ward there. A certain keysmith in the area may be of help.", 4);
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(3139).forceStart(cm.getPlayer(), 0, null);
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		if (!cm.getInfoQuest(3139).equals("clear=1;clear=1")) {
			cm.sendNextS("To pass this door, you must eliminate the #rRed Crockies#k on the roof of the First Tower.", 4);
			cm.dispose();
			return;
			}
			cm.sendNextS("You eliminated the Red Crockies and broke the first ward. You are strong, but you still need to break two more wards before you reach me. Why don't you turn back while you still can?", 4);
			break;
	case 1:
		cm.sendNextPrevS("Ooh, I'm all fired up now! I'll be right there!", 16);
		break;
	case 2:
		cm.sendNextPrevS("I will pray for your victory. Please save these corrupted creatures.", 4);
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(3139).forceComplete(cm.getPlayer(), 0);
		cm.getPlayer().changeMap(cm.getMap(211060300), cm.getMap(211060300).getPortal(2));
		cm.gainItem(4032832, -1);
		cm.gainExp(682200);
		cm.dispose();
}
}

function action3(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3140)).getStatus() == 0 ? 4 : 5);
	eval(reactor)(mode, type, selection);
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("You have reached the Second Gate. Now, listen well. The ward on the Second Gate will break once you slay the #rPrison Guard Boars#k on the roof of the Second Tower.", 4);
		break;
	case 1:
		cm.sendNextPrevS("Prison Guard Boar, huh? Can I eat him afterwards? I carry bacon seasoning with me at all times.", 16);
		break;
	case 2:
		cm.sendNextPrevS("Do as you like, but be warned that they are fearsome swine indeed. Return to the keysmith and obtain the key to the roof of the Second Tower.", 4);
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(3140).forceStart(cm.getPlayer(), 0, null);
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		if (!cm.getInfoQuest(3140).equals("clear=1;clear=1")) {
			cm.sendNextS("To pass beyond, you must slay the #rPrison Guard Boars#k on the roof of the Second Tower.", 4);
			cm.dispose();
			return;
			}
			cm.sendNextS("The Prison Guard Boars were no match for you, but I fear greater obstacles ahead! You must break the last ward. I have faith in you!", 4);
			break;
	case 1:
		cm.sendNextPrevS("You got it, ghost-guy!", 16);
		break;
	case 2:
		cm.sendNextPrevS("I will be waiting beyond the third magic ward. Take special care in these dangerous halls.", 4);
		break;
	case 3:
		map = cm.getPlayer().getPosition().y < -50 ? 90 : 0;
		Packages.server.quest.MapleQuest.getInstance(3140).forceComplete(cm.getPlayer(), 0);
		cm.getPlayer().changeMap(cm.getMap(211060500 -map), cm.getMap(211060500 -map).getPortal(1));
		cm.gainItem(4032833, -1);
		cm.gainExp(682200);
		cm.dispose();
}
}

function action6(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3141)).getStatus() == 0 ? 7 : 8);
	eval(reactor)(mode, type, selection);
}

function action7(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("You have finally reached the last gate. Among this castle's many creatures, the #rPrison Guard Rhinos#k are by the most terrible.", 4);
		break;
	case 1:
		cm.sendNextPrevS("Will the wards be broken once I take them down this time?", 16);
		break;
	case 2:
		cm.sendNextPrevS("Yes, but tread lightly. It would be a shame to see you come so far only to wind up in their bellies.", 4);
		break;
	case 3:
		cm.sendNextPrevS("Don't worry! I'll get that key from Jenn and take care of this!", 16);
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(3141).forceStart(cm.getPlayer(), 0, null);
		cm.dispose();
}
}

function action8(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3167)).getStatus() != 2 ? 9 : 10);
	eval(reactor)(mode, type, selection);
}

function action9(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3167)).getStatus() == 0) {
			cm.sendNextS("To pass through this door, you must slay the #rPrison Guard Rhinos#k on the roof of the Third Tower.", 4);
			cm.dispose();
			return;
			}
			cm.sendNextS("Hey, #p2161002#, I'm supposed to kill some #rBearwolves#k to get the Third Tower key, but I don't see them anywhere. What am I missing?", 16);
			break;
	case 1:
		cm.sendNextPrevS("There are indeed Bearwolves, but they lie in wait at the #b#m211060700##k, beyond your reach. Very well -- I will attempt to weaken the barrier temporarily. Seize the materials for the key while you can.", 4);
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(211060700), cm.getMap(211060700).getPortal(1));
		cm.dispose();
}
}

function action10(mode, type, selection) {
	switch (status) {
	case 0:
		if (!cm.getInfoQuest(3141).equals("clear=1;clear=1")) {
			cm.sendNextS("To pass through this door, you must slay the #rPrison Guard Rhinos#k on the roof of the Third Tower.", 4);
			cm.dispose();
			return;
			}
			cm.sendNextS("You... You've actually done it! I can finally fulfill my royal oath!", 4);
			break;
	case 1:
		cm.sendNextPrevS("A royal oath? Is that something to do with the Lion King?", 16);
		break;
	case 2:
		cm.sendNextPrevS("...Come find me in the Fourth Tower. Quickly, for I already fade. I look forward to meeting you in person...", 4);
		break;
	case 3:
		map = cm.getPlayer().getPosition().y < -250 ? 80 : cm.getPlayer().getPosition().y < 0 ? 90 : 0;
		Packages.server.quest.MapleQuest.getInstance(3141).forceComplete(cm.getPlayer(), 0);
		cm.getPlayer().changeMap(cm.getMap(211060700 -map), cm.getMap(211060700 -map).getPortal(cm.getPlayer().getPosition().y < -250 ? 2 : 1));
		cm.gainItem(4032834, -1);
		cm.gainExp(682200);
		cm.dispose();
}
}

function action11(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendOkS("I can only weaken the seal for a short while. To pass beyond, you must obtain the key to the roof of the Third Tower, then slay the #rPrison Guard Rhinos#k to break the curse.", 4);
		break;
	case 1:
		cm.dispose();
}
}
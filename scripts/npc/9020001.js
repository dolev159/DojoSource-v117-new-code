/*
	名字:	克鲁特
	地圖:	第一次同行&amp;lt;1号门&g
	描述:	910340100
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
		eim = cm.getPlayer().getEventInstance();
		reactor = 'action' + (cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId() ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	reactor = 'action' + (eim.getProperty("stage" + cm.getPlayer().getMap().getId() / 100 % 10) == null ? (cm.getPlayer().getMap().getId() / 100 % 10) + 1 : 14);
	eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	reactor = 'action' + (eim.getProperty("stage" + cm.getPlayer().getMap().getId() / 100 % 10) == null ? (cm.getPlayer().getMap().getId() / 100 % 10) + 6 : 14);
	eval(reactor)(mode, type, selection);
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		if (eim.getProperty("stage1a") == null) {
			cm.sendNext("Hello, and welcome the the first stage. As you can see, this place is full of Ligators. Each Ligator will drop one #bcoupon#k when defeated. Each party member, except the party leader, must come talk to me and then bring me the exact number of #bcoupons#k that I ask for. Once everyone #bcompletes their individual missions#k, the party can move on to the next stage. You must hurry, since the number of stages available depends on how fast you complete this stage. Good luck!");
			eim.setProperty("stage1a", 1);
			cm.dispose();
			return;
			}
		if (eim.getProperty("stage1a") == 1) {
			cm.sendNext("I'm sorry, but at least one party member still hasn't completed their mission. Everyone except the part leader must clear their mission to move on.");
			cm.dispose();
			return;
			}
			cm.sendNext("Congratulations on clearing this stage! I will create a portal that will lead you to the next one. You're on a time limit, so please hurry! Good luck!");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("gate", 2));
			eim.setProperty("stage1", 1);
			cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		if (eim.getProperty("stage2a") == null) {
			cm.sendNext("Hi. Welcome to the 2nd stage. Next to me, you'll see a number of ropes. Out of these ropes, #b3 are connected to the portal that sends you to the next stage#k. All you need to do is have #b3 party members to find the answer ropes and hang on them#k. \r\nBUT, it doesn't count as an answer if you hang on to the rope too low; please bring yourself up enough to be counted as a correct answer. Also, only 3 members of your party are allowed on the ropes. Once they are hanging on, the leader of the party must #bdouble-click me to check and see if the answer's correct or not#k. Now, find the right ropes to hang on!");
			eim.setProperty("stage2a", 1);
			cm.dispose();
			return;
			}
		if (eim.getProperty("stage2b") == null) {
			eim.setProperty("stage2b", Math.random() < 0.2 ? "1110" : Math.random() < 0.4 ? "1101" : Math.random() < 0.7 ? "1011" : "0111");
			}
			var chenhui = 0;
			for (var i = 0; i < 4; i++)
			if (cm.getPlayer().getMap().getNumPlayersItemsInArea(i) > 0) {
			chenhui++;
			}
		if (chenhui != 3) {
			cm.sendNext("It looks like you haven't found the 3 ropes just yet. Please think of a different combination of ropes, Only 3 are allowed to hang on to ropes, and if you hang on to too low, it won't count as an answer; so please keep that in mind. Keep going!");
			cm.dispose();
			return;
			}
			var x = "";
			for (var i = 0; i < 4; i++)
			x += cm.getPlayer().getMap().getNumPlayersItemsInArea(i);
			y = x;
		if (y == eim.getProperty("stage2b")) {
			eim.setProperty("stage2", 1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("gate", 2));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			cm.dispose();
			return;
			}
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/wrong_kor", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Failed", 4));
			cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		if (eim.getProperty("stage3a") != null) {
		if (eim.getProperty("stage3b") == null) {
			eim.setProperty("stage3b", Math.random() < 0.2 ? "11001" : Math.random() < 0.4 ? "01110" : Math.random() < 0.6 ? "10101" : Math.random() < 0.8 ? "10110" :  "10011");
			}
			var chenhui = 0;
			for (var i = 0; i < 5; i++)
			if (cm.getPlayer().getMap().getNumPlayersItemsInArea(i) > 0) {
			chenhui++;
			}
		if (chenhui != 3) {
			cm.sendNext("You haven't found the 3 correct platforms yet. Don't forget that you must have 1 person stand in the center of each of the 3 correct platforms to be counted as a correct answer. If necessary, you can place a Platform Puppet to stand in for a character on any platform. Good luck!");
			cm.dispose();
			return;
			}
			var x = "";
			for (var i = 0; i < 5; i++)
			x += cm.getPlayer().getMap().getNumPlayersItemsInArea(i);
			y = x;

		if (y == eim.getProperty("stage3b")) {
			eim.setProperty("stage3", 1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("gate", 2));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			cm.dispose();
			return;
			}
			hui = 0;
			for (var i = 0; i < 5; i++)
		if (eim.getProperty("stage3b")[i] == 1 && eim.getProperty("stage3b")[i] == y[i]) {
			hui++;
			}
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Currently, you've selected " + hui + " answer platforms."));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("Currently, you've selected " + hui + " answer platforms."));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/wrong_kor", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Failed", 4));
			cm.dispose();
			return;
			}
			cm.sendNext("Hello, Welcome to the 3rd stage. Next to you you'll see barrels with kittens inside on top of the platforms. Out of these platform, #b3 of them lead to the portals for the next stage. 3 of the party members need to find the correct platform to step on and clear the stage. \r\nBUT, you need to stand firm right at the center of it, not standing on the edge, in order to be counted as a correct answer, so make sure to remember that. Also, only 3 members of your party are allowed on the platforms. Once the members are on them, the leader of the party must double-click me to check and see if the answer's right or not#k. Now, find the correct platforms~!");
			break;
		case 1:
			cm.sendNextPrev("If there aren't enough people to stand on the platform, purchase a Platform Puppet #v4001454# from Nella and place it on the correct platform. The platform will mistake Platform Puppet for a character. Nifty, huh?");
			break;
		case 2:
			eim.setProperty("stage3a", 1);
			cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendOk("Hello. Welcome to the 4th stage. Walk around the map and you'll be able to find some monsters. The monsters may be familiar to you, but they may be much stronger than you think, so please be careful. Good luck!");
		break;
	case 1:
		cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendNext("Hello, welcome to the fifth and final stage. This time, you must defeat the boss, #rKing Sime#k. Good luck!");
			cm.dispose();
			return;
			}
			cm.sendSimple("Congratulations! All the stages have been cleared. If you are done, I can lead you outside. \r\n#L0#I want to leave now#l");
			break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(910340000), cm.getMap(910340000).getPortal(0));
		cm.dispose();
}
}

function action7(mode, type, selection) {
	reactor = 'action' + (eim.getProperty(cm.getPlayer().getName()) == null ? 12 : 13);
	eval(reactor)(mode, type, selection);
}

function action8(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Hi. Welcome to the 2nd stage. Next to me, you'll see a number of ropes. Out of these ropes, #b3 are connected to the portal that sends you to the next stage#k. All you need to do is have #b3 party members to find the answer ropes and hang on them#k. \r\nBUT, it doesn't count as an answer if you hang on to the rope too low; please bring yourself up enough to be counted as a correct answer. Also, only 3 members of your party are allowed on the ropes. Once they are hanging on, the leader of the party must #bdouble-click me to check and see if the answer's correct or not#k. Now, find the right ropes to hang on!");
		break;
	case 1:
		cm.dispose();
}
}

function action9(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Hello, Welcome to the 3rd stage. Next to you you'll see barrels with kittens inside on top of the platforms. Out of these platform, #b3 of them lead to the portals for the next stage. 3 of the party members need to find the correct platform to step on and clear the stage. \r\nBUT, you need to stand firm right at the center of it, not standing on the edge, in order to be counted as a correct answer, so make sure to remember that. Also, only 3 members of your party are allowed on the platforms. Once the members are on them, the leader of the party must double-click me to check and see if the answer's right or not#k. Now, find the correct platforms~!");
		break;
	case 1:
		cm.dispose();
}
}

function action10(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendOk("Hello. Welcome to the 4th stage. Walk around the map and you'll be able to find some monsters. The monsters may be familiar to you, but they may be much stronger than you think, so please be careful. Good luck!");
		break;
	case 1:
		cm.dispose();
}
}

function action11(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendNext("Hello, welcome to the fifth and final stage. This time, you must defeat the boss, #rKing Sime#k. Good luck!");
			cm.dispose();
			return;
			}
			cm.sendSimple("Congratulations! All the stages have been cleared. If you are done, I can lead you outside. \r\n#L0#I want to leave now#l");
			break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(910340000), cm.getMap(910340000).getPortal(0));
		cm.dispose();
}
}

function action12(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("First, you must complete the mission I give. Once you complete the mission, you will receive a Pass, which will allow you to pass through.");
		break;
	case 1:
		num = Math.floor(Math.random() * 6)  + 3;
		eim.setProperty(cm.getPlayer().getName(), num); //給與隊員問題判斷
		cm.sendOk("Your mission is to collect #r" + num + " coupons#k. You can obtain the coupons by defeating the #rLigators#k found here.");
		break;
	case 2:
		cm.dispose();
}
}

function action13(mode, type, selection) {
	switch (status) {
	case 0:
		if (eim.getProperty(cm.getPlayer().getName()) == 100) {
			cm.sendNext("You've completed the mission! Please help other party members who may have not completed the mission yet.");
			cm.dispose();
			return;
			}
		if (eim.getProperty(cm.getPlayer().getName()) == cm.getPlayer().itemQuantity(4001007)) {
			cm.sendNext("You've completed the mission! Please help other party members who may have not completed the mission yet.");
			eim.setProperty(cm.getPlayer().getName(), 100);
			cm.getPlayer().removeAll(4001007);

			eim.setProperty("stage1b", eim.getProperty("stage1b") == null ? 1 : parseInt(eim.getProperty("stage1b")) + 1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("You've completed " + parseInt(eim.getProperty("stage1b")) + " passes."));

		if (eim.getProperty("stage1b") == cm.getPlayer().getMap().getCharacters().size() - 1) {
			eim.setProperty("stage1a", 2);
			cm.getPlayer().getMap().startMapEffect("All of the individual missions have been cleared. The Party Leader should come talk to me.", 5120017);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			}
			cm.dispose();
			return;
			}
			cm.sendNext("This isn't it! You must bring me the EXACT number of coupons I told you in order to complete the mission. Here, I'll tell you the number again.");
			break;
	case 1:
		cm.sendNextPrev("Your mission is to collect #r" + eim.getProperty(cm.getPlayer().getName()) + " coupons#k. You can obtain the coupons by defeating the #rLigators#k found here.");
		break;
	case 2:
		cm.dispose();
}
}

function action14(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("You all have cleared the quest for this stage. Use the portal to move to the next stage...");
		break;
	case 1:
		cm.dispose();
}
}
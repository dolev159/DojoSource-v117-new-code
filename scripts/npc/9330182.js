/*
	名字:	Mir
	地圖:	美術教室
	描述:	744000004
*/

var num = Math.floor(Math.random() * 4);

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
	switch (status) {
	case 0:
		if (cm.getPlayer().getEventInstance().getProperty(cm.getPlayer().getMap().getId()) != null) {
			cm.dispose();
			return;
			}
			cm.sendSimple("Hey, what's up? You're not in the art club. \r\n\r\n#L0#So, uh, do you have a crush on anyoody?#l\r\n#L1#I have a crush on you.#l\r\n#L2#Let's go out!#l\r\n#L3#You make my heart race like crazy...#l");
			break;
	default:
		for (var i = 0; i < 14; i++) {
		if (cm.getPlayer().getMap().getId() == cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28921)).getCustomData().substring(i + "0", i + "9")) {
			y = i + 1;
			}
			}
		if (status == 1 && type == 5) select = selection;
			reactor = 'action' + select;
			eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		if (num != 0) {
			cm.sendNext("You're distracting me from my drawing. Can you go away?");
			cm.dispose();
			return;
			}
			cm.sendNext("Oh, I see. Well I think you're kind of swell too. Let's go out.");
			break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("MapleHighSchool/clear", 3));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (num != 1) {
			cm.sendNext("...Are you for real?");
			cm.dispose();
			return;
			}
			cm.sendNext("I've been waiting for you to say that!!");
			break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("MapleHighSchool/clear", 3));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		if (num != 2) {
			cm.sendNext("Hahahahahahahahahahahaha... No.");
			cm.dispose();
			return;
			}
			cm.sendNext("Hahahahahahahaha... Okay!");
			break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("MapleHighSchool/clear", 3));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		if (num != 3) {
			cm.sendNext("I know what you mean, but could you just never talk to me again?");
			cm.dispose();
			return;
			}
			cm.sendNext("I... also... um... Iet's hook up!");
			break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("MapleHighSchool/clear", 3));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}
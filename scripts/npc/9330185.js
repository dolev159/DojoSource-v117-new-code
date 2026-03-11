/*
	名字:	超級美女
	地圖:	屋頂
	描述:	744000001
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
	if (cm.getPlayer().getEventInstance().getProperty(cm.getPlayer().getMap().getId()) != null) {
		cm.dispose();
		return;
		}
		for (var i = 0; i < 14; i++) {
	if (cm.getPlayer().getMap().getId() == cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28921)).getCustomData().substring(i + "0", i + "9")) {
		y = i + 1;
		}
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() % 100);
		eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("Whose Friendship level do you want to raise before you move to the other classroom?", 1);
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(12, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("Whose Friendship level do you want to raise before you move to the other classroom?", 1);
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("Whose Friendship level do you want to raise before you move to the other classroom?", 1);
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("Whose Friendship level do you want to raise before you move to the other classroom?", 1);
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("I KNOW you're not the type to fight without a reason!");
		break;
	case 1:
		cm.sendNextPrev("I'll reopen the door to the other classrooms.");
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action10(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("I guess these guys cooperate when they HAVE to...");
		break;
	case 1:
		cm.sendNextPrev("I'll open the door now that the intruders are gone.");
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action13(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Talk with a friend to raise his/her Friendship level!");
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action14(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Talk with a friend to raise his/her Friendship level!");
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}

function action15(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Talk with a friend to raise his/her Friendship level!");
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}
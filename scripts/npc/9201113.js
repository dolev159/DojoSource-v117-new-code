/*
	名字:	傑克
	地圖:	內部密室的大廳
	描述:	610030020
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
	switch (status) {
	case 0:
		cm.sendSimple("#e<Party Quest: Crimsonheart Altar>#n \r\nDefeat the Twisted Masters and bring peace to Crimsonheart Castle. Will you heed the call? \r\n#L0##bEnter Crimsonheart Altar.#l\r\n#L1#Learn more about the Crimsonheart Altar.#l\r\n#L2#Find party members.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Have the party leader talk to me.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.size() < 5) {
			cm.sendNext("Your party needs 5-6 people before you can enter.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 610030020) {
			cm.sendNext("Some of your party members are in a different map. Make sure they're all here!");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 100) {
			cm.sendNext("Either you or one of your party members is below Lv. 100. Please fit the level requirement before proceeding.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("CWKPQ");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Unable to apply for the quest.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("The Twisted Masters have scattered our armies and crushed our leader! Their powers are unimaginably terrifying. Now they have the legendary weapons of our heroes...");
		break;
	case 2:
		cm.sendNextPrev("They have barricaded themselves inside Crimsonheart Castle to extract the powers of those weapons.");
		break;
	case 3:
		cm.sendNextPrev("Once they succeed, all of Tynerum will fall under their complete control. You must break the barriers near the Seal Room, and defeat the Twisted Masters. \r\n\r\n#e- Level#n: 100 or higher #r(Recommended Level: 100 - 130)#k \r\n#e- Time Limit#n: 30 min. \r\n#e- Number of Participants#n: 5 to 6");
		break;
	case 4:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendUIWindow(7, 1));
		cm.dispose();
}
}
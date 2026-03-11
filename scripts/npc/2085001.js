/*
	名字:	天空之門
	地圖:	天渡
	描述:	240080000
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 240080000 ? 0 : 5);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("#e<Party Quest: Dragon Rider>#n \r\nWelcome to the entrance to Crimson Sky. What would you like to do? \r\n#L1##bEnter Crimson Sky. (Lv. 120 or above/at least 3 players)#l\r\n#L2#Search for party#l\r\n#L3#Listen to the explanation.#l\r\n#L4#How many chances do I have left for today?#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("Join a party, then try again.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Only the Party Leader can attempt to enter.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.size() < 3) {
			cm.sendOk("You must have a minimum of 3 people to enter Crimson Sky.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 240080000) {
			cm.sendOk("Some of your party members are not in the same map. The entire party must be present to enter.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 120) {
			cm.sendOk("Someone in your party isn't Lv. 120 yet. You must be Lv. 120 or higher to enter the Crimson Sky!");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (cm.getPlayer().getMap().getCharacterById(party.get(i).getId()).getSkillLevel(party.get(i).getJobId() < 1000 ? 1026 : party.get(i).getJobId() < 2000 ? 10001026 : party.get(i).getJobId() < 2200 ? 20001026 : party.get(i).getJobId() < 2300 ? 20011026 : party.get(i).getJobId() < 2400 ? 20021026 : party.get(i).getJobId() < 3200 ? 30011026 : 30001026) < 1) {
			cm.sendOk("You need to learn the Soaring skill before entering Crimson Sky. Please make sure that all the members of your party have learned the Soaring skill.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Dragonica");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Another party is already fighting on the other side. Wait a moment and try again.");
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

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendOk("Go to the #b<Heavenly Doorway>#k and discover the true identity of the #rDragon Rider#k. You should be able to find him if you chase after him. On the way, you must defeat Wyverns by using the #bSoaring#k skill to fly. \r\n#e- Level#n: 120 or above (Recommended Level: 100 - 110 )  \r\n#e- Time Limit#n: 30 min \r\n#e- Players#n: 3 to 6 \r\n#e- Requir ement#n: Acquire the Soaring skill.");
		break;
	case 2:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You can do this quest 10more time(s) today.");
		break;
	case 2:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you wish to abandon the battle and leave the Crimson Sky area? To enter again, you must form a new party.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(240080000), cm.getMap(240080000).getPortal(0));
		cm.dispose();
}
}
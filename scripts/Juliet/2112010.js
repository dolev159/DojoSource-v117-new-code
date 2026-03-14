/*
	名字:	猶利塔
	地圖:	猶利塔的辦公室
	描述:	926110203
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
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 926110203 ? 0 : cm.getMap(926110401).getReactorById(2619002).getState() < 1 ? 1 : 2);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("(Yulete's mumblings can be heard from here.) \r\nMuahaha... Those dummies in Zenumist and Alcadno will bow down and kiss my feet when they see my lab results. Once l show them the results of my creation that involves the best of both alchemy and mechanical engineering, they will have no choice but to look up to me. Muahaha...");
		break;
	case 1:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("...After a long, long wait... the time has finally come for me to unveil my true work of genius to the dummies of Magatia! And to think they have been down on my work all these years... wait, who are you guys? Have you been sent here by Alcadno and Zenumist?");
		break;
	case 1:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Hahaha... this is actually not bad. You people look like the perfect target for my experiments. Think of it as an honor to the highest degree. You will see first hand the magical creation of alchemy and mechanical engineering!!");
			break;
	case 2:
		cm.removeNpc(cm.getPlayer().getMap().getId(), 2112010);
		cm.getPlayer().getMap().startMapEffect("Please protect Romeo by defe ating Frankenroid!", 5120022);
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300151), new java.awt.Point(250, 100));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Yulete pressed a couple of buttons, and in came a giant monster. Yulete then made a disturbing laugh as he disappeared into the dark."));
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("...After a long, long wait... the time has finally come for me to unveil my true work of genius to the dummies of Magatia! And to think they have been down on my work all these years... wait, who are you guys? Have you been sent here by Alcadno and Zenumist?");
		break;
	case 1:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.dispose();
			return;
			}
			cm.sendSimple("Hahaha... this is actually not bad. You people look like the perfect target for my experiments. Think of it as an honor to the highest degree. You will see first hand the magical creation of alchemy and mechanical engineering!! \r\n#L3##bStop it! You're the reason Magatia is on the verge of a civil war!!#l\r\n#L4#Stop it! We will help you get accepted by those skeptics.#l");
			break;
	default:
		if (status == 2 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("What? You're saying because I stole the source of energy for Zenumist and Alcadno, they are about to be in a war against one another? That's fantastic!! They'll wipe themselves out, and that's exactly what I want!");
		break;
	case 3:
		cm.removeNpc(cm.getPlayer().getMap().getId(), 2112010);
		cm.getPlayer().getMap().startMapEffect("Please protect Romeo by defe ating Frankenroid!", 5120022);
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300151), new java.awt.Point(250, 100));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Yulete pressed a couple of buttons, and in came a giant monster. Yulete then made a disturbing laugh as he disappeared into the dark."));
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("(Yulete seems to be wavering.) \r\nQu...quiet!! Do you actually expect me to believe you?");
		break;
	case 3:
		cm.removeNpc(cm.getPlayer().getMap().getId(), 2112010);
		cm.getPlayer().getMap().startMapEffect("Please protect Romeo by defe ating Frankenroid!", 5120022);
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300152), new java.awt.Point(250, 100));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Yulete pressed a couple of buttons, and in came a giant monster. Yulete seemed a little shaken up as he disappeared into the darkness."));
		cm.dispose();
}
}
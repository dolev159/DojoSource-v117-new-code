/*
	名字:	時空之門
	地圖:	泰拉森林時空之門
	描述:	240070000
*/

var quest = [3764, 3766, 3769, 3770, 3771, 3772];

var map = [240070100, 240070200, 240070300, 240070400, 240070500, 240070600];

var text = ["#0# Year 2021, Average Town", "#1# Year 2099, Midnight Harbor", "#2# Year 2215, Bombed City Center", "#3# Year 2216, Ruined City", "#4# Year 2230, Dangerous Tower", "#5# Year 2503, Air Battleship Hermes"];

var year = ["<Year 2099> Midnight Harbor Pier", "<Year 2215>Bombed City Center Square", "<Year 2216> Ruined City Land Mark", "<Year 2230> Dangerous Tower Penthouse", "<Year 2503> Air Battleship Stern"];

var mob = ["Bergamot", "Dunas", "Aufheben", "Oberon", "Nibelung"];

var chat = "";

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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 240070000 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3764)).getStatus() < 1) {
			cm.sendOk("The time machine has not been activated yet.");
			cm.dispose();
			return;
			}
			for (i = 0; i < quest.length; i++)
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() > 0) {
			chat += "" + text[i] + "";
			}
			cm.askMapSelection(chat);
			break;
	case 1:
		if (map[selection] == 240070200 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3774)).getStatus() < 2) {
			map[selection] = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3774)).getStatus() == 1 ? 240070220 : 240070210;
		if (cm.getMap(map[selection]).getCharacters().size() > 0) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
			cm.dispose();
			return;
			}
			cm.getMap(map[selection]).resetFully();
			}
			cm.dispose();
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Moving through the Time Gate..."));
			cm.getPlayer().changeMap(cm.getMap(map[selection]), cm.getMap(map[selection]).getPortal(1));
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		y = Math.floor((cm.getPlayer().getMap().getId() - 200) / 100 % 10);
		cm.sendSimple("" + year[y] + " is just ahead, What do you want to do? \r\n#L0##b1.Defeat " + mob[y] + " (Must be in a party (1 - 3 people) / Level At least 125)#l\r\n#L1#2. Confirm today's remaining entries.#l");
		break;
	case 1:
		if (selection > 0) {
			cm.sendNext("Currently #b#h0##k can enter 20 number of times.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty() == null) {
			cm.sendNext("Only a party leader can make a request to enter.");
			cm.dispose();
			return;
			}
		if (cm.getMap(cm.getPlayer().getMap().getId() + 1).getCharacters().size() > 0) {
			cm.sendNext("Another party is already inside.");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.getMap(cm.getPlayer().getMap().getId() + 1).resetFully();
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
			cm.getMap(cm.getPlayer().getMap().getId()).getCharacterById(party.get(i).getId()).changeMap(cm.getMap(cm.getPlayer().getMap().getId() + 1), cm.getMap(cm.getPlayer().getMap().getId() + 1).getPortal(0));
}
}
/*
	名字:	守門人
	地圖:	怪物公園
	描述:	951000000
*/

var map = Array(952000000, 952010000, 952020000, 952030000, 952040000, 953000000, 953010000, 953020000, 953030000, 953040000, 953050000, 954000000, 954010000, 954020000, 954030000, 954040000, 954050000);
var minLevel = Array(20, 45, 50, 55, 60, 70, 75, 85, 95, 100, 110, 120, 125, 130, 140, 150, 165);
var maxLevel = Array(30, 55, 60, 65, 70, 80, 85, 95, 105, 110, 120, 130, 135, 140, 150, 165, 175);

function start() {
	num = parseInt(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(71004)).getCustomData());
	chat = "Which dungeon would you like to enter? \r\n#r(Dungeons available for players Lv. " + (num < 5 ? "13 - 69" : num < 11 ? "70 - 119" : "120+") + ") #b";
	for (var i = num; i < num + (num == 11 ? 6 : 5); i++) {
	chat += "\r\n#L" + i + "#" + cm.getMap(map[i]).getStreetName() + " (Monsters Lv." + minLevel[i] + " - " + maxLevel[i] + ")#l";
	}
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("The area you selected to enter is a Party Zone. Your #bParty Leader#k can move your party into the area.");
			cm.dispose();
			return;
			}
			ticket = selection < 5 ? 4001514 : selection < 11 ? 4001516 : 4001522;
		if (cm.getPlayer().itemQuantity(ticket) < 1) {
			cm.sendOk("You need a ticket to use the facilities inside the Monster Park.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 951000000) {
			cm.sendNext("Some of your party members are in a different map. Make sure they're all here!");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < (selection < 5 ? 13 : selection < 11 ? 70 : 120) || party.get(i).getLevel() > (selection < 5 ? 69 : selection < 11 ? 119 : 200)) {
			cm.sendOk("One of your party members doesn't meet the required level. " + (selection < 5 ? "13 to 69" : selection < 11 ? "70 to 119" : "120+") + " are the levels eligible to enter.");
			cm.dispose();
			return;
			}
			name = "";
			chenhui = 0;
			for (var i = 0; i < party.size(); i++)
		if (cm.getPlayer().getMap().getCharacterById(party.get(i).getId()).itemQuantity(ticket) < 1) {
			name += "" + party.get(i).getName() + ", ";
			chenhui++;
			}
		if (chenhui != 0) {
			cm.sendOk("The following party members do not have an entrance ticket: #b" + name + "#k One entrance ticket per person is needed to use the facilities inside the Monster Park.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("MonsterPark");
		if (em == null || em.getInstance("MonsterPark" + map[selection]) != null) {
			cm.sendOk("Some other party has already gotten in to try clearing the quest. Please try again later.");
			cm.dispose();
			return;
			}
			cm.givePartyItems(ticket, -1);
			em.startInstance_Party("" + map[selection], cm.getPlayer());
			}
			cm.dispose();
}
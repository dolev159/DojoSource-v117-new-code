/*
	名字:	守門人
	地圖:	怪物公園
	描述:	951000000
*/

var maps = Array(952000000, 952010000, 952020000, 952030000, 952040000, 953000000, 953010000, 953020000, 953030000, 953040000, 953050000, 954000000, 954010000, 954020000, 954030000, 954040000, 954050000);
var minLevel = Array(20, 45, 50, 55, 60, 70, 75, 85, 95, 100, 110, 120, 125, 130, 140, 150, 165);
var maxLevel = Array(30, 55, 60, 65, 70, 80, 85, 95, 105, 110, 120, 130, 135, 140, 150, 165, 200);

function start() {
	var chat = "#e<組隊任務：怪物公園>#n#b";
	var in00 = cm.getPlayer().getPosition().x < 405 ? 0 : cm.getPlayer().getPosition().x < 585 ? 5 : 11;
	var in01 = cm.getPlayer().getPosition().x < 405 ? 5 : cm.getPlayer().getPosition().x < 585 ? 11 : 17;
	for (var i = in00; i < in01; i++) {
	chat += "\r\n#L" + i + "##m" + maps[i] + "# (Monsters Lv." + minLevel[i] + " - " + maxLevel[i] + ")#l";
	}
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("很抱歉，裡面的怪物很危險，我不能讓你單獨去冒險。");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("如果妳想執行這項任務，請告訴妳的組長與我談話。");
			cm.dispose();
			return;
			}
			var chat = "很抱歉，因為你的小组规模不在入场要求範圍大小內，一些组員沒有資格嘗試此任務，或者他們不在此地圖中。\r\n\r\nNumber of players: 2~6 \r\nLevel range: " + minLevel[selection] + "-" + maxLevel[selection] + "\r\n\r\n";
			var chenhui = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < minLevel[selection] || party.get(i).getLevel() > maxLevel[selection] || party.get(i).getMapid() != 951000000 || party.size() < 1) {
			chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
			chenhui++;
			}
		if (chenhui != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
			}
		var ticket = selection < 5 ? 4001514 : selection < 11 ? 4001516 : 4001522;
		if (!cm.havePartyItems(ticket, 1)) {
			cm.sendOk("很抱歉，有的組隊沒有攜帶#b#t" + ticket + "##k。\r\n\r\n#r" + cm.NotPartyitem(ticket, 1) + " \r\n#k");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("MonsterPark");
		if (em == null || em.getInstance("MonsterPark" + maps[selection]) != null) {
			cm.sendOk("此區域的任務正在執行中，請稍後再試。");
			cm.dispose();
			return;
			}
			cm.givePartyItems(ticket, -1);
			em.startInstance_Party("" + maps[selection], cm.getPlayer());
			}
			cm.dispose();
}
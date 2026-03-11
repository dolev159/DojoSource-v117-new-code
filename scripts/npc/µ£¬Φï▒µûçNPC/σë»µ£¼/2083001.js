/*
	名字:	闇黑龍王的里程碑
	地圖:	洞穴入口
	描述:	240050000
*/

var item = [4001087, 4001088, 4001089, 4001090, 4001091, 4001092, 4001093];

function start() {
	if (cm.getPlayer().getMap().getId() == 240050000)
		cm.sendSimple("#e<組隊任務:黑暗龍王的審判>#n \r\n\r\n就在幾百年前，暗黑龍王被楓之谷中的四名勇士用神秘武器封印在一個不為人知的地方。而如今，幾百年後被封印在黑暗地下的惡魔黑龍漸漸蘇醒了，沉睡了多年的它憤怒著，咆哮著。\r\n\r\nNumber of players: 2~6 \r\nLevel range: 100+ \r\nTime limit: 30minutes\r\n#L0##b進入任務地圖#l");
	else
		cm.sendSimple("請在附近區域搜尋" + (cm.getPlayer().getMap().getId() == 240050100 ? "#v4001087#、#v4001088#、#v4001089#、#v4001090#、#v4001091#5把鑰匙" : "集齊6把#v4001093##z4001093#鑰匙") + "。\r\n#L1##b已經集齊所有的鑰匙#l");
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
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
			var chat = "很抱歉，因為你的小組規模不在入場要求範圍大小內，一些組員沒有資格嘗試此任務，或者他們不在此地圖中。\r\n\r\nNumber of players: 2~6 \r\nLevel range: 70+ \r\n\r\n";
			var chenhui = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 70 || party.get(i).getMapid() != 240050000 || party.size() < 2) {
			chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
			chenhui++;
			}
		if (chenhui != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("HontalePQ");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendOk("黑暗龍王的審判任務正在執行中，請嘗試其他頻道。");
			break;
	case 1:
		if ((cm.getPlayer().itemQuantity(4001087) && cm.getPlayer().itemQuantity(4001088) && cm.getPlayer().itemQuantity(4001089) && cm.getPlayer().itemQuantity(4001090) && cm.getPlayer().itemQuantity(4001091)) || cm.getPlayer().itemQuantity(4001093) > 5) {
			for (var i = 0; i < item.length; i++)
			cm.removeAll(item[i]);
			cm.warpParty(cm.getPlayer().getMap().getId() == 240050100 ? 240050200 : 240050400);
			cm.dispose();
			return;
			}
			cm.sendOk("請確定一下，你所收集的鑰匙是否達到要求。");
			}
			cm.dispose();
}
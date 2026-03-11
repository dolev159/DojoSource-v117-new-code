/*
	名字:	史匹奈爾
	地圖:	弓箭手村
	描述:	100000000
*/

var maps = [800000000];
var cost = [2900];

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
		if (status < 3) {
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
		cm.sendSimple(cm.getPlayer().getMap().getId() != 800000000 ? "為了從繁忙的日常中解脫，去享受一趟旅遊怎麼樣？不僅可以體驗新穎的異國文化，還能學到不少東西的機會！我們楓之谷旅遊公司為您準備了，豐富有趣的世界旅遊套餐，誰說環遊世界很貴？請放一萬個心，我們的楓之谷世界旅遊套餐只需要#b2900楓幣#k就可以享受全程。\r\n#L0##b我想看看旅遊路線#l" : "世界旅遊怎麼樣？很有趣吧。\r\n#L1##b返回：#m" + cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR")) + "##l\r\n#L2##b繼續觀光#l");
		break;
	case 1:
		if (selection == 0) {
			var chat = "在各旅遊地我都會為大家提供滿意熱誠的服務，那麼請準備好，請選擇你的旅遊路線，新手可以9折優惠。";
			for (var i = 0; i < maps.length; i++) {
			cost[i] /= ((cm.getPlayer().getJob() == 0) ? 10 : 1);
			chat += "\r\n#L" + i + "##b#m" + maps[i] + "##k(" + cost[i] + "楓幣)#l";
			}
			cm.sendSimple(chat);
			}
		if (selection == 1) {
			cm.sendNext("好的，希望你能滿意本次旅行，如果需要到別的地方旅遊，請記得告訴我。");
			}
		if (selection == 2) {
			cm.sendOk("不想回去就再到處看看吧，等你想回去的時候再來告訴我。");
			cm.dispose();
			}
			select = selection;
			break;
	case 2:
		if (select < 1) {
			select = selection;
			cm.sendYesNo("你真的想去#m" + maps[select] + "#嗎？路費為#b" + cost[select] + "#k楓幣。");
			}
		if (select > 0) {
			var map = cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
			if (map < 0) map = 100000000

			cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
			cm.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
			cm.dispose();
			}
			break;
	case 3:
		if (cm.getPlayer().getMeso() < cost[select]) {
			cm.sendOk("很抱歉，你好像沒有足夠楓幣支付出行費。");
			cm.dispose();
			return;
			}
			cm.gainMeso(-cost[select]);
			cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
			cm.getPlayer().changeMap(cm.getMap(maps[select]), cm.getMap(maps[select]).getPortal(0));
			cm.dispose();
}
}
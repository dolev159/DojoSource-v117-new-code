/*
	名字:	突擊隊員吉姆
	地圖:	克雷塞爾遺跡 II
	描述:	541020800
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave The Ruins of Krexel II? I can take you to the safer place...");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(541020700), cm.getMap(541020700).getPortal(0));
		cm.dispose();
}
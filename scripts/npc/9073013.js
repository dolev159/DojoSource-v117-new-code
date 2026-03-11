/*
	名字:	時空門
	地圖:	維多利亞
	描述:	102040600
*/

var map = [102040600, 200080000, 220011000, 220040200, 221040400, 260010201, 250020300, 261020500, 251010500, 240010200, 240010600, 240010500, 240020200, 211040000, 261020200, 240020401, 240020101, 220080000, 211041400, 230040410, 240040400, 270010500, 270020500, 270030500];

function start() {
	cm.sendYesNo("Exit the Mystic Gate?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(map[cm.getPlayer().getMap().getId() - 931050410]), cm.getMap(map[cm.getPlayer().getMap().getId() - 931050410]).getPortal(0));
		cm.dispose();
}
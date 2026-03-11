/*
	名字:	達爾米
	地圖:	捷徑
	描述:	910010300
*/

function start() {
	cm.sendSimple("I think you're done with everything here. Would you like to leave this place? \r\n#L0##bYes. I would like to leave this place.#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().removeAll(4001453);
		cm.getPlayer().changeMap(cm.getMap(100000200), cm.getMap(100000200).getPortal(0));
		}
		cm.dispose();
}
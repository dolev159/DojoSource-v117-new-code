/*
	名字:	機械裝置
	地圖:	動力室
	描述:	220080001
*/

function start() {
	cm.sendYesNo("Beep beep! You can exit to a safe place through me. Beep beep! Would you like to leave now?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(220080000), cm.getMap(220080000).getPortal(0));
		cm.dispose();
}
/*
	名字:	異界的祭壇石像
	地圖:	時間裂縫
	描述:	272000000
*/

function start() {
	cm.sendSimple("#eCrack in Time#n \r\nThe past, the future, and somewhere in between... When will you choose? \r\n\r\n#L272020000##bDimensional Gate#l\r\n#L272000100#Leafre Past#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(selection), cm.getMap(selection).getPortal(0));
		cm.dispose();
}
/*
	名字:	鮑伯
	地圖:	引擎室
	描述:	541010100
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave this engine room? I can take you to the safer place...");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(541010110), cm.getMap(541010110).getPortal(0));
		cm.dispose();
}
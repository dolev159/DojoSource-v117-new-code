/*
	名字:	阿爾利
	地圖:	悲憤之室
	描述:	280090000
*/

function start() {
	cm.sendYesNo("Must have quit midway through. Alright, I'll send you off right now.");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(211042300), cm.getMap(211042300).getPortal(0));
		cm.dispose();
}
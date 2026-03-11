/*
	名字:	鈴木
	地圖:	基地前
	描述:	801040000
*/

function start() {
	cm.sendYesNo("Well, here we are. The Yakuza hideout. Huh? You wanna go back to Showa Town?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOk("Talk to me again if you want to return to Showa Town.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(801000000), cm.getMap(801000000).getPortal(0));
		}
		cm.dispose();
}
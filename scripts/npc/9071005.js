/*
	名字:	休菲凱曼
	地圖:	第1階段 : 石巨人寺院1
	描述:	952000000
*/

function start() {
	cm.sendYesNo("What? Do you want to leave the park already? But the fun's just starting!");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Good choice! Go have some more fun!");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(951000000), cm.getMap(951000000).getPortal(0));
		}
		cm.dispose();
}
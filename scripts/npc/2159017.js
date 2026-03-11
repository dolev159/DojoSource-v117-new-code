/*
	名字:	約翰
	地圖:	受冰詛咒的平原
	描述:	932000300
*/

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
		if (status < 1) {
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
		cm.sendSimple("Thank you! I'm finally back to normal! Oh, the curse is finally broken. I cannot thank you enough. I really should be getting home now. \r\n#L0#Yeah, I should get back, too.#l");
		break;
	case 1:
		cm.sendNext("Oh! When you collect all #b#t4001529##k and bring them to my friend #rVon#k at the #rDangerous Forest Entrance#k, you might get a special item. I heard #b#t4001529##k can be used to make #v1072510# #b#t1072510##k or #v1032100# #b#t1032100##k. Anyway, thank you very much! I will see you later!");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(932000000), cm.getMap(932000000).getPortal(0));
		cm.dispose();
}
}
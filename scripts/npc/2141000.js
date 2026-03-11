/*
	名字:	奇勒斯坦
	地圖:	神祇的黃昏
	描述:	270050100
*/

function start() {
	cm.sendAcceptDecline("With only the Mirror of the Goddess, I can summon the Black Mage again! But... Why isn't it working? What is this strange energy? It's completely different from the Black Mage... AHHHH! \r\n\r\n#b(You place your hands on Kirston's shoulders.)");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.forceStartReactor(270050100, 2709000);
		}
		cm.dispose();
}
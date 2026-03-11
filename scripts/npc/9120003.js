/*
	名字:	光夫人
	地圖:	昭和村
	描述:	801000000
*/

function start() {
	cm.sendYesNo("Would you like to enter the bathhouse? That'll be 300 mesos for you. And don't take the towels!");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOk("Please come back some other time.");
		break;
	case 1:
		if (cm.getPlayer().getMeso() < 300) {
		cm.sendOk("Please check your wallet or purse and see if you have 300 mesos to enter this place. We have to keep the water hot, you know...");
		cm.dispose();
		return;
		}
		cm.getPlayer().changeMap(cm.getMap(801000100 + 100 * cm.getPlayer().getGender()), cm.getMap(801000100 + 100 * cm.getPlayer().getGender()).getPortal(2));
		cm.gainMeso(-300);
		}
		cm.dispose();
}
/*
	名字:	剪票口
	地圖:	新葉城 地鐵站
	描述:	600010001
*/

function start() {
	if (cm.getPlayer().itemQuantity(4031713) < 1) {
		cm.sendNext("Here's the ticket reader. You are not allowed in without the ticket.");
		cm.dispose();
		return;
		}
		em = cm.getEventManager("Subway");
	if (em.getProperty("entry") == "false" && em.getProperty("docked") == "true") {
		cm.sendNext("We will begin boarding 1 minute before the takeoff. Please be patient. Be aware that the subway will take off promptly, and we stop receiving tickets 1 minute prior, so please make sure to arrive on time.");
		cm.dispose();
		return;
		}
	if (em.getProperty("entry") == "false") {
		cm.sendNext("The subway for NLC is preparing for takeoff. I'm sorry, but you'll have to hop on the next ride. The ride schedule is available through the usher at the ticketing booth.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("It looks like there's plenty of room for this ride. Please have your ticket ready so I can let you in. The ride will be long, but you'll get to your destination just fine. Would you like to get on this ride?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.gainItem(4031713, -1);
		cm.getPlayer().changeMap(cm.getMap(600010002), cm.getMap(600010002).getPortal(0));
		}
		cm.dispose();
}
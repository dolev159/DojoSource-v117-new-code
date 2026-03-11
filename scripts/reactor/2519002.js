/*
	名字:	隱藏地圖
	地圖:	打倒海賊!
	描述:	925100400
*/

function act() {
	var map = rm.getReactor().getMap();
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "The door to the Pirate Ship has closed."));
	num = map.getReactorByName("sMob1").getState() + map.getReactorByName("sMob2").getState() + map.getReactorByName("sMob3").getState() + map.getReactorByName("sMob4").getState();
	if (num > 3) {
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		rm.getPlayer().getMap().startMapEffect("You closed all the doors. Okay, move to the next stage!", 5120020);
}
}
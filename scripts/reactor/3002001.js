/*
	名字:	毒霧森林
	地圖:	森林空地
	描述:	930000500
*/

function act() {
	if (rm.getReactor().getName() == "an3") {
		rm.dropItems();
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "The purple magic stone has been found."));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
}
}


//4001163		紫色魔力石
/*
	名字:	隱藏地圖
	地圖:	最後的陷阱
	描述:	921160500
*/

function enter(pi) {
	pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
	pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
	pi.getPlayer().getMap().startMapEffect("Hurry! Move on to the next map!", 5120053);
	return false;
}
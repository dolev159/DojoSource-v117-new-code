/*
	名字:	隱藏地圖
	地圖:	隱藏之塔
	描述:	921160100
*/

function enter(pi) {
	pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
	pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
	pi.getPlayer().getMap().startMapEffect("Hurry! Move on to the next map!", 5120053);
	return false;
}
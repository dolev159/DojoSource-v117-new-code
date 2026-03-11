/*
	名字:	隱密之地
	地圖:	陰森的洞穴
	描述:	910510600
*/

function enter(pi) {
	pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("phantom/suu", 3));
	return true;
}
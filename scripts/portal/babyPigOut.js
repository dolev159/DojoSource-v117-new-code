/*
	名字:	隱密之地
	地圖:	茂盛的森林
	描述:	900020110
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032449)) {
		pi.getPlayer().changeMap(pi.getMap(100030300), pi.getMap(100030300).getPortal(2)); //農場中心地
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "What happened to the piglet? It must have been left in the forest."));
		return false;
}
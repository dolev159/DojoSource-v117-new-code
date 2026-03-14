/*
	名字:	結冰的精靈森林
	地圖:	櫻花處
	描述:	910150001
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24004)).getStatus() > 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The path is blocked."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(910150002), pi.getMap(910150002).getPortal(2)); //發光的洞穴之路
		return true;
}
/*
	名字:	獅子王城
	地圖:	第一座塔
	描述:	211060200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3164)).getStatus() == 1) {
	if (pi.getPlayer().itemQuantity(4032831)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Return Jenn's brother to Jenn first."));
		return true;
		}
	if (pi.getMap(921140100).getCharacters().size() < 1) {
	if (pi.getPlayer().itemQuantity(4032858)) {
		pi.gainItem(4032858, -1);
		}
		pi.getMap(921140100).resetFully();
		pi.getPlayer().changeMap(pi.getMap(921140100), pi.getMap(921140100).getPortal(1)); //危險的第一座塔樓
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(211060200));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Save Jenn's brother."));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
	if (pi.getPlayer().itemQuantity(4032832)) {
	if (pi.getMap(211060201).getCharacters().size() < 1) {
		var em = pi.getEventManager("q3139");
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You can't get to the roof of the tower without a key."));
		return false;
}
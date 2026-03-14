/*
	名字:	神木村
	地圖:	危險巢穴下方
	描述:	240040610
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4001094)) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3706)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(240040612), pi.getMap(240040612).getPortal(1)); //九靈龍巢穴
		return true;
		}
	if (pi.getMap(240040611).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone else is already inside in an attempt to complete the quest. Please try again later."));
		return false;
		}
		pi.getMap(240040611).resetFully();
		pi.getPlayer().changeMap(pi.getMap(240040611), pi.getMap(240040611).getPortal(1)); //九靈龍巢穴
		pi.getPlayer().startMapTimeLimitTask(300, pi.getMap(240040610));
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3706)).getStatus() > 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You must have Nine Spirit's egg in possession to enter."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "In order to enter the premise, you'll need to have the Nine Spirit's Egg in possession.."));
		return false;
}
/*
	名字:	過去的神木村
	地圖:	燃燒的神木村3
	描述:	272000300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31171)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(272000310), pi.getMap(272000310).getPortal(1)); //燃燒的廢墟
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2144005, 0, "You can't leave without helping us! Come quick!", "00 00", 0));
		return false;
}
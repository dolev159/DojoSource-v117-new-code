/*
	名字:	過去的神木村
	地圖:	燃燒的神木村4
	描述:	272000410
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31176)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(272000310), pi.getMap(272000310).getPortal(2)); //燃燒的廢墟
		return true;
		}
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2144008, 0, "Mwahaha, you're not leaving unless you defeat me!", "00 00", 0));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2144008, 0, "Talk to me before you go.", "00 00", 0));
		return false;
}
/*
	名字:	過去的神木村
	地圖:	燃燒的神木村5
	描述:	272000500
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31173)).getStatus() < 2) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2144006, 0, "Please bring Last Onyx Dragon Egg to me.", "00 00", 0));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(272000600), pi.getMap(272000600).getPortal(1)); //燃燒的神木村6
		return true;
}
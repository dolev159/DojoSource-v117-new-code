/*
	名字:	過去的神木村
	地圖:	燃燒的神木村1
	描述:	272000100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31168)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(272000200), pi.getMap(272000200).getPortal(1)); //燃燒的神木村2
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2144003, 0, "You will not be able to proceed to the next area without a request from me.", "00 00", 0));
		return false;
}
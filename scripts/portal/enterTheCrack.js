/*
	名字:	時間之路
	地圖:	三扇門
	描述:	270000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31165)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(272000000), pi.getMap(272000000).getPortal(1)); //時間神殿
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2144011, 0, "I can't enter this place yet. Where does it lead?", "00 00", 16));
		return true;
}
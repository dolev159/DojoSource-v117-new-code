/*
	名字:	耶雷弗
	地圖:	耶雷弗
	描述:	915000400
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(9010000, 0, "I'm late, I'm late! I can't be late!", "00 00", 17));
	return true;
}
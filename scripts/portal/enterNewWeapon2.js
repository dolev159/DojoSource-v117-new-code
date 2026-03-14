/*
	名字:	隱藏地圖
	地圖:	陷阱！實驗室監獄
	描述:	931000311
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23050)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You can enter only after talking to your Job Instructor to get the corresponding quest."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(931000321), pi.getMap(931000321).getPortal(1)); //新武器開發實驗室
		return true;
}
/*
	名字:	桃花仙境
	地圖:	妖怪之林2
	描述:	250010504
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3840)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3843)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(925000000), pi.getMap(925000000).getPortal(2)); //喵怪仙人的領域
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Unable to move forward due to heavy fog."));
		return false;
}
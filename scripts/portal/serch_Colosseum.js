/*
	名字:	天上的克里塞
	地圖:	競技場入口
	描述:	200101000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31010)).getStatus() == 1) {
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31010)).setCustomData(1);
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You found the mammoth! Go tell Michael about this."));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You found the mammoth! Go tell Michael about this."));
		}
		pi.getPlayer().changeMap(pi.getMap(200101100), pi.getMap(200101100).getPortal(1)); //競技場走道1
		return true;
}
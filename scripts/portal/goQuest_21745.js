/*
	名字:	武陵道場
	地圖:	武陵道場入口
	描述:	925020001
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21745)).getStatus() == 1) {
	if (pi.getPlayer().itemQuantity(4000591) < 100) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You will be moved to Bellflower Hill."));
		pi.getPlayer().changeMap(pi.getMap(925041001), pi.getMap(925041001).getPortal(1)); //深山人蔘山丘
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You should give the Bellflower to Mu Gong."));
		}
		return false;
}
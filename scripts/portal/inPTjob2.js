/*
	名字:	隱密之地
	地圖:	小公園
	描述:	200020001
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25100)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25101)).getStatus() < 2) {
	if (pi.getMap(915010000).getCharacters().size() < 1 && pi.getMap(915010001).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(915010000), pi.getMap(915010000).getPortal(0)); //天空之城寶物倉庫入口
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Someone is already using this field. Wait or try another channel."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You see a strange door. It may be dangerous."));
		return false;
}
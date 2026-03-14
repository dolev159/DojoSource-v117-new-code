/*
	名字:	石巨人寺院
	地圖:	石巨人寺院入口
	描述:	100040000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22556)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(22598).forceStart(pi.getPlayer(), 0, 1);
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "This building has some strange-looking dolls. But it seems locked from the inside. Go let Chief Stan know."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22559)).getStatus() == 1) {
	if (pi.getMap(910600010).getCharacters().size() < 1) {
		pi.getMap(910600010).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910600010), pi.getMap(910600010).getPortal(1)); //遺棄的基地
		pi.getPlayer().startMapTimeLimitTask(900, pi.getMap(100040000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "There's a suspicious-looking puppet in this building. You should give it another try in a bit."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25419)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25423)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(910600100), pi.getMap(910600100).getPortal(1)); //被丟棄的基地
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "There's a suspicious-looking puppet in this building. It seems to be locked. You can't get in."));
		return false;
}
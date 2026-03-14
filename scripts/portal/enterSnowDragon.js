/*
	名字:	龍沉睡的島
	地圖:	被雪覆蓋的森林
	描述:	914100010
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22580)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22588)).getStatus() < 1) {
		pi.getPlayer().changeMap(pi.getMap(914100020), pi.getMap(914100020).getPortal(1)); //寂靜的洞穴
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22605)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22589)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The mission has been completed. You do not need to re-enter the cave."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22588)).getStatus() == 1) {
	if (pi.getMap(914100022).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again later."));
		return false;
		}
		pi.getMap(914100022).resetFully();
		pi.getPlayer().changeMap(pi.getMap(914100022), pi.getMap(914100022).getPortal(1)); //寂靜的洞穴
		pi.getPlayer().startMapTimeLimitTask(300, pi.getMap(922030000));
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22604)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(914100021), pi.getMap(914100021).getPortal(2)); //寂靜的洞穴
		return true;
		}
	if (pi.getMap(914100023).getCharacters().size() < 1) {
		pi.getMap(914100023).resetFully();
		pi.getPlayer().changeMap(pi.getMap(914100023), pi.getMap(914100023).getPortal(1)); //寂靜的洞穴
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(914100010));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again later."));
		return false;
}
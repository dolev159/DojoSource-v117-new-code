/*
	名字:	封印寺院入口
	地圖:	下級修煉場
	描述:	250020100
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21747)).getStatus() != 1) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21747)).getMobKills(9300351) > 0) {
		cm.sendOkS("The Seal Stone was stolen. Hurry back to Mu Gong.", 2);
		cm.dispose();
		return;
		}
		cm.sendGetText("#b(Only the correct password will let you in.)");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getText() == "Actions speak louder than words") {
		if (cm.getMap(925040100).getCharacters().size() < 1) {
		cm.getMap(925040100).resetFully();
		cm.getPlayer().changeMap(cm.getMap(925040100), cm.getMap(925040100).getPortal(1));
		cm.getPlayer().getMap().spawnNpc(1204020, new java.awt.Point(897, 51));
		cm.getPlayer().startMapTimeLimitTask(600, cm.getMap(250020100));
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Cannot enter the Sealed Temple. Better try again a little later."));
		cm.dispose();
		return;
		}
		cm.sendNext("#b(You don't think that was the right password.)");
		}
		cm.dispose();
}
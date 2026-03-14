/*
	名字:	菇菇王國
	地圖:	城壁邊邊
	描述:	106020500
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(2430015)) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(1300014, 0, "It looks like the #bThorn Remover#k should be used right around here.", "00 00", 3));
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)).getStatus() == 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)).getCustomData() < 1) {
		pi.startportalScript("investigate2");
		}
		return true;
}

function start() {
	pi.sendNextS("The colossal castle wall is covered with thorny vines. It's going to be difficult getting into the castle. For now, go report this to the #bSecretary of Domestic Affairs#k.", 3);
}

function action(mode, type, selection) {
	if (mode > 0)
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)).setCustomData(1);
		pi.getPlayer().updateQuest(pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)), true);
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Castle Wall Investigation Completed 1/1"));
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Go report this to the Secretary of Domestic Affairs."));
		pi.dispose();
}
/*
	名字:	補給品箱子
	地圖:	研究所C-4區
	描述:	931050417
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1628)).getStatus() != 1) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1641)).getCustomData() == "bomb") {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "No cluse here..."));
		cm.dispose();
		return;
		}
		Packages.server.quest.MapleQuest.getInstance(1641).forceStart(cm.getPlayer(), 0, "bomb");
		cm.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("crossHunter/bomb", 3));
		cm.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("cannonshooter/Attack3", 4));
		cm.getPlayer().getMap().startMapEffect("Watch out!", 5120054);
		cm.dispose();
}
/*
	名字:	依菲雅
	地圖:	第五座塔樓
	描述:	211061001
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3175)).getStatus() > 1) {
		cm.sendOk("Poor Leon... if he could only remember himself...");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3173)).getStatus() != 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3175)).getStatus() != 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You cannot enter the Audience Room at this time."));
		cm.dispose();
		return;
		}
		cm.sendNext("You haven't yet spoken to Leon? I will send you to the #m211070200# again. I pray for your success...");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(211070200), cm.getMap(211070200).getPortal(3));
		cm.dispose();
}
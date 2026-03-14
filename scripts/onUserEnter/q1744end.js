/*
	名字:	畫中的世界
	地圖:	峽谷入口
	描述:	956040300
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1744)).getStatus() > 1) {
		ms.dispose();
		return;
		}
		ms.sendNextS("These walls are just too icy to climb, but I don't see an easier way out. If I could just get a rope or... some branches?", 17);
}

function action(mode, type, selection) {
	if (mode > 0) {
		Packages.server.quest.MapleQuest.getInstance(1744).forceComplete(ms.getPlayer(), ms.getNpc());
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1744));
		}
		ms.dispose();
}
/*
	名字:	畫中的世界
	地圖:	小雪球棲息地
	描述:	956040100
*/

function start() {
	Packages.server.quest.MapleQuest.getInstance(1741).forceComplete(ms.getPlayer(), ms.getNpc());
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1741));
	ms.dispose();
}
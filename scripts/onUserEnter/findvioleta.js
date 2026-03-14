/*
	名字:	菇菇王國
	地圖:	結婚禮堂入口
	描述:	106021600
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2332)).getStatus() ==1) {
		Packages.server.quest.MapleQuest.getInstance(2332).forceComplete(ms.getPlayer(), ms.getNpc());
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("<Where is Violetta?> Quest Complete 1/1"));
		ms.gainExp(1600);
		}
		ms.dispose();
}
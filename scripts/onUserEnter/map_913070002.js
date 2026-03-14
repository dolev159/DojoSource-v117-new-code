/*
	名字:	隱藏地圖
	地圖:	林伯特家的雜貨店
	描述:	913070002
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20032)).getStatus() < 1) {
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Mr.Limbert's General Store"));
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Month 3. Day 8"));
		}
		ms.dispose();
}
/*
	名字:	隱密之地
	地圖:	茂密的森林
	描述:	240010102
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25120)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(25123).forceStart(ms.getPlayer(), 0, 1);
		}
		ms.dispose();
}
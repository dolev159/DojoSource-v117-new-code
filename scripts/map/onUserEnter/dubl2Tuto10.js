/*
	名字:	維多利亞
	地圖:	新手修練場入口
	描述:	103050910
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2603)).getStatus() > 1) {
		ms.spawnNPCRequestController(1057001, -950, 152, 0);
		}
		ms.dispose();
}
/*
	名字:	隱密之地
	地圖:	人煙稀少的地方
	描述:	260010601
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25110)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(25112).forceStart(ms.getPlayer(), 0, 1);
		}
		ms.dispose();
}
/*
	名字:	零点重置任务
	地圖:	零点重置任务
	描述:	零点重置任务
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(7707).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}
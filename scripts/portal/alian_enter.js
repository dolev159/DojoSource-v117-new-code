/*
	名字:	馬萊尼西亞島
	地圖:	叢林山谷
	描述:	600010300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28753)).getStatus() < 2) {
		pi.openNpc(9201184);
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(610040000), pi.getMap(610040000).getPortal(1)); //外星基地走廊 1
		return true;
}
/*
	名字:	卡帕萊特研究所
	地圖:	研究所B-3區
	描述:	261020600
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3309)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(926120000), pi.getMap(926120000).getPortal(1)); //熄火的研究室
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(261020700), pi.getMap(261020700).getPortal(1));
		return true;
}
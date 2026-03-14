/*
	名字:	黑暗時間神殿
	地圖:	時間神殿迴廊1
	描述:	272010000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(272000000), pi.getMap(272000000).getPortal(0)); //時間裂縫
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(200090530), pi.getMap(200090530).getPortal(11)); //前往過去的神木村的路
		pi.useItem(2210083); //變龍
		return true;
}
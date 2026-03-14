/*
	名字:	黑暗時間神殿
	地圖:	黑魔法師的房前迴廊
	描述:	272010200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(272000000), pi.getMap(272000000).getPortal(0)); //時間裂縫
		}
		return true;
}
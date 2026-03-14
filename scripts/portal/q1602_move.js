/*
	名字:	隱藏地圖
	地圖:	維修中的列車
	描述:	931050400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1602)).getStatus() < 1) {
		pi.openNpc(9073001);
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(931050402), pi.getMap(931050402).getPortal(1)); //空蕩蕩的站台
		return true;
}
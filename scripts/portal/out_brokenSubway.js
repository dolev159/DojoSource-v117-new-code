/*
	名字:	隱藏地圖
	地圖:	維修中的列車
	描述:	931050400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1602)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(103020000), pi.getMap(103020000).getPortal(2)); //地鐵售票處
		return true;
		}
		pi.openNpc(9073001);
		return true;
}
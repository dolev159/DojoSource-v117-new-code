/*
	名字:	Hidden Street
	地圖:	Space Station Hectare 1
	描述:	552000010
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53247)).getStatus() != 1) {
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(552000021), pi.getMap(552000021).getPortal(0));
		return true;
}
/*
	名字:	隱藏地圖
	地圖:	研究室走廊
	描述:	926100300
*/

function enter(pi) {
	if (pi.getMap(926100301).getCharactersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Someone is already inside Unit 101."));
		return false;
		}
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("r1", 2));
		pi.getPlayer().changeMap(pi.getMap(926100301), pi.getMap(926100301).getPortal(0)); //研究室101號
		return true;
}
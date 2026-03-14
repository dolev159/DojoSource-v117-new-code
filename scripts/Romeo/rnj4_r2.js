/*
	名字:	隱藏地圖
	地圖:	研究室走廊
	描述:	926100300
*/

function enter(pi) {
	if (pi.getMap(926100302).getCharactersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Someone is already inside Unit 102."));
		return false;
		}
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("r2", 2));
		pi.getPlayer().changeMap(pi.getMap(926100302), pi.getMap(926100302).getPortal(0)); //研究室102號
		return true;
}
/*
	名字:	隱藏地圖
	地圖:	研究室走廊
	描述:	926110300
*/

function enter(pi) {
	if (pi.getMap(926110304).getCharactersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Someone is already inside Unit 104."));
		return false;
		}
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("r4", 2));
		pi.getPlayer().changeMap(pi.getMap(926110304), pi.getMap(926110304).getPortal(2)); //研究室104號
		return true;
}
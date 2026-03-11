/*
	名字:	Hidden Street
	地圖:	Master Forge
	描述:	552000071
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(261000000), pi.getMap(261000000).getPortal(0));
	return true;
}
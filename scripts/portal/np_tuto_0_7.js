/*
	名字:	Hidden Street
	地圖:	Wrecked Airship 1
	描述:	552000030
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(552000040), pi.getMap(552000040).getPortal(0));
	return true;
}
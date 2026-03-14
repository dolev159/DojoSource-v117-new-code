/*
	名字:	隱藏地圖
	地圖:	像刀刃的絕壁
	描述:	914022100
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(914022200), pi.getMap(914022200).getPortal(1)); //盜賊鸚鵡領域
	return true;
}
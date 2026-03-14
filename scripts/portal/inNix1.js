/*
	名字:	神木村
	地圖:	格瑞芬多森林
	描述:	240020101
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(240020600), pi.getMap(240020600).getPortal(1)); //偏僻森林
	return true;
}
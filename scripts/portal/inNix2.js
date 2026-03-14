/*
	名字:	神木村
	地圖:	噴火龍棲息地
	描述:	240020401
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(240020600), pi.getMap(240020600).getPortal(2)); //偏僻森林
	return true;
}
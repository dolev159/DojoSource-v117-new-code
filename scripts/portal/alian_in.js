/*
	名字:	馬萊尼西亞島
	地圖:	克蘭卡叢林盆地
	描述:	600010200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(600010300), pi.getMap(600010300).getPortal(1)); //叢林山谷
	return true;
}
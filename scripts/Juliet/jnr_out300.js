/*
	名字:	隱藏地圖
	地圖:	研究室103號
	描述:	926110303
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	for (var i = 0; i < eim.getPlayers().size(); i++)
	eim.getPlayers().get(i).changeMap(eim.getMapInstance(926110400), eim.getMapInstance(926110400).getPortal(0)); //中央研究室入口
	return true;
}
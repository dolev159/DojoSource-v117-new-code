/*
	名字:	隱藏地圖
	地圖:	雜貨商店後院
	描述:	913070020
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("General Store Yard"));
	ms.getPlayer().startMapTimeLimitTask(300, ms.getMap(913070003));
	ms.dispose();
}
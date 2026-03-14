/*
	名字:	奈歐市
	地圖:	夜晚的港灣碼頭
	描述:	240070505
*/

function start() {
	ms.getPlayer().startMapTimeLimitTask(1800, ms.getMap(ms.getPlayer().getMap().getId() - 3));
	ms.dispose();
}
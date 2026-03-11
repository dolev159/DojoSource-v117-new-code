/*
	名字:	亞勒圖
	地圖:	遺棄之塔&amp;lt;冒險之果實&gt;
	描述:	922011100
*/

function start() {
	cm.dispose();
	cm.getPlayer().removeAll(4001454);
	cm.getPlayer().changeMap(cm.getMap(221023300), cm.getMap(221023300).getPortal(0));
}
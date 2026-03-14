/*
	名字:	隱密之地
	地圖:	陰森的洞穴
	描述:	910510601
*/

function start() {
	ms.getPlayer().getMap().spawnNpc(1404005, new java.awt.Point(806, 2106));
	ms.getPlayer().getMap().spawnNpc(1404006, new java.awt.Point(931, 2119));
	ms.getEventManager("q25436").startInstance(ms.getPlayer());
	ms.dispose();
}
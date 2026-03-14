/*
	名字:	菇菇王國
	地圖:	結婚禮堂入口
	描述:	106021500
*/

var mapEff = ["pepeKing/pepe/pepeB", "pepeKing/pepe/pepeG", "pepeKing/pepe/pepeW"];

var mob = [3300005, 3300006, 3300007];

function start() {
	num = Math.floor(Math.random() * 3);
	ms.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange(mapEff[num], 3));
	ms.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("pepeKing/chat/nugu", 3));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(mob[num]), new java.awt.Point(128, -67));
	ms.getPlayer().startMapTimeLimitTask(600, ms.getMap(106021400));
	ms.dispose();
}
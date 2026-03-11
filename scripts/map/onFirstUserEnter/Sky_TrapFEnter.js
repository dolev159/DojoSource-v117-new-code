/*
	名字:	神木村
	地圖:	天空的巢穴入口
	描述:	240080400
*/

function start() {
	ms.getPlayer().getMap().startMapEffect("All party members must overcome the obstacles and enter the Crimson Sky Nest within 3 minutes!", 5120026);
	ms.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Mission: Your party must eliminate all the obstacles within 3 minutes."));
	ms.dispose();
}
/*
	名字:	隱藏地圖
	地圖:	2次轉職
	描述:	931000100
*/

function start() {
	ms.getPlayer().getMap().spawnNpc(2159100, new java.awt.Point(181, -14)); //須勒
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The Schiller has appeared. Let's talk to him."));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("The Schiller has appeared. Let's talk to him."));
	ms.dispose();
}
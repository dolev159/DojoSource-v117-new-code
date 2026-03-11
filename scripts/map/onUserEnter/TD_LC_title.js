/*
	名字:	獅子王城
	地圖:	寂靜的曠野
	描述:	211060000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("temaD/enter/lionCastle", 3));
	ms.dispose();
}
/*
	名字:	隱藏地圖
	地圖:	黑暗之塔1
	描述:	921160300
*/

var map = [921160300, 921160310, 921160320, 921160330, 921160340, 921160350];

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();

	if (eim.getProperty("0st") == null) {
		eim.setProperty("0st", Math.random() < 0.2 ? "1234" : Math.random() < 0.3 ? "2413" : Math.random() < 0.5 ? "3142" : "4321");
		}
	if (eim.getProperty("1st") == null) {
		eim.setProperty("1st", Math.random() < 0.2 ? "0234" : Math.random() < 0.3 ? "2403" : Math.random() < 0.5 ? "3042" : "4320");
		}
	if (eim.getProperty("2st") == null) {
		eim.setProperty("2st", Math.random() < 0.2 ? "1034" : Math.random() < 0.3 ? "0413" : Math.random() < 0.5 ? "3140" : "4301");
		}
	if (eim.getProperty("3st") == null) {
		eim.setProperty("3st", Math.random() < 0.2 ? "1204" : Math.random() < 0.3 ? "2410" : Math.random() < 0.5 ? "0142" : "4021");
		}
	if (eim.getProperty("4st") == null) {
		eim.setProperty("4st", Math.random() < 0.2 ? "1235" : Math.random() < 0.3 ? "2513" : Math.random() < 0.5 ? "3152" : "5321");
		}
	if (eim.getProperty("5st") == null) {
		eim.setProperty("5st", Math.random() < 0.2 ? "1234" : Math.random() < 0.3 ? "2413" : Math.random() < 0.5 ? "3142" : "4321");
		}
		portal = pi.getPortal().getName().substring(4, 5);

		for (var i = 0; i < map.length; i++)
	if (pi.getPlayer().getMap().getId() == map[i])
		num = eim.getProperty(i + "st").substring(portal, parseInt(portal) + 1);

		pi.getPlayer().changeMap(pi.getMap(map[num]), pi.getMap(map[num]).getPortal(0));
		return false;
}
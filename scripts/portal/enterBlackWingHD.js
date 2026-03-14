/*
	名字:	乾枯的路
	地圖:	礦山後路
	描述:	310040210
*/

var quest = [20741, 23146, 23147, 22613];

var map = [931050600, 931000640, 931000650, 931050720];

var text = ["Find the room that Claudine told you about.", "Find out what's inside each cave.", "", ""];

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23144)).getStatus() == 1) {
		var em = pi.getEventManager("q23144");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
	if (pi.getMap(map[i]).getCharacters().size() < 1) {
		pi.getMap(map[i]).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map[i]), pi.getMap(map[i]).getPortal(1)); //傑利麥勒實驗室入口
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "" + text[i]));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310040210));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There's a loud noise coming from in there... Maybe you shouldn't go in."));
		return false;
}
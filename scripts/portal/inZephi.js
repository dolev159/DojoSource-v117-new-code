/*
	名字:	北部森林
	地圖:	巨大的樹木
	描述:	101030000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2631)).getStatus() > 0) {
	if (pi.getMap(910100200).getCharacters().size() < 1) {
		pi.getMap(910100200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910100200), pi.getMap(910100200).getPortal(3)); //傑斐的隱身處
		//pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The house looks quiet. An elderly man in a peculiar outfit is reading a book..."));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The entrance to the building should be somewhere between the trees."));
		return false;
}
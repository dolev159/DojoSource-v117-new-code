/*
	名字:	瑞恩島
	地圖:	瑞恩村
	描述:	140000000
*/

var quest = [21015, 21016, 21017]
var mob = ["Murupas", "Murupias", "Murumurus"]

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You must exit to the right in order to find " + mob[i] + "."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(140010000), pi.getMap(140010000).getPortal(2)); //瑞恩西邊平原
		return true;
}
/*
	名字:	隱藏地圖
	地圖:	可疑的步道
	描述:	310060221
*/

var quest = [23046, 23047, 23048];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() > 1) {
		var em = pi.getEventManager("q" + quest[i]);
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You can hear someone beyond the door. Come back a little later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The door is locked. You must get a Key Card from Gelimer to open it."));
		return false;
}
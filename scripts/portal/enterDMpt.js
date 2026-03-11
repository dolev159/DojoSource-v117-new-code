/*
	名字:	隱密之地
	地圖:	隱藏通路
	描述:	910600101
*/

var map = 910600102; //隱藏玩偶師的洞穴

var num = 4;

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25419)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25423)).getStatus() < 2) {
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getMap(map + i).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(0));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		}
		return false;
}
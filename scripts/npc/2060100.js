/*
	名字:	卡勒塔
	地圖:	卡勒塔洞穴
	描述:	230040001
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6301)).getStatus() != 1) {
		cm.sendOk("The Warped Dimension? Where did you hear about that?");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4000175) < 1) {
		cm.sendOk("In order to open the crack of dimension you will have to posess one piece of Miniature Pianus. Those could be gained by defeating a Pianus.");
		cm.dispose();
		return;
		}
	if (cm.getMap(923000000).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Someone is already in this map, Better come back later."));
		cm.dispose();
		return;
		}
		cm.gainItem(4000175, -1);
		cm.getPlayer().changeMap(cm.getMap(923000000), cm.getMap(923000000).getPortal(2));
		cm.getPlayer().startMapTimeLimitTask(300, cm.getMap(230040001));
		cm.dispose();
}
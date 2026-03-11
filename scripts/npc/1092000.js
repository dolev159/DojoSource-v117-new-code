/*
	名字:	湯寶寶
	地圖:	餐廳
	描述:	120000103
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)).getStatus() != 1) {
		cm.sendOk("Do you want to make some delicious dishes for the crew of the Nautilus? I can teach you how.");
		cm.dispose();
		return;
		}
		cm.getPlayer().changeMap(cm.getMap(912000100), cm.getMap(912000100).getPortal(1));
		cm.dispose();
}
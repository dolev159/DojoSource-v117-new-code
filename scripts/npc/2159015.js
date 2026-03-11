/*
	名字:	小可愛
	地圖:	人煙稀少的石山
	描述:	931000001
*/

function start() {
	if (cm.getPlayer().getInfoQuest(23999).indexOf("exp3=1") != -1) {
		cm.sendNext("Hehehe... I should have hidden somewhere else.");
		cm.dispose();
		return;
		}
		cm.sendNext("Aw shucks. You found me. Wow, you're really good at this game! \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 3 exp");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.gainExp(3);
		cm.getPlayer().updateInfoQuest(23999, cm.getPlayer().getInfoQuest(23999) + ";exp3=1");
		}
		cm.dispose();
}
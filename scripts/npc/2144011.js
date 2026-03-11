/*
	名字:	傳送點用圖片
	地圖:	三扇門
	描述:	270000000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31165)).getStatus() < 1) {
		cm.sendOkS("I can't enter this place yet. Where does it lead?", 16);
		}
		cm.dispose();
}
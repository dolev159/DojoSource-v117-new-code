/*
	名字:	傳送點用圖片
	地圖:	燃燒的神木村4
	描述:	272000410
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 272000500) {
		cm.sendOkS("Please bring Last Onyx Dragon Egg to me.", 4, 2144006);
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() != 0) {
		cm.sendOkS("Mwahaha, you're not leaving unless you defeat me!", 4, 2144008);
		cm.dispose();
		return;
		}
		cm.sendOkS("Talk to me before you go.", 4, 2144008);
		cm.dispose();
}
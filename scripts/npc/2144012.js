/*
	名字:	傳送點用圖片
	地圖:	燃燒的神木村1
	描述:	272000100
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 272000100) {
		cm.sendOkS("You will not be able to proceed to the next area without a request from me.", 4, 2144003);
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() == 272000200) {
		cm.sendOkS("Please eliminate any nearby monsters before proceeding to the next area.", 4, 2144004);
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() == 272000300) {
		cm.sendOkS("You can't leave without helping us! Come quick!", 4, 2144005);
		cm.dispose();
		return;
		}
		cm.sendOkS("Would you take a moment to talk to me before you leave? I have a favor to ask.", 4, 2144006);
		cm.dispose();
}
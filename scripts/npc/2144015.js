/*
	名字:	傳送點用圖片
	地圖:	時間神殿迴廊1
	描述:	272010000
*/

function start() {
	if (cm.getClient().getPlayer().getMap().getId() == 272010000) {
		cm.sendNextS("Adventurer, please listen to my story.", 4, 2144000);
		cm.dispose();
		return;
		}
		cm.sendOkS("You've stopped #p2144010#'s plans to break the Black Mage out of his confinement. Now it's time for you to return to the present and enter the Dimensional Schism. #p2144010# can't hide any longer!", 16);
		cm.dispose();
}
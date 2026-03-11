/*
	名字:	拉伊拉
	地圖:	納希綠洲城
	描述:	260000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNext("Hohoh~ welcome welcome. Welcome to Ariant Skin Care. You have stepped into a renowned Skin Care shop that even the Queen herself frequents this place. If you have #b#t5153015##k with you, we'll take care of the rest. How about letting work on your skin today?");
		break;
	case 1:
		skin = [0, 1, 2, 3, 4, 5, 9, 10, 11];

		cm.sendStyle("With our specialized machine, you can see yourself after the treatment in advance. What kind of skin-treatment would you like to do? Choose the style of your liking...", skin);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5153015)) {
			cm.gainItem(5153015, -1);
			cm.getPlayer().setSkinColor(skin[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.SKIN, skin[selection]);
			cm.sendNext("Here's the mirror, check it out! Doesn't your skin look beautiful and glowing like mine? Hehe, it's wonderful. Please come again!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm... I don't think you have our Skin Care coupon with you. Without it, I can't give you the treatment.");
			cm.dispose();
}
}
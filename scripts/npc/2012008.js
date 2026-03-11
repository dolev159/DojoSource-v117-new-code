/*
	名字:	羅米
	地圖:	天空之城護膚中心
	描述:	200000203
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
		cm.sendNext("Well, hello! Welcome to the Orbis Skin-Care~! Would you like to have a firm, tight, healthy looking skin like mine? With #b#t5153015##k, you can let us take care of the rest and have the kind of skin you've always wanted~!");
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
			cm.sendNext("It looks like you don't have the coupon you need to receive the treatment. I'm sorry but it looks like we cannot do it for you.");
			cm.dispose();
}
}
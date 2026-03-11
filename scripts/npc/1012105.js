/*
	名字:	沃美妮
	地圖:	弓箭手村護膚中心
	描述:	100000105
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
		cm.sendNext("Welcome to Henesys Skin-Care! For just one teeny-weeny #b#t5153015##k, I can make your skin supple and glow-y, like mine! Trust me, you don't want to miss my facials.");
		break;
	case 1:
		skin = [0, 1, 2, 3, 4, 5, 9, 10, 11];

		cm.sendStyle("We have the latest in beauty equipment. With our technology, you can preview what your skin will look like in advance! Which treatment would you like?", skin);
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
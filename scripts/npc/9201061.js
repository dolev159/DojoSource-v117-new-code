/*
	名字:	波馬克
	地圖:	新葉城 購物中心
	描述:	600000001
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
		if (status < 1) {
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
		color = [100, 200, 300, 400, 500, 600, 700];

		teye = cm.getPlayer().getFace() % 100;

		teye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;

		color = color[Math.floor(Math.random() * color.length)] + teye;

		cm.sendYesNo("Hi, there~! I'm Bomack. If you use the regular coupon, you'll be awarded a random pair of cosmetic lenses. Are you going to use #b#t5152035##k and really make the change to your eyes?");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(5152035)) {
			cm.gainItem(5152035, -1);
			cm.getPlayer().setFace(color);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, color);
			cm.sendNext("Enjoy your new and improved cosmetic lenses!");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm sorry, but I don't think you have our cosmetic lens coupon with you right now. Without the coupon, I'm afraid I can't do it for you..");
			cm.dispose();
}
}
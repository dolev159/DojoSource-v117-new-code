/*
	名字:	J.J.
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

		for (var i = 0; i < color.length; i++)
		color[i] = teye + color[i];

		cm.sendStyle("Hi, there~! I'm J.J, in charge of the cosmetic lenses here at NLC Shop! If you have a #b#t5152036##k, I can get you the best cosmetic lenses you have ever had! Now, what would you like to do?", color);
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(5152036)) {
			cm.gainItem(5152036, -1);
			cm.getPlayer().setFace(color[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, color[selection]);
			cm.sendNext("Enjoy your new and improved cosmetic lenses!");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm sorry, but I don't think you have our cosmetic lens coupon with you right now. Without the coupon, I'm afraid I can't do it for you..");
			cm.dispose();
}
}
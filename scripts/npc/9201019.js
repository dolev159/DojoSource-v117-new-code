/*
	名字:	莎卡哈
	地圖:	結婚小鎮
	描述:	680000000
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
		cm.sendYesNo("If you use the regular coupon, you may end up with a random new look for your face...do you still want to do it using #b#t5152056##k?");
		break;
	case 1:
		if (cm.getPlayer().getGender() < 1)
			face = [20002, 20005, 20007, 20011, 20014, 20027, 20029];
		else
			face = [21001, 21005, 21007, 21017, 21018, 21020, 21022];

			face = face[Math.floor(Math.random() * face.length)] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

		if (cm.getPlayer().itemQuantity(5152056)) {
			cm.gainItem(5152056, -1);
			cm.getPlayer().setFace(face);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face);
			cm.sendNext("Okay, the surgery's done. Here's a mirror--check it out. What a masterpiece, no? Haha! If you ever get tired of this look, please feel free to come visit me again.");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
			cm.dispose();
}
}
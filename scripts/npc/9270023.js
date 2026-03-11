/*
	名字:	諾爾
	地圖:	中心商務區
	描述:	540000000
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
		cm.sendYesNo("If you use the regular coupon, then we will not be able to predict the new look of your face...Do you still want to proceed using #b#t5152056##k?");
		break;
	case 1:
		if (cm.getPlayer().getGender() < 1)
			face = [20002, 20005, 20006, 20013, 20017, 20021, 20024];
		else
			face = [21002, 21003, 21014, 21016, 21017, 21021, 21027];

			face = face[Math.floor(Math.random() * face.length)] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

		if (cm.getPlayer().itemQuantity(5152056)) {
			cm.gainItem(5152056, -1);
			cm.getPlayer().setFace(face);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face);
			cm.sendNext("Ok, the surgery's over. See it for yourself... What do you think? Quite fantastic, if I should say so myself. Please come again when you want another look, okay?");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
			cm.dispose();
}
}
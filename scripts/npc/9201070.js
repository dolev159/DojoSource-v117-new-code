/*
	名字:	杰克
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
		cm.sendYesNo("If you use the regular coupon, your face may transform into a random new look...do you still want to do it using #b#t5152056##k?");
		break;
	case 1:
		if (cm.getPlayer().getGender() < 1)
			face = [20001, 20008, 20011, 20013, 20024, 20029, 20032];
		else
			face = [21000, 21007, 21011, 21012, 21017, 21020, 21022];

			face = face[Math.floor(Math.random() * face.length)] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

		if (cm.getPlayer().itemQuantity(5152056)) {
			cm.gainItem(5152056, -1);
			cm.getPlayer().setFace(face);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face);
			cm.sendNext("Ok, the surgery's over. See for it yourself, here's the mirror... what do you think? l think this looks like a masterpiece... hahahaha, please come again when you get bored free to that new look, ok?");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
			cm.dispose();
}
}
/*
	名字:	助手 莉茲
	地圖:	天空之城整形手術
	描述:	200000201
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
		cm.sendYesNo("If you use the regular coupon, your face may be changed to something random. Do you still want to proceed using #b#t5152056##k?");
		break;
	case 1:
		if (cm.getPlayer().getGender() < 1)
			face = [20003, 20011, 20021, 20022, 20023, 20027, 20031];
		else
			face = [21004, 21007, 21010, 21012, 21020, 21021, 21030];

			face = face[Math.floor(Math.random() * face.length)] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

		if (cm.getPlayer().itemQuantity(5152056)) {
			cm.gainItem(5152056, -1);
			cm.getPlayer().setFace(face);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face);
			cm.sendNext("The procedure's done...Check it out in the mirror. What do you think? Simply beautiful... Haha! Well, give me a call if you get sick of it, alright?");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
			cm.dispose();
}
}
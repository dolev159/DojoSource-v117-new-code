/*
	名字:	艾伯
	地圖:	玩具城整形外科
	描述:	220000003
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
		cm.sendYesNo("If you use the regular coupon, your face may transfor into a random new look ... do you still want to do it using #b#t5152056##k?");
		break;
	case 1:
		if (cm.getPlayer().getGender() < 1)
			face = [20001, 20003, 20007, 20013, 20021, 20023, 20025];
		else
			face = [21002, 21004, 21006, 21008, 21022, 21027, 21029];

			face = face[Math.floor(Math.random() * face.length)] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

		if (cm.getPlayer().itemQuantity(5152056)) {
			cm.gainItem(5152056, -1);
			cm.getPlayer().setFace(face);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face);
			cm.sendNext("Now the procedure's done ... check it out, here's the mirror for you ... what do you think? Even l admit this looks like a masterpiece ... hahah, well, give me a call once you get sick of that new look, alright?");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
			cm.dispose();
}
}
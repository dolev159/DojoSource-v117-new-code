/*
	名字:	保妥士
	地圖:	埃德爾斯坦
	描述:	310000000
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
		if (cm.getPlayer().getGender() < 1)
			face = [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20008, 20012, 20014, 20016, 20020, 20017, 20013, 20022, 20025, 20027, 20028, 20029, 20031];
		else
			face = [21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21012, 21016, 21020, 21017, 21013, 21021, 21023, 21024, 21026, 21027, 21029];

			for (var i = 0; i < face.length; i++)
			face[i] = face[i] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

			cm.sendStyle("You can change your face to have a completely new look. Feel free to try it out! All you need is a #b#t5152057##k to receive your makeover. Ready for a stunning transformation?", face);
			break;
	case 1:
		if (cm.getPlayer().itemQuantity(5152057)) {
			cm.gainItem(5152057, -1);
			cm.getPlayer().setFace(face[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face[selection]);
			cm.sendNext("Ok, the surgery's over. See for it yourself.. What do you think? Quite fantastic, if I should say so myself. Please come again when you want another look, okay?");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
			cm.dispose();
}
}
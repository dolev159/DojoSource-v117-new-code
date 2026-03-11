/*
	名字:	本田
	地圖:	昭和美髮店
	描述:	801000001
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
		cm.sendSimple("Welcome, welcome, welcome to the showa Hair-Salon! Do you, by any chance, have #b#t5150053##k or #b#t5151036##k? If so, how about letting me take care of your hair? Please choose what you want to do with it. \r\n#L0##bChange hair style (VIP coupon)#l\r\n#L1#Dye your hair (VIP coupon)#l");
		break;
	default:
		if (status == 1) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getGender() < 1)
			hair = [30030, 33240, 30780, 30810, 30820, 30260, 30280, 30710, 30920, 30340];
		else
			hair = [31550, 31850, 31350, 31460, 31100, 31030, 31790, 31000, 31770, 34260];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendStyle("I can change your hairstyle to something totally new. Aren't you sick of your current hairdo? With #b#t5150053##k, I can make that happen for you. Choose the hairstyle you'd like to sport.", hair);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150053)) {
			cm.gainItem(5150053, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Enjoy your new and improved hairstyle!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't give you a haircut without it. I'm sorry...");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		hair = parseInt(cm.getPlayer().getHair() / 10) * 10;

		hair = [hair +0, hair +1, hair +2, hair +3, hair +4, hair +5, hair +6];

		cm.sendStyle("I can change your hair color to something totally new. Aren't you sick of your current hairdo? With #b#t5151036##k, I can make that happen. Choose the hair color you'd like to sport.", hair);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151036)) {
			cm.gainItem(5151036, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Enjoy your new and improved hair colour!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't dye your hair without it. I'm sorry...");
			cm.dispose();
}
}
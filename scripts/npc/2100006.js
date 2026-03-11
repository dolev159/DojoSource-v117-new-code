/*
	名字:	玛兹拉
	地圖:	納希綠洲城
	描述:	260000000
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
		cm.sendSimple("Hahaha... it takes a lot of style and flair for someone to pay attention to his or her hairsyle in a desert. Someone like you... If you have #b#t5150053##k or #b#t5151036##k, I'll give your hair a fresh new look. \r\n#L0##bChange Hairstyle (VIP Coupon)#l\r\n#L1#Dye Hair (VIP Coupon)#l");
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
			hair = [30250, 30330, 30150, 30900, 30170, 30180, 30820, 30410, 30460];
		else
			hair = [31090, 31190, 31040, 31420, 31330, 31340, 31400, 31620, 31660];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendStyle("Hahaha~ all you need is #b#t5150053##k to change up your hairstyle. Choose the new style, and let me do the rest.", hair);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150053)) {
			cm.gainItem(5150053, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Your hair's done! Take a look at yourself in the mirror. You'll be amazed by how much better you look already...hahaha.");
			cm.dispose();
			return;
			}
			cm.sendNext("I thought I told you, you need the coupon in order for me to work magic on your hair check again.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		hair = parseInt(cm.getPlayer().getHair() / 10) * 10;

		hair = [hair +1, hair +2, hair +3, hair +4, hair +5, hair +6];

		cm.sendStyle("Every once in a while, it doesn't hurt to change up your hair color... It's fun. Allow me, the great Mazra, to dye your hair, so you just bring me #b#t5151036##k, and choose your new hair color.", hair);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151036)) {
			cm.gainItem(5151036, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Your hair's done! Take a look at yourself in the mirror. You'll be amazed by how much better you look already...hahaha.");
			cm.dispose();
			return;
			}
			cm.sendNext("I thought I told you, you need the coupon in order for me to work magic on your hair check again.");
			cm.dispose();
}
}
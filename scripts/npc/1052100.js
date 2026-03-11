/*
	名字:	錢老闆
	地圖:	墮落城市美髮店
	描述:	103000005
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
		cm.sendSimple("Hello! I'm Don Giovanni, head of the beauty salon! If you have either #b#t5150053##k or #b#t5151036##k, why don't you let me take care of the rest? Decide what you want to do with your hair... \r\n#L0##bChange hair style (VIP coupon)#l\r\n#L1#Dye your hair (VIP coupon)#l");
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
			hair = [30130, 33040, 30850, 30780, 30040, 30920];
		else
			hair = [34090, 31090, 31880, 31140, 31330, 31760];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendStyle("I can change your hairstyle to something totally new. Aren't you sick of your hairdo? I'II give you a haircut with #b#t5150053##k. Choose the hairstyle of your liking.", hair);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150053)) {
			cm.gainItem(5150053, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Ok, check out your new haircut. What do you think? Even I admit this one is a masterpiece! AHAHAHA. Let me know when you want another haircut. I'll take care of the rest!");
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

		hair = [hair +0, hair +2, hair +3, hair +5];

		cm.sendStyle("I can change the color of your hair to something totally new. Aren't you sick of your hair-color? I'll dye your hair if you have #bVIP hair color coupon#k. Choose the hair-color of your liking!", hair);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151036)) {
			cm.gainItem(5151036, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Ok, check out your new hair color. What do you think? Even I admit this one is a masterpiece! AHAHAHA. Let me know when you want another haircut. I'll take care of the rest!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't dye your hair without it. I'm sorry...");
			cm.dispose();
}
}
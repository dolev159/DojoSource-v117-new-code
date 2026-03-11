/*
	名字:	撒勒曼
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
		cm.sendSimple("Welcome! My name's Julius Styleman. If you have an #b#t5150053##k or #b#t5151036##k, I'm going to give your hair a makeover that would stop a Balrog dead in its tracks! What style would you like? \r\n#L0##bChange hair style (VIP coupon)#l\r\n#L1#Dye your hair (VIP coupon)#l");
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
			hair = [30450, 30570, 30660, 30910, 30050, 30410, 30510, 30300, 30580, 30590, 33280];
		else
			hair = [31150, 31590, 31310, 31220, 31260, 31630, 31580, 31610, 31490, 31480, 31420];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendStyle("I can change your hairstyle to something totally new. Aren't you sick of your hairdo? I'll give you a haircut with #b#t5150053##k. Choose the hairstyle of your liking.", hair);
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

		hair = [hair +0, hair +1, hair +3, hair +4, hair +5];

		cm.sendStyle("I can change the color of your hair to something totally new. Aren't you sick of your hair-color? I'll dye your hair if you have #b#t5151036##k. Choose the hair-color of your liking!", hair);
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
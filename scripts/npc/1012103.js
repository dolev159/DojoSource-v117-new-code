/*
	名字:	美髮師娜塔麗
	地圖:	弓箭手村美髮店
	描述:	100000104
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
		cm.sendSimple("I'm the head of this hair salon Natalie. If you have #b#t5150053##k or #b#t5151036##k, allow me to take care of your hairdo. Please choose the one you want. \r\n#L0##bHaircut(VIP coupon)#l\r\n#L1#Dye your hair(VIP coupon)#l");
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
			hair = [33040, 30060, 30210, 30140, 30200, 33170, 33100];
		else
			hair = [31150, 34090, 31300, 31700, 31350, 31740, 34110];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendStyle("I can totally change up your hairstyle and make it look so good. Why don't you change it up a bit? with #b#t5150053##k I'll change it for you. Choose the one to your liking~", hair);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150053)) {
			cm.gainItem(5150053, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Check it out!!. What do you think? Even I think this one is a work of art! AHAHAHA. Please let me know when you want another haircut, because I'll make you look good each time!");
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

		hair = [hair +0, hair +1, hair +2, hair +4, hair +6];

		cm.sendStyle("I can totally change your haircolor and make it look so good. Why don't you change it up a bit? With #b#t5151036##k I'll change it for you. Choose the one to your liking.", hair);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151036)) {
			cm.gainItem(5151036, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Check it out!!. What do you think? Even I think this one is a work of art! AHAHAHA. Please let me know when you want to dye your hair again, because I'll make you look good each time!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't dye your hair without it. I'm sorry...");
			cm.dispose();
}
}
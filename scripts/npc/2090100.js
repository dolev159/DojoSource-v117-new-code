/*
	名字:	路歐老伯
	地圖:	桃花仙境美髮店
	描述:	250000003
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
		cm.sendSimple("Welcome to the Mu Lung hair shop. If you have #b#t5150053##k or #b#t5151036##k, allow me to take care of your hairdo. Please choose the one you want. \r\n#L0##bHaircut(VIP coupon)#l\r\n#L1#Dye your hair(VIP coupon)#l");
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
			hair = [30750, 30420, 30150, 30810, 30240, 30710, 30370, 30640];
		else
			hair = [31300, 31180, 31910, 31460, 31160, 31470, 31140, 31660];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendStyle("I can totally change up your hairstyle and make it look so good. Choose the one to your liking with #b#t5150053##k. Why don't you change it up a bit? I'll change It for you.", hair);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150053)) {
			cm.gainItem(5150053, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Hey, here's the mirror. What do you think of your new haircut? I know it wasn't the smoothest of all, but didn't it come out pretty nice? Come back later when you need to change it up again!");
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

		hair = [hair +0, hair +1, hair +3, hair +5, hair +6];

		cm.sendStyle("I can totally change your haircolor and make it look so good. Why don't you change it up a bit? With #b#t5151036##k I'll change It for you. Choose the one to your liking.", hair);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151036)) {
			cm.gainItem(5151036, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Hey, here's the mirror. What do you think of your new haircolor? I know it wasn't the smoothest of all, but didn't it come out pretty nice? Come back later when you need to change it up again!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't dye your hair without it. I'm sorry...");
			cm.dispose();
}
}
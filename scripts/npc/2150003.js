/*
	名字:	帕必歐
	地圖:	埃德爾斯坦美髮店
	描述:	310000003
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
		cm.sendSimple("Beauty is something that you must pursue your entire life. I can give you a new hairstyle if you have a #bHair Style Coupon#k or a #bHair Color Coupon#k! \r\n#L0##bChange hairstyle (VIP Coupon)#l\r\n#L1#Change hairstyle (Regular Coupon)#l\r\n#L2#Dye your hair (VIP Coupon)#l\r\n#L3#Dye your hair (Regular Coupon)#l");
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
			hair = [30350, 30480, 33190, 30760, 30330, 30560, 30040, 30730, 30370, 30470, 30460];
		else
			hair = [31310, 31490, 31260, 31130, 31160, 31510, 31230, 31320, 31560, 34190, 31530];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendStyle("All you need is a #b#t5150053##k and I can change the look of your hair. Please choose the hair style you would like.", hair);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150053)) {
			cm.gainItem(5150053, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Oh, it's marvelous! Please tell me you're delighted with my work!");
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
		if (cm.getPlayer().getGender() < 1)
			hair = [33250];
		else
			hair = [31230];

			hair = hair[Math.floor(Math.random() * hair.length)] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendYesNo("If you use a regular Coupon, your hair will change Randomly. Don't worry though, you can trust me! Do you you want to use the #b#t5150052##k to change your hair?");
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150052)) {
			cm.gainItem(5150052, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Oh, it's marvelous! Please tell me you're delighted with my work!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't dye your hair without it. I'm sorry...");
			cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		hair = parseInt(cm.getPlayer().getHair() / 10) * 10;

		hair = [hair +0, hair +2, hair +3, hair +4];

		cm.sendStyle("Finding the right color to enhance your hairstyle is very important. If you have a #b#t5151036##k, please choose the color you would like.", hair);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151036)) {
			cm.gainItem(5151036, -1);
			cm.getPlayer().setHair(hair[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair[selection]);
			cm.sendNext("Oh, it's marvelous! Please tell me you're delighted with my work!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't dye your hair without it. I'm sorry...");
			cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:

		hair = parseInt(cm.getPlayer().getHair() / 10) * 10;

		hair = [hair +0, hair +1, hair +2, hair +3, hair +4, hair +5];

		hair = hair[Math.floor(Math.random() * hair.length)];

		cm.sendYesNo("If you use a regular Coupon, your haircolor will change Randomly. Don't worry though, you can trust me! Do you you want to use the #b#t5151035##k to change your haircolor?");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151035)) {
			cm.gainItem(5151035, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Oh, it's marvelous! Please tell me you're delighted with my work!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't dye your hair without it. I'm sorry...");
			cm.dispose();
}
}
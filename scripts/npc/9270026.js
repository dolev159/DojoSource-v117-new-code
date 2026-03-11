/*
	名字:	希絲
	地圖:	中心商務區
	描述:	540000000
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
		cm.sendSimple("Hi, there! I'm Sixx, in charge of Da Yan Jing Lens Shop here at CBD! With #b#t5152039##k or #b#t5152040##k, you can let us take care of the rest and have the kind of beautiful look you've always craved~! Remember, the first thing everyone notices about you is the eyes, and we can help you find the cosmetic lens that most fits you! Now, what would you like to use? \r\n#L0##bCosmetic Lenses at CBD (Reg coupon)#l\r\n#L1#Cosmetic Lenses at CBD (VIP coupon)#l");
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
		color = [100, 200, 300, 400, 500, 600, 700];

		teye = cm.getPlayer().getFace() % 100;

		teye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;

		color = color[Math.floor(Math.random() * color.length)] + teye;

		cm.sendYesNo("If you use the regular coupon, you'll be awarded a random pair of cosmetic lenses. Are you going to use #b#t5152039##k and really make the change to your eyes?");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5152039)) {
			cm.gainItem(5152039, -1);
			cm.getPlayer().setFace(color);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, color);
			cm.sendNext("Here's the mirror. What do you think? I think they look tailor-made for you. I have to say, you look faaabulous. Please come again.");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm sorry, but I don't think you have our cosmetic lens coupon with you right now. Without the coupon, I'm afraid I can't do it for you..");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		color = [100, 200, 300, 400, 500, 600, 700];

		teye = cm.getPlayer().getFace() % 100;

		teye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;

		for (var i = 0; i < color.length; i++)
		color[i] = teye + color[i];

		cm.sendStyle("With our specialized machine, you can see yourself after the treatment in advance. What kind of lens would you like to wear? Choose the style of your liking...", color);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5152040)) {
			cm.gainItem(5152040, -1);
			cm.getPlayer().setFace(color[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, color[selection]);
			cm.sendNext("Here's the mirror. What do you think? I think they look tailor-made for you. I have to say, you look faaabulous. Please come again.");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm sorry, but I don't think you have our cosmetic lens coupon with you right now. Without the coupon, I'm afraid I can't do it for you..");
			cm.dispose();
}
}
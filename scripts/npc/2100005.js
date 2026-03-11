/*
	名字:	莎堤
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
		cm.sendSimple("Hey there! I'm Shati, and I'm Mazra's apprentice. If you have #b#t5150052##k or #b#t5151035##k with you, how about allowing me to work on your hair? \r\n#L0##bChange Hairstyle (REG Coupon)#l\r\n#L1#Dye hair (Reg Coupon)#l");
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
			hair = [30250, 30350, 30270, 30150, 30300, 30600, 30160, 30700, 30720, 30420];
		else
			hair = [31040, 31250, 31310, 31220, 31300, 31680, 31160, 31030, 31230, 31690, 31210, 31170, 31450];

			hair = hair[Math.floor(Math.random() * hair.length)] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendYesNo("If you use the REG coupon, your hairstyle will be changed to a random new look. You'll also have access to new hairstyles I worked on that's not available for VIP coupons. Would you like to use #b#t5150052##k for a fabulous new look?");
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150052)) {
			cm.gainItem(5150052, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("The reason my hairstyle looks like this is because I've experimented different styles on myself. Good thing l did that. Yours came out awesome!");
			cm.dispose();
			return;
			}
			cm.sendNext("I can only change your hairstyle if you bring me the coupon. You didn't forget that, did you?");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:

		hair = parseInt(cm.getPlayer().getHair() / 10) * 10;

		hair = [hair +0, hair +1, hair +2, hair +3, hair +4, hair +5];

		hair = hair[Math.floor(Math.random() * hair.length)];

		cm.sendYesNo("If you use the REG coupon, your haircolor will be changed to a random new look. You'll also have access to new hairstyles I worked on that's not available for VIP coupons. Would you like to use #b#t5151035##k for a fabulous new look?");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151035)) {
			cm.gainItem(5151035, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("The reason my haircolor looks like this is because I've experimented different styles on myself. Good thing l did that. Yours came out awesome!");
			cm.dispose();
			return;
			}
			cm.sendNext("I can only change your haircolor if you bring me the coupon. You didn't forget that, did you?");
			cm.dispose();
}
}
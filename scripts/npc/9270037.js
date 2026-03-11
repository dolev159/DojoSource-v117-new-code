/*
	名字:	吉米
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
		cm.sendSimple("Hi, I'm the assistant here. Don't worry, I'm plenty good enough for this. If you have #b#t5150052##k or #b#t5151035##k by any chance, then allow me to take care of the rest, alright? \r\n#L0##bChange hair-style (Regular coupon)#l\r\n#L1#Dye your hair (Regular coupon)#l");
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
			hair = [30110, 30290, 30230, 30260, 30320, 30190, 30240, 30350, 30270, 30180];
		else
			hair = [31260, 31090, 31220, 31250, 31140, 31160, 31100, 31120, 31030, 31270, 31810];

			hair = hair[Math.floor(Math.random() * hair.length)] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendYesNo("If you use the regular coupon, your hair-style will be changed into a random new look. Are you sure you want to use #b#t5150052##k and change it?");
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150052)) {
			cm.gainItem(5150052, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Hey, here's the mirror. What do you think of your new haircut? I know it wasn't the smoothest of all, but didn't it come out pretty nice? If you ever feel like changing it up again later, please drop by.");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...are you sure you have our designated coupon? Sorry but no haircut without it.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:

		hair = parseInt(cm.getPlayer().getHair() / 10) * 10;

		hair = [hair +0, hair +1, hair +2, hair +3, hair +4, hair +5];

		hair = hair[Math.floor(Math.random() * hair.length)];

		cm.sendYesNo("If you use the regular coupon, your hair-color will be changed into a random new look. Are you sure you want to use #b#t5151035##k and change it?");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151035)) {
			cm.gainItem(5151035, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Hey, here's the mirror. What do you think of your new haircolor? I know it wasn't the smoothest of all, but didn't it come out pretty nice? If you ever feel like changing it up again later, please drop by.");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...are you sure you have our designated coupon? Sorry but no dye your hair without it.");
			cm.dispose();
}
}
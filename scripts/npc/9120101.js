/*
	名字:	布美
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
		cm.sendSimple("Hi, I'm the assistant here. If you have #b#t5150052##k or #b#t5151035##k, please allow me to change your hairdo.. \r\n#L0##bChange Hairstyle (REG Coupon)#l\r\n#L1#Dye Your Hair (REG Coupon)#l");
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
			hair = [30000, 30120, 30140, 30190, 30210, 30360, 30220, 30370, 30400, 30440, 30790, 30800, 30810, 30770, 30760];
		else
			hair = [31030, 31050, 31000, 31070, 31100, 31120, 31130, 31250, 31340, 31680, 31350, 31400, 31650, 31550, 31800];

			hair = hair[Math.floor(Math.random() * hair.length)] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendYesNo("If you use the REG coupon your hair will change to a RANDOM new hairstyle. Would you like to use #b#t5150052##k to change your hairstyle?");
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150052)) {
			cm.gainItem(5150052, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Now, here's the mirror. What do you think of your new haircut? Doesn't it look nice for a job done by an assistant? Come back later when you need to change it up again!");
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

		cm.sendYesNo("If you use the REG coupon your hair will change to a RANDOM new haircolor. Would you like to use #b#t5151035##k to change your haircolor?");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151035)) {
			cm.gainItem(5151035, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Now, here's the mirror. What do you think of your new haircolor? Doesn't it look nice for a job done by an assistant? Come back later when you need to change it up again!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...are you sure you have our designated coupon? Sorry but no dye your hair without it.");
			cm.dispose();
}
}
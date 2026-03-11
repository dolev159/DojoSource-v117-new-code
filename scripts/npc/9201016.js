/*
	名字:	席摩士
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
		cm.sendSimple("How's it going? I've got some new hair-do's to try out if you're game... what do you say? If you have a #b#t5150052##k or #b#t5151035##k, please let me change your hairdo ... \r\n#L0##bHairstyle(REG Coupon)#l\r\n#L1#Dye your hair(REG Coupon)#l");
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
			hair = [30250, 30230, 30050, 30280, 30410, 30290, 30300, 30580, 30590, 30200, 30450];
		else
			hair = [31490, 31150, 31590, 31310, 31220, 31260, 31020, 31160, 31110, 31230, 31580, 31480];

			hair = hair[Math.floor(Math.random() * hair.length)] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendYesNo("If you use the REG coupon your hair will change RANDOMLY with a chance to obtain a new experimental style that I came up with. Are you going to use #b#t5150052##k and really change your hairstyle?");
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150052)) {
			cm.gainItem(5150052, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Ok, here's the mirror. Your new haircut! What do you think? I know it wasn't the smoothest, but it still looks pretty good! Come back later when you need to change it up again!");
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

		cm.sendYesNo("If you use a #b#t5151035##k, you haircolor will change randomly. Still want lo use #t5151035# and dye your hair?");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151035)) {
			cm.gainItem(5151035, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Ok, here's the mirror. Your new haircut! What do you think? I know it wasn't the smoothest, but it still looks pretty good! Come back later when you need to change it up again!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...are you sure you have our designated coupon? Sorry but no dye your hair without it.");
			cm.dispose();
}
}
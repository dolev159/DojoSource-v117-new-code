/*
	名字:	安德里亞
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
		if (status < 1) {
		cm.dispose();
		return;
		}
		if (status < 2) {
		cm.sendNext("I see...think about it a little more and if you want to do it, come talk to me.");
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
		cm.sendSimple("I'm Andres, Don's assistant. Everyone calls me Andre, though. If you have #b#t5150052##k or #b#t5151035##k, please let me change your hairdo ... \r\n#L0##bHaircut(REG coupon)#l\r\n#L1#Dye your hair(REG coupon)#l");
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
			hair = [30130, 30350, 30190, 30110, 30180, 30050, 30040, 30160, 30770, 30620, 30550, 30520];
		else
			hair = [31060, 31090, 31020, 31130, 31120, 31140, 31330, 31010, 31520, 31440, 31750, 31620];

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

		cm.sendYesNo("If you use a regular coupon your hair will change RANDOMLY. Do you still want to use #b#t5151035##k and change it up?");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5151035)) {
			cm.gainItem(5151035, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Ok, here's the mirror. Your new haircolor! What do you think? I know it wasn't the smoothest, but it still looks pretty good! Come back later when you need to change it up again!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...are you sure you have our designated coupon? Sorry but no dye your hair without it.");
			cm.dispose();
}
}
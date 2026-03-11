/*
	名字:	伯麗特
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
		cm.sendSimple("I'm Brittany the assistant. If you have #b#t5150052##k or #b#t5151035##k by any chance, then how about letting me change your hairdo? \r\n#L0##bHaircut(REG coupon)#l\r\n#L1#Dye your hair(REG coupon)#l");
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
			hair = [30310, 30330, 30060, 30150, 30410, 30210, 30140, 30120, 30200, 30560, 30510, 30610, 30470];
		else
			hair = [31150, 31310, 31300, 31160, 31100, 31410, 31030, 31080, 31070, 31610, 31350, 31510, 31740];

			hair = hair[Math.floor(Math.random() * hair.length)] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendYesNo("If you use the REG coupon your hair will change RANDQMLY with a chance to obtain a new experimental style that even you didn't think was possible. Are you going to use #b#t5150052##k and really change your hairstyle?");
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150052)) {
			cm.gainItem(5150052, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("Hey, here's the mirror. What do you think of your new haircut? I know it wasn't the smoothest of all, but didn't it come out pretty nice? Come back later when you need to change it up again!");
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
			cm.sendNext("Hey, here's the mirror. What do you think of your new haircolor? I know it wasn't the smoothest of all, but didn't it come out pretty nice? Come back later when you need to change it up again!");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm...are you sure you have our designated coupon? Sorry but no dye your hair without it.");
			cm.dispose();
}
}
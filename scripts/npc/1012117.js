/*
	名字:	大頭沃爾德
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
		cm.sendSimple("Hi, I'm Big Head Kingdom's Big Headward. If you have a #b#t5150040##k, why not let me take care of your hair? \r\n#L0##bChange Hairstyle (Royal Hair Coupon)#l");
		break;
	case 1:
		if (cm.getPlayer().getGender() < 1)
			hair = [30010, 30090, 30440, 32160, 33160, 33170, 33190, 33210, 33250, 33260, 33270, 33280, 33330, 33350, 33360];
		else
			hair = [31090, 31100, 31110, 31140, 31160, 31170, 31180, 31190, 31260, 31450, 31840, 31870, 31880, 31890, 31910, 31920, 31990, 32150, 34000, 34010, 34040, 34050, 34100];

			hair = hair[Math.floor(Math.random() * hair.length)] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendYesNo("When you use the Royal Hair Coupon, you get a new random hairdo. Are you sure you want to use #b#t5150040##k and change your hair?");
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5150040)) {
			cm.gainItem(5150040, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendNext("How do you like it? It's the latest style, known as #b#t" + hair + "##k. Oh my, you seriously look elegant and beautiful. Ha ha ha! Well, of course! l styled it after all! Come back whenever you need me. Heh heh.");
			cm.dispose();
			return;
			}
			cm.sendNext("Please bring me a #bRoyal Hair Coupon#k.");
			cm.dispose();
}
}
/*
	名字:	美麗護士
	地圖:	弓箭手村整容院
	描述:	100000103
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
		cm.sendSimple("Hello, my name is #p9201148# and I'm a plastic surgery specialist. You can undergo my special plastic surgery if you have a #bRoyal Face Coupon#k. \r\n#L0##bI'd love some special plastic surgery.");
		break;
	case 1:
		if (cm.getPlayer().getGender() < 1)
			face = [20032, 20045, 20050, 20053, 20346, 20230, 20247];
		else
			face = [21011, 21018, 21021, 21025, 21027, 21031, 21034, 21042, 21045, 21053, 21058];

			face = face[Math.floor(Math.random() * face.length)] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

			cm.sendYesNo("If you use a #bRoyal Face Coupon#k, I'll perform a special Royal plastic surgery on you. But no one knows what the results of the plastic surgery will be. It all depends on my mood. Hehehe. Shall we begin?");
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5152053)) {
			cm.gainItem(5152053, -1);
			cm.getPlayer().setFace(face);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face);
			cm.sendNext("#b#t" + face + "##k Do you like it? I think it looks fabulous! Come back and see me again soon!");
			cm.dispose();
			return;
			}
			cm.sendNext("If you to undergo the special plastic surgery I offer, please bring me a #bRoyal Face Coupon#k.");
			cm.dispose();
}
}
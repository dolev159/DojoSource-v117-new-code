/*
	名字:	圖特拉
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
		if (status < 1) {
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
		if (cm.getPlayer().getGender() < 1)
			face = [20018, 20019, 20000, 20001, 20003, 20004, 20005, 20006, 20008];
		else
			face = [21018, 21019, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21012];

			for (var i = 0; i < face.length; i++)
			face[i] = face[i] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

			cm.sendStyle("Ready to look like a million mesos? For #b#t5152057##k. I can guarantee you'll look like a new person!", face);
			break;
	case 1:
		if (cm.getPlayer().itemQuantity(5152057)) {
			cm.gainItem(5152057, -1);
			cm.getPlayer().setFace(face[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face[selection]);
			cm.sendNext("Ok, the surgery's over. See for it yourself.. What do you think? Quite fantastic, if I should say so myself. Please come again when you want another look, okay?");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
			cm.dispose();
}
}
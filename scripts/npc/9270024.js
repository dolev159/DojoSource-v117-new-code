/*
	名字:	凱爾文
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
			face = [20020, 20013, 20021, 20026, 20005, 20012];
		else
			face = [21021, 21011, 21009, 21025, 21006, 21012];

			for (var i = 0; i < face.length; i++)
			face[i] = face[i] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

			cm.sendStyle("Let's see...for #b#t5152057##k, you can get a new face. That's right. I can completely transform your face! Wanna give it a shot? Please consider your choice carefully.", face);
			break;
	case 1:
		if (cm.getPlayer().itemQuantity(5152057)) {
			cm.gainItem(5152057, -1);
			cm.getPlayer().setFace(face[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face[selection]);
			cm.sendNext("Alright, the procedure's done. Check it out, here's the mirror for you. What do you think? Even l admit this looks like a masterpiece ... hahah, well, give me a call once you get sick of that new look, alright?");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
			cm.dispose();
}
}
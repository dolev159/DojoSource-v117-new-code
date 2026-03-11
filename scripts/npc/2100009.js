/*
	名字:	亞丁
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
		cm.sendSimple("I'm Aldin of the Plastic Surgery assistance here! With #b#t5152056##k or #b#t5152048##k. you'll be awarded a random plastic surgery result/a random pair of cosmetic lenses for you. Now, what would you like to use? \r\n#L0##bPlastic Surgery at Ariant (REG coupon)#l\r\n#L1#Cosmetic Lenses at Ariant (REG coupon)#l");
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
			face = [20001, 20003, 20009, 20010, 20025, 20031];
		else
			face = [21002, 21009, 21011, 21013, 21016, 21029, 21030];

			face = face[Math.floor(Math.random() * face.length)] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

		if (cm.getPlayer().itemQuantity(5152056)) {
			cm.gainItem(5152056, -1);
			cm.getPlayer().setFace(face);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face);
			cm.sendNext("The surgery's complete. Don't you like it? I think it came out great!");
			cm.dispose();
			return;
			}
			cm.sendNext("Um ... it looks like you don't have the coupon specifically for this place...sorry to say this, but without the coupon, there's no plastic surgery for you.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		color = [100, 200, 300, 400, 500, 600, 700];

		teye = cm.getPlayer().getFace() % 100;

		teye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;

		color = color[Math.floor(Math.random() * color.length)] + teye;

		if (cm.getPlayer().itemQuantity(5152048)) {
			cm.gainItem(5152048, -1);
			cm.getPlayer().setFace(color);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, color);
			cm.sendNext("The surgery's complete. Don't you like it? I think it came out great!");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm sorry, but I don't think you have our cosmetic lens coupon with you right now. Without the coupon, I'm afraid I can't do it for you..");
			cm.dispose();
}
}
/*
	名字:	纱也加
	地圖:	昭和整形外科
	描述:	801000002
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
		cm.sendSimple("Hi, I pretty much shouldn't be doing this, but with a #b#t5152056##k or #b#t5152046##k, I will do it anyways for you. But don't forget, it will be random! Now, what would you like to use? \r\n#L0##bPlastic Surgery at Showa (REG coupon)#l\r\n#L1#Cosmetic Lenses at Showa (REG coupon)#l");
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
			face = [20000, 20016, 20019, 20020, 20021, 20024, 20026];
		else
			face = [21000, 21002, 21009, 21016, 21022, 21025, 21027];

			face = face[Math.floor(Math.random() * face.length)] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

		if (cm.getPlayer().itemQuantity(5152056)) {
			cm.gainItem(5152056, -1);
			cm.getPlayer().setFace(face);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face);
			cm.sendNext("Okay, the surgery's done. Here's a mirror--check it out. What a masterpiece, no? Haha! If you ever get tired of this look, please feel free to come visit me again.");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
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

		if (cm.getPlayer().itemQuantity(5152046)) {
			cm.gainItem(5152046, -1);
			cm.getPlayer().setFace(color);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, color);
			cm.sendNext("Here's the mirror. What do you think? I think they look tailor-made for you. I have to say, you look faaabulous. Please come again.");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm sorry, but I don't think you have our cosmetic lens coupon with you right now. Without the coupon, I'm afraid I can't do it for you..");
			cm.dispose();
}
}
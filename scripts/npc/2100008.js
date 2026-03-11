/*
	名字:	巴德魯
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
		cm.sendSimple("I'm in charge of the Plastic Surgery here at Ariant Shop! I believe your eyes are the most important feature in your body, and with #b#t5152057##k or #b#t5152047##k, I can prescribe the right kind of plastic surgery and cosmetic lenses for you. Now, what would you like to use? \r\n#L0##bPlastic Surgery at Ariant (VIP coupon)#l\r\n#L1#Cosmetic Lenses at Ariant (VIP coupon)#l");
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
			face = [20013, 20000, 20002, 20004, 20005, 20012];
		else
			face = [21009, 21000, 21002, 21003, 21006, 21012];

			for (var i = 0; i < face.length; i++)
			face[i] = face[i] + parseInt(cm.getPlayer().getFace() / 100 % 10) * 100;

			cm.sendStyle("Your face may be covered to combat the heat here in the desert, but truly beautiful faces seem to glow regardless. If you have #b#t5152057##k, I can assist you in uncovering your radiant potential. What do you say, shall we begin?", face);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5152057)) {
			cm.gainItem(5152057, -1);
			cm.getPlayer().setFace(face[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, face[selection]);
			cm.sendNext("Ok, the surgery's over. See for it yourself.. What do you think? Quite fantastic, if I should say so myself. Please come again when you want another look, okay?");
			cm.dispose();
			return;
			}
			cm.sendNext("Erm... You don't seem to have the exclusive coupon for this hospital. Without the coupon, I'm afraid I can't do it for you.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		color = [100, 200, 300, 400, 500, 600, 700];

		teye = cm.getPlayer().getFace() % 100;

		teye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;

		for (var i = 0; i < color.length; i++)
		color[i] = teye + color[i];

		cm.sendStyle("With our specialized machine, you can see the results of your potential treatment in advance. What kind of lens would you like to wear? Choose the style of your liking...", color);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5152047)) {
			cm.gainItem(5152047, -1);
			cm.getPlayer().setFace(color[selection]);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, color[selection]);
			cm.sendNext("Enjoy your new and improved cosmetic lenses!");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm sorry, but I don't think you have our cosmetic lens coupon with you right now. Without the coupon, I'm afraid I can't do it for you..");
			cm.dispose();
}
}
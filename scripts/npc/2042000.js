/*
	名字:	休彼德蔓
	地圖:	玩具城
	描述:	220000000
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
		cm.sendSimple("lf you're itching for some action, then the Monster Carnival is the place for you! \r\n\r\n#L0##bTell me more about the Monster Carnival.#l\r\n#L1#l want to trade in my Shiny Maple Coins.#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("The #bMonster Carnival#k is that magical place where you team up with others to obliterate hordes of monsters faster than the other folks. l send out invitations every #b15minutes and 45 minutes#k, because it's good, clean fun that everyone should try! If you're interested, don't miss out on my invitations!");
			cm.dispose();
			return;
			}
			cm.sendSimple("Ah, you've brought some Shiny Maple Coin. Which item do you want? \r\n\r\n#L0##b#v1122162:##t1122162# #r(#t4001254# 100 needed)#k#l\r\n#L1##b#v1102327:##t1102327# #r(#t4001254# 150 needed)#k#l");
			break;
	case 2:
		cm.dispose();
}
}
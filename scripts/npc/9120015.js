/*
	名字:	鈴木
	地圖:	昭和村
	描述:	801000000
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
		cm.sendSimple("What do you want? \r\n#L0##bTell me about the hideout.#l\r\n#L1#Take me to the hideout.#l\r\n#L2#End conversation.#l");
		break;
	case 1:
		if (selection == 0)
			cm.sendOk("I can take you to the hideout, but the place is crawling with thugs looking for trouble. Inside you'll also find the Yakuza Boss, who commands the underboss and all the lieutenants in the area. Getting into the hideout is the easy part, but you can only enter the room at the top floor ONCE a day. The boss's room is a no place to mess around. It's best you don't outstay your welcome. The big boss is a difficult foe, but the path to even reaching him will be filled with powerful enemies. You sure you can handle it?!");
		if (selection == 1)
			cm.sendNext("Oh, I've been waiting for you, hero. There's no turning back if we leave them alone. Before that happens, I would like you to use your power and teach the Yakuza Boss on the 5th floor a lesson. Don't let your guard down. Many strong people couldn't beat the Yakuza Boss, but l'm certain you can do it when I look into your eyes. Now go.");
		if (selection == 2)
			cm.sendOk("I don't have free time. Go back if you have no business.");
		if (selection != 1) {
			cm.dispose();
			}
			break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(801040000), cm.getMap(801040000).getPortal(0));
		cm.dispose();
}
}
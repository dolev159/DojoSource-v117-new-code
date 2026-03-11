/*
	名字:	Burke's Message
	地圖:	Burke's Message
	描述:	Burke's Message
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		im.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		im.sendNextS("#bThey know you're the only one who can activate the core. They know where you are. They know where you've been. You have to get out of there Now!", 4, 9270084);
		break;
	case 1:
		im.sendNextPrevS("What kind of cockeyed scheme is #r#p9270084##k running here? I'm gonna find that rooster-headed fool and settle this once and for all.", 16);
		break;
	case 2:
		im.dispose();
		im.gainItem(2430752, -1);
		Packages.server.quest.MapleQuest.getInstance(53250).forceStart(im.getPlayer(), im.getNpc(), 1);
}
}
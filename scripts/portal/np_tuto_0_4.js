/*
	名字:	Hidden Street
	地圖:	Space Station Hectare 2
	描述:	552000020
*/

function enter(pi) {
	pi.startportalScript("np_tuto_0_4");
	return true;
}

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		pi.dispose();
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
		pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		pi.sendNextS("Things are finally comin' up Burke. You just sit tight and things can go back to the way they used to be...", 5, 9270083);
		break;
	case 2:
		pi.dispose();
		pi.getPlayer().changeMap(pi.getMap(552000061), pi.getMap(552000061).getPortal(0));
}
}
/*
	名字:	微微安
	地圖:	維多利亞港
	描述:	104000000
*/

function start() {
	cm.sendSimple("What magical vision will the Crystal Ball offer today? \r\n\r\n#L0##bI would like to know about current events.#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.openUI(55));
		cm.dispose();
}
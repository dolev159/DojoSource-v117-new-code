/*
	名字:	神殿管理人
	地圖:	三扇門
	描述:	270000000
*/

function start() {
	cm.sendNextS("You are not allowed to enter here. \r\nThose without permission cannot change the flow of the temple and will be returned to their previous location.", 5);
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(cm.getPlayer().getMap().getId() -(Math.floor(cm.getPlayer().getMap().getId() % 1000) == 100 ? 100 : 90)), cm.getMap(cm.getPlayer().getMap().getId() -(Math.floor(cm.getPlayer().getMap().getId() % 1000) == 100 ? 100 : 90)).getPortal(0));
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Those without permission cannot change the flow of the temple, and will returned to their previous location."));
		cm.dispose();
}
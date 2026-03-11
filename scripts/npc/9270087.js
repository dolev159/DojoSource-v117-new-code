/*
	名字:	漢斯
	地圖:	Wrecked Airship 1
	描述:	552000030
*/

function start() {
	if (cm.getPlayer().getPosition().x  < -400  ||  cm.getPlayer().getPosition().x  > -150) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You are too far away. Try getting a bit closer."));
		cm.dispose();
		return;
		}
		cm.sendNextS("#bNever seen a Cerberus ship that could take a fall without turning into a death trap.", 16);
		cm.dispose();
}
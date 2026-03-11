/*
	名字:	漢斯
	地圖:	Wrecked Airship 1
	描述:	552000030
*/

function start() {
	if (cm.getPlayer().getPosition().x  < -200  ||  cm.getPlayer().getPosition().x  > 100) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You are too far away. Try getting a bit closer."));
		cm.dispose();
		return;
		}
		cm.sendNextS("#bThat ain't my core. That's a bunch of barrels.", 16);
		cm.dispose();
}
/*
	名字:	採礦機械
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
*/

function start() {
	if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
		cm.sendProfessionWindow();
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Only Miners can use this."));
		cm.dispose();
}
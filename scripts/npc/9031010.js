/*
	名字:	藥草採集鍋
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
*/

function start() {
	if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
		cm.sendProfessionWindow();
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Unavailable because you haven't learned Herbalism."));
		cm.dispose();
}
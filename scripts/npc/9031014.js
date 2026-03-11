/*
	名字:	煉金術魔法書
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
*/

function start() {
	if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.openUI(42));
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Only Alchemists can use this."));
		cm.dispose();
}
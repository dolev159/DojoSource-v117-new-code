/*
	名字:	卡羅賓
	地圖:	生命之穴入口
	描述:	240040700
*/

function start() {
	if (cm.getPlayer().getBuffSource(Packages.client.MapleBuffStat.MORPH) == 2210003 || cm.getPlayer().itemQuantity(4001086)) {
		cm.getPlayer().changeMap(cm.getMap(240050000), cm.getMap(240050000).getPortal(1));
		cm.dispose();
		return;
		}
		cm.sendOk("前面是米納爾森林最強的生物，闇黑龍王居住的洞穴，異族#b禁止通行#k。");
		cm.dispose();
}
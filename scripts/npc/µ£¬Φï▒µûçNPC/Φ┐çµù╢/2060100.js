/*
	名字:	卡勒塔
	地圖:	卡勒塔洞穴
	描述:	230040001
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6301)).getStatus() != 1) {
		cm.sendOk("想要窺視未來是愚蠢的行為…");
		cm.dispose();
		return;
		}
	if (!cm.getPlayer().itemQuantity(4000175)) {
		cm.sendOk("只有找到#b#z4000175##k，才可以打開扭曲的次元。");
		cm.dispose();
		return;
		}
	if (cm.getMap(923000000).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(6, "扭曲的次元目前擁擠，請稍後再試"));
		cm.dispose();
		return;
		}
		cm.gainItem(4000175, -1);
		cm.getPlayer().changeMap(cm.getMap(923000000), cm.getMap(923000000).getPortal(2));
		cm.getPlayer().startMapTimeLimitTask(1200, cm.getMap(230040001));
		cm.dispose();
}
/*
	名字:	燒毀的殘骸2
	地圖:	惡魔的老家
	描述:	924020000
*/

function start() {
	if (cm.getPlayer().getPosition().x < 412 || cm.getPlayer().getPosition().x > 612) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "It's too far away to see clearly. I must get closer."));
		cm.dispose();
		return;
		}
		cm.sendNextS("#bDamien! Answer me!", 16);
		Packages.server.quest.MapleQuest.getInstance(23201).forceComplete(cm.getPlayer(), cm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(23202).forceStart(cm.getPlayer(), cm.getNpc(), null);
		cm.dispose();
}
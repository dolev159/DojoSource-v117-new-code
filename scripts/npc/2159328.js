/*
	名字:	燒毀的殘骸1
	地圖:	惡魔的老家
	描述:	924020000
*/

function start() {
	if (cm.getPlayer().getPosition().x < 40 || cm.getPlayer().getPosition().x > 240) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "It's too far away to see clearly. I must get closer."));
		cm.dispose();
		return;
		}
		cm.sendNextS("#bMother! Where are you?!", 16);
		Packages.server.quest.MapleQuest.getInstance(23200).forceComplete(cm.getPlayer(), cm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(23201).forceStart(cm.getPlayer(), cm.getNpc(), null);
		cm.dispose();
}
/*
	名字:	隱藏地圖
	地圖:	惡魔的老家
	描述:	924020000
*/

function start() {
	ms.dispose();
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
	Packages.server.quest.MapleQuest.getInstance(23200).forceStart(ms.getPlayer(), ms.getNpc(), null);
	Packages.server.quest.MapleQuest.getInstance(23201).forfeit(ms.getPlayer());
	Packages.server.quest.MapleQuest.getInstance(23202).forfeit(ms.getPlayer());
}
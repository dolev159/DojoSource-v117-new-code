/*
	名字:	隱藏地圖
	地圖:	休菲凱曼畫廊
	描述:	956000000
*/

function start() {
	if (ms.getInfoQuest(1703)[0] != "d") {
		ms.getPlayer().updateInfoQuest(1703, "d=0000");
	}
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1710)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1711)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1712)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1713)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1714)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1715)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1716)).setStatus(0);


	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1720)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1721)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1722)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1723)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1724)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1725)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1726)).setStatus(0);

	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1730)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1731)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1732)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1733)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1734)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1735)).setStatus(0);

	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1740)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1741)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1742)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1743)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1744)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1745)).setStatus(0);
	ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1746)).setStatus(0);

	Packages.server.quest.MapleQuest.getInstance(1749).forceStart(ms.getPlayer(), ms.getNpc(), 0);

	//ms.getPlayer().updateQuest(ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1710)), true);
	ms.dispose();
}
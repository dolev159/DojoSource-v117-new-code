/*
	名字:	為了她的禮物2
	地圖:	宮殿後走廊
	描述:	956020000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendSimple("Have you come to have your eye sockets melted by the stunning light of my tremendous body? Ha! You're too lowly of a peon to really enjoy me. You had the pleasure of seeing my face, so leave! Unless... You wish to draw a portrait of me? Oh ho... Perhaps you are not so worthless after all! All right then, I will grant you permission to hew me in graphite! \r\n\r\n#L0##bDraw Areda's face as it is, detail by detail.#l\r\n#L1#Draw an abstract version so you don't throw up.#l\r\n#L2#Draw a portrait of a beautiful actress you saw on Maple TV.#l");
		break;
	case 1:
		if (selection == 1) {
			qm.sendNext("......");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			qm.gainItem(4033210, 1);
			Packages.server.quest.MapleQuest.getInstance(1721).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendNext("Are you finished already? I thought surely you would sun yourself in the light of my beauty for a little while longer. Be gone from my sights then. And don't bother showing me your rendition. I'm sure it could never match up with the real thing I see in the mirror every morning. Hohohoho!");
			break;
	case 2:
		qm.dispose();
}
}
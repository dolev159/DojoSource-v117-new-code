/*
	名字:	閣樓的藥水箱
	地圖:	雜貨商店閣樓
	描述:	913070010
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20031)).getStatus() != 1) {
		cm.sendOk("It doesn't look like you need my potions!");
		cm.dispose();
		return;
		}
	 if (cm.getPlayer().itemQuantity(4033194) || cm.getPlayer().itemQuantity(4033195)) {
		cm.sendOk("I'd better get back downstairs with the potion box before old-man Limber'ts heart finally explodes with rage.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("All these potions are disgusting! Should we even be selling them? \r\nTake the Potion Box?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNextS("This has gotta be the box...", 2);
		break;
	case 1:
		cm.gainItem(4033194, 1);
		cm.gainItem(4033195, 1);
		cm.sendNextS("Is this a letter? Must be held together by all the dust... \r\nFrom 'Chromile'... It doesn't say who it's for... Maybe Limbert will want it.", 2);
		}
		cm.dispose();
}
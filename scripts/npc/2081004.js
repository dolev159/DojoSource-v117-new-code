/*
	名字:	潘姆
	地圖:	潘姆之家
	描述:	240000006
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 1) {
		cm.dispose();
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20528)).getStatus() != 1) {
			cm.sendOk("Hmmm... baby formula? Don't you think you're past that age?");
			cm.dispose();
			return;
			}
			cm.sendSimple("You want me to make you my Concentrated Formula? Are you interested in raising a dragon as well? What? It's for a Mount? I don't understand what you're saying, but you just need the Concentrated Formula made, right? As long as you bring the ingredients, I'll concoct it for you. What kind of Formula would you like me to make? \r\n#L0##b#t4032196# = 30 #v4000236# + 30 #v4000237# + 30 #v4000238# + 9,000,000 mesos#l");
			break;
	case 1:
		if (cm.getPlayer().itemQuantity(4000236) < 30 || cm.getPlayer().itemQuantity(4000237) < 30 || cm.getPlayer().itemQuantity(4000238) < 30 || cm.getPlayer().getMeso() < 9000000) {
			cm.sendNext("I think you're short on ingredients.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Wait, hold on. Either you have way too many ingredients, or you're lacking some Mesos. Unfortunately, I can't give you #t4032196#.");
			cm.dispose();
			return;
			}
			cm.gainItem(4000236, -1);
			cm.gainItem(4000237, -1);
			cm.gainItem(4000238, -1);
			cm.gainMeso(-9000000);
			cm.gainItem(4032196, 1);
			cm.sendNext("Here's #t4032196#. Please put it to a good use.");
			cm.dispose();
}
}
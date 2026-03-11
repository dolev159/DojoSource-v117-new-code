/*
	名字:	Mr. Moneybags
	地圖:	魔法森林
	描述:	101000000
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
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		quest = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(93000)).getCustomData();
		reactor = 'action' + (quest == null ? 0 : quest == 9 ? 1 : (quest % 2) == 1 ? 2 : 3);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Happy Lunar New Year! May all your wishes come true in the Year of the Rabbit! 2010 was a great year for me. I have made a fortune selling weapons and recycled armors, and I am here to share the wealth with you, as my way of wishing you a great new year.");
		break;
	case 1:
		cm.sendYesNo("The monsters have eaten all of my empty #b#t4031249#s#k. Vile creatures! I desperately need these for New Year's to give to my family. I'll buy them from you for a random sum of mesos, depending on how much I grab in my pocket. So, do you want to make the trade?");
		break;
	case 2:
		cm.sendNext("Okay. Good luck! If you give me 5 #t4031249#s, you can receive a new clothes as well. Please help me!");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(93000).forceStart(cm.getPlayer(), 0, 0);
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Thank you so much for bringing 5 #t4031249#, you can get a new piece of clothes.");
		break;
	case 1:
		cm.sendSimple("Which one would you choose? \r\n" + (cm.getPlayer().getGender() < 1 ? "#L1050065# #v1050065#l\r\n#L1050066# #v1050066#l" : "#L1051050# #v1051050#l\r\n#L1051051# #v1051051#l") + "");
		break;
	case 2:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendNext("Sorry, but I'm having trouble placing items in your inventory. Please confirm with me later.");
			cm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(93000).forceStart(cm.getPlayer(), 0, 11);
			cm.gainItem(selection, 1);
			cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Hey, nice to see you again! How have you been? So, have you found more #b#t4031249##k for me? Would you like to make another trade?");
		break;
	case 1:
		cm.sendNext("Sweet. That sounds like good news. I'll be here waiting.");
		break;
	case 2:
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(93000)).setCustomData(parseInt(quest) + 1);
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().itemQuantity(4031249) < 1) {
			cm.sendNext("Are you Sure you have a #b#t4031249##k? I'll make you the best offer in town!");
			cm.dispose();
			return;
			}
			cm.sendNext("Here you go! Hope you have a great year. I'm still really short on #b#t4031249#s#k so bring them to me as you find them.");
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(93000)).setCustomData(parseInt(quest) + 1);
			cm.gainMeso(Math.random() * 10000);
			cm.gainItem(4031249, -1);
			cm.dispose();
}
}
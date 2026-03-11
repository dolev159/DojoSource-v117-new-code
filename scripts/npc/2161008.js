/*
	名字:	凡雷恩
	地圖:	陰鬱的見面室
	描述:	921140001
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
		if (status == 8) {
		cm.sendNext("Are you avoiding me? So be it...");
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
		if (cm.getPlayer().itemQuantity(4032839)) {
			cm.getPlayer().changeMap(cm.getMap(211061001), cm.getMap(211061001).getPortal(1));
			cm.dispose();
			return;
			}
			cm.sendNext("How did you... How did you know about this passage? Only Ifia and I ever knew. I suppose next, you'll try to tell me SHE told you.");
			break;
	case 1:
		cm.sendNextPrevS("Ask her yourself.", 2);
		break;
	case 2:
		cm.sendNextPrevS("Leon, can't you see me? Can't you hear my voice?",4 , 2161009);
		break;
	case 3:
		cm.sendNextPrev("What are you talking about?! Where is she? Is this some kind of joke?");
		break;
	case 4:
		cm.sendNextPrevS("Can't you hear her? ...Why not? Why can't you hear her voice?", 2);
		break;
	case 5:
		cm.sendNextPrev("You... look as though you speak the truth. Perhaps she IS here. Perhaps she's talking to me as we speak. But... it doesn't matter now. I'll never be worthy of her again.");
		break;
	case 6:
		cm.sendNextPrevS("Why would you say that?",4 , 2161009);
		break;
	case 7:
		cm.sendNextPrev("Because... my soul belongs to the Black Mage... and there is blood on my hands because of it. Perhaps that's why I can't hear her voice. Is that the price of all my sins...?");
		break;
	case 8:
		cm.sendYesNo("You who can hear Ifia. Take this.");
		break;
	case 9:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("You have no space left for this...");
			cm.dispose();
			return;
			}
			cm.gainItem(4032839, 1);
			cm.sendNextPrev("That pendant contains a picture of Ifia, painted by a royal artist long ago. Through it, I have remembered her, but it no longer belongs with me.");
			break;
	case 10:
		cm.sendNextPrev("My soul has long since burned away in the flames of my revenge. Now, with even those flames gone...I have nothing left. I don't deserve to remember her.");
		break;
	case 11:
		cm.sendNextPrev("If I could turn back time and choose again... I've asked myself such questions countless times... but I fear the answers. Any choice I could have made would have to come to nothing in the end.");
		break;
	case 12:
		cm.sendNextPrev("Go away. I am in no mood for you.");
		break;
	case 13:
		cm.getPlayer().changeMap(cm.getMap(211061001), cm.getMap(211061001).getPortal(1));
		cm.dispose();
}
}
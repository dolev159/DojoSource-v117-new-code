/* 	Cody
*/

function start() {
if (cm.getPlayer().getLevel() >= 120) {
	if (cm.getPlayer().haveItem(4001126, 200))
    cm.sendOk("#eStage 1:#k Get #i 4001126# (200) - Status: #gV#k\r\n\r\n#rGreat!#k now you must buy this #i 4001168# (1) .\r\n#bCost:#k 500,000 mesos.\r\n#L0#I want to pay for this.");
else
  cm.sendOk("#eHey #r#h0##k, I heard you want to earn some empress points? Well.. don't be shy.\r\nFor try get some points you must be level 120 at least.\r\n\r\n#bStage 1:#k Give me #i 4001126# (200) - Status: #rX#k\r\n\r\n\r\n#bWhat are status lines?\r\n#rX#k - mission didn't complete yet.\r\n#gV#k - mission completed successfully.");
} else {
	cm.sendOk("You must be level 120 at least for using me");
	cm.dispose();
}
}

function action(mode, type, selection) {
	if (selection == 0)
		if (cm.getPlayer().getMeso() >= 500000) {
		cm.dispose();
  		cm.sendOk("#e#bStage 2:#k Get 500,000 meso - Status: #gV#k\r\n\r\n#rThank you for paying me.#k\r\nMeso left: #b" + cm.getMeso() + "#k\r\n\r\nI gave you 1 piece of #bGolden Maple Leaf#k - please talk to the #rEP#k Man by type @empress.");
		cm.gainItem(4001168, 1);
		cm.gainMeso(-500000);
		cm.gainItem(4001126, -200);
	} else
		cm.sendOk("#e#bStage 2:#k Get 500,000 meso - Status: #rX#k\r\n\r\n#rPlease get this amount of mesos.#k");
		cm.dispose();

}	
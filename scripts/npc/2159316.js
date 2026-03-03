//By Blake
//Starting Npc - Sera
function start() {
cm.sendOk("#bHey, You found me!\r\n#rAndy#k #btold me you're coming for get this - #i 4251202#.\r\nYou sure?#k\r\n\r\n#L0#Yes.#l");

}

function action(mode, type, selection) {
	if (selection == 0) {
	cm.sendOk("#bThat's not so simple, I want somthing for this.\r\nGive me these items:\r\n\r\n#r> #i 4020004# (1)#k#b - You can get it from jump quest as a randomal prize or make one in kerning. Else, you can kill monsters and earn one.#k\r\n\r\n#r> #i 4310025# (20)#k \r\n\r\n#L1# I got the items, please bring me the #i 4251202# now.");
}
         if (selection == 1) {
		if (cm.haveItem(4020004, 1)) {
		cm.gainItem(4020004, -1);
		cm.gainItem(4310025, -20);
		cm.gainItem(4251202, 1);
		cm.dispose();
		cm.warp(240070000, 0);
		cm.sendSimple ("Great, thank you for items.\r\nYou can go to #rAndy#k and let him get some power with his new crystal.");

} else if (cm.haveItem(4020004, 0))
		cm.sendSimple ("You don't have #i 4020004# OR enough #i 4310025#.");
		cm.dispose();


}
}
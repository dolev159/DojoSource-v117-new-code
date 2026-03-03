function start() {
    cm.sendSimple("#eI am the Android creator.\r\nWith my help you can make your own Android-doll partner. \r\nFor that, you must bring - 1 piece of #i 4032329#.\r\nIt's not simple, so get ready for that.\r\n\r\n#rChoose one of the options:#k #b\r\n#L0##bI want to begin.#l\r\n#L1#I have everything for make the Android#l\r\n#L2#Android styler#l");

}

function action(mode, type, selection) {
    if (mode == 1) {
        if (selection == 0)
            cm.warp(109090100, 1);
        else if (selection == 1)
	if (cm.haveItem(4032329, 1)) {
		 cm.gainItem(4032329, -1);
   		 cm.openShopNPC(3150);
  		 cm.dispose();

}


	else 
		cm.sendOk("You do not have a piece of #i 4032329#. Try again later.");
		cm.dispose();
}
	 if (selection == 2) {
  		 cm.dispose();
	   	cm.openNpc(1012123);

}
}

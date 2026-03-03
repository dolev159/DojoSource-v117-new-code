//By Blake
//Starting Npc - Sera
function start() {
cm.sendSimple ("#i 3991002##i 3991011##i 3991014##i 3991020##i 3991003##i 3991038##i 3991044#\r\n\r\n#rHey#k #b#h ##k, #rI heard that you want to meet a new friend.\r\nYes, I ment the Android-doll which follow you any place you're going to. For pick your one,  must have these conditions:#k\r\n\r\n#b* Level 100+\r\n* Job is not begginer. (Adventure or else)#k\r\n\r\nSo, What are you gonna do?\r\n#L0##bI agree and want to begin.#l\r\n#L1#I can't do it now, get me back please.#k#l");
}

function action(mode, type, selection) {
	if (selection == 0) {
           if (cm.getPlayer().getLevel() <= 99) { 
	cm.warp(910000000, 0);
	cm.dispose();
	cm.sendOk("Too bad, you can not do it.\r\nCome back later.");
	}  else if (cm.getPlayer().getJob() == 000) {
	cm.warp(910000000, 0);
	cm.dispose();
	cm.sendOk("Too bad, you can not do it.\r\nCome back later.");
	} else {
	cm.warp(240070000, 0);
	cm.dispose();
	cm.sendOk("#bWe are on our way to get your Android friend.\r\nTalk to#k #rAndy#k, #bhe'll tutorial you for what you're gonna do now.\r\nGet luck with your friend!#k");
}

        } else if (selection == 1) {
	cm.warp(910000000, 0);
	cm.dispose();
	cm.sendOk("Too bad, you can not do it.\r\nCome back later.");

    }
}
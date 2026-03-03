/*
	Encrypted Slate of the Squad - Leafre Cave of life
*/

var status;

function start() {
status = -1;
action(1, 0, 0);
}

function action(mode, type, selection) {

if (mode == -1) {
cm.dispose();
}
else {
if (status == 0 && mode == 0) {
cm.dispose();
return;
    }
}

if (mode == 1) 
   status++;

else 
   status--;
    if (status == 0) { 
	cm.sendSimple("Hello #h #, Choose one PQ / quest from the list:  #b\r\n#L0##b1) #k Jumping Quest  >#L1#Exchange Jumping Quest rewards#l\r\n#L2##b2) #kBoss PQ (Easy, Normal, Hard, Hell) - #bParty must#l\r\n#L3##b3) #kKenta PQ - #bParty must#l\r\n#L4##b4) #kMonster Park PQ's (Talk to Spiegelmann) - #bParty must#l\r\n#L5##b5) #kMu Long Dojo Pq#l");
	}
	else if (status == 1) {
	if (selection == 0) {
	cm.dispose();
		cm.openNpc(9010009);;
	} else if (selection == 1) {
		cm.dispose();
		cm.openNpc(9201042);
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(9250133);
	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(9020003);
	} else if (selection == 4) {
		cm.warp(951000000, 0);
		cm.dispose();
	} else if (selection == 5) {
		cm.warp(925020000, 0);
		cm.dispose();
	}
}
}
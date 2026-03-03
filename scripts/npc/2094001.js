importPackage(net.sf.odinms.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("Alright, see you next time.");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		}
		else {
			status--;
		}
		if (status == 0) {
			if (!cm.haveItem(5220001)) {
				cm.gainItem(4310025, 5);
				cm.gainExp(30000);
				cm.warp(910000000, 0);
				cm.dispose();
				cm.sendOk("Sorry.. You must get #i 5220001# (1) for get a random item.\r\nI gave you #b5#k pieces of #b7th anniversary coins#k as a second present.\r\n\r\nYou have recived #b30,000#k experience too.");
				
			}
			else {
				var rand = 1 + Math.floor(Math.random() * 21);
				if (rand == 1) {
					cm.gainItem(2430000, 3); // GM Event Sack 1
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 2) {
					cm.gainItem(4310025, 10); // GM Event Sack 2
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 3) {
					cm.gainItem(4310025, 5); // GM Event Sack 3
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 4) {
					cm.gainItem(2000005, 150); // 
					cm.gainItem(5220001, -1); // 
				}
				else if (rand == 5) {
					cm.gainItem(5062001, 3); // GM Event Sack 5
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 6) {
					cm.gainItem(2022179, 5); //
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 7) {
					cm.gainItem(2040513, 2); // GM Event Sack 7
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 8) {
					cm.gainItem(2040506, 1); //
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 9) {
					cm.gainItem(2043120, 1); // Monster Sack 1
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 10) {
					cm.gainItem(2450043, 1); // Monster Sack 2
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 11) {
					cm.gainItem(2100003, 1); // Monster Sack 3
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 12) {
					cm.gainItem(2100004, 1); // Monster Sack 4
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 13) {
					cm.gainItem(2100005, 1); // Monster Sack 5
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 14) {
					cm.gainItem(2100006, 1); // Monster Sack 6
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 15) {
					cm.gainItem(2100007, 1); // Monster Sack 7
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 16) {
					cm.gainItem(2101013, 1); // Summon Showa Boss
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 17) {
					cm.gainItem(2100013, 1); // Summoning Dark Lord's Clone
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 18) {
					cm.gainItem(2100012, 1); // Summoning Athena Pierce's Clone
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 19) {
					cm.gainItem(2101000, 1); // Summon Mushmom
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 20) {
					cm.gainItem(2100011, 1); // Summoning Grendel the Really Old's Clone
					cm.gainItem(5220001, -1); // Event Ticket
				}
				else if (rand == 21) {
					cm.gainItem(2100010, 1); // Summoning Dances with Balrog's Clone
					cm.gainItem(5220001, -1); // Event Ticket
				}
				cm.warp(910000000, 0);
			        cm.gainExp(30000);
				cm.dispose();
				cm.sendOk("Hello #h #, I gave you random Item for the #b#i 5220001##k which you got from the pq boss.\r\nLets see which random item I gave you.\r\n\r\nYou have recived #b30,000#k experience too.");
			}
			cm.dispose();	
		}
	}
}
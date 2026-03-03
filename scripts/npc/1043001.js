/**
-- Odin JavaScript --------------------------------------------------------------------------------
	A Pile of Herbs - The Forest of Patience <Step 5> (101000104)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
*/

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
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
	cm.sendOk("Very nice #h#, You finished the last stage of jump quests! \r\nYou get these list of prizes:\r\n1) #i 4310025# (6)\r\n2) #b100,000 Mesos#k\r\n3) #b6 Jump quest points #k");
	cm.gainItem(4032024, -1);
	cm.gainItem(4310025, 6);
        cm.gainMeso(100000);
 	cm.gainJQPoints(6);
	cm.warp(101000000, 0);
    }
	cm.dispose();

}
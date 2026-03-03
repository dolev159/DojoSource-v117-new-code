/* NPC : A pile of pink flower
 * Location : Sleepywood, forest of patient
 */

var itemSet = new Array(4010003, 4010000, 4010002, 4010005, 4010004, 4010001);
var rand = Math.floor(Math.random() * itemSet.length);


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 2 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1) {
	status++;

    } else {
	status--;
    }
    if (status == 0) {
	cm.gainItem(4032024, -1);
	cm.warp(105000000);
        cm.gainMeso(20000);
	cm.gainItem(4310025, 4);
 	cm.gainJQPoints(2);
	cm.dispose();
    }
}
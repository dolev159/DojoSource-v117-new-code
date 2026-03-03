/**
	A Pile of Flowers - The Forest of Patience <Step 2> (101000101)
**/

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
	
	cm.sendOk("Talk to him which under me.");
	cm.dispose();

    }
}	


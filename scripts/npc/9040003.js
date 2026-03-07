/* 
 * Sharen III's Soul, Sharenian: Sharen III's Grave (990000700)
 * Guild Quest - end of stage 4
 */

var status = -1;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
	status++;
    else {
	cm.dispose();
	return;
    }

    if (status == 0) {
	if (cm.getEventInstance().getProperty("leader").equals(cm.getPlayer().getName())) {
	    if (Packages.server.MaplePQManager.checkGPQStage4(cm.getPlayer())) {
		cm.sendOk("After what I thought would be an immortal sleep, I have finally found someone that will save Sharenian. I can truly rest in peace now.");
		cm.safeDispose();
	    } else {
		cm.sendNext("After what I thought would be an immortal sleep, I have finally found someone that will save Sharenian. This old man will now pave the way for you to finish the quest.");
	    }
	} else {
	    if (Packages.server.MaplePQManager.checkGPQStage4(cm.getPlayer()))
		cm.sendOk("After what I thought would be an immortal sleep, I have finally found someone that will save Sharenian. I can truly rest in peace now.");
	    else
		cm.sendOk("I need the leader of your party to speak with me, nobody else.");
	    cm.safeDispose();
	}
    } else if (status == 1) {
	Packages.server.MaplePQManager.completeGPQStage4(cm.getPlayer());
	cm.gainGP(180);
	cm.dispose();
    }
}
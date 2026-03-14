/*
	NPC Name: 		Pudin
	Map(s): 		Rien: Cold Forest 1
	Description: 	Quest 21010 NPC
*/

var status = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status == 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	
	if (cm.getQuestStatus(21010) == 0) {
		cm.startQuest(21010);
	} else if (cm.getQuestStatus(21010) == 1) {
		cm.completeQuest(21010);
	} else {
		cm.sendOk("The hero has returned! It's such an honor to meet you in person!");
		cm.dispose();
	}
}
/*
	名字:	哈姆梅爾
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNext("Interested in Professions, eh? Let me give you a brief introduction. Our town is home to five master artisans who practice #bHerbalism, Mining, Smithing, Accessory Crafting, and Alchemy#k.");
		break;
	case 1:
		cm.sendNextPrev("There are two kinds of Harvesting - Herbalism and Mining. You can learn those skills from Saffron and Cole.");
		break;
	case 2:
		cm.sendNextPrev("There are three kinds of Production - Smithing, Accessory Crafting, and Alchemy. You can learn those from Gere, Intaglio, and Ally.");
		break;
	case 3:
		cm.sendNextPrev("Note that you need the Mining skill to learn Smithing and Accessory Crafting, and the Herbalism skill to learn Alchemy.");
		break;
	case 4:
		cm.dispose();
}
}
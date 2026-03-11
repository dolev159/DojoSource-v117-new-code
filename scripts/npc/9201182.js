/*
	名字:	波
	地圖:	維多利亞港
	描述:	104000000
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
		if (status < 1) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendSimple("I'm Bo! I'm the world's greatest expert on Blacksmithing. I'm also the world's greatest expert on alien technology. I'm ALSO the world's ONLY expert on alien blacksmithing technology! I tell you what, I'm going to be RICH with this new discovery! I call them Sockets! l just install a socket on normal everyday things and then l infuse them with these pieces of Nebulite and... \r\n#L0##bSockets? What are you taking about?#l\r\n#L1#What the heck is a Nebulite?#l\r\n#L2#I like sockets! I want some sockets! Give them to me!#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Using this crazy piece of alien hardware I rigged up, any item can have a socket installed! It's basically just a little slot where you can stick special alien stones called 'Nebulite'. The aliens use them for power, but you can use them to give special stats to your gear! They don't do anything if they're just sitting in your pocket, but stick them into an equipment socket and you'll harness the power of space!");
		break;
	case 2:
		cm.sendNextPrev("Unfortunately, our normal equipment isn't really made to utilize alien power. That's where my Alien Socket Wrench comes in! I install a socket, you get that sweet intergalactic power. Now I've only figured out how to make one socket on a piece of equipment so far, but I'm working hard to fit a second without breaking my wrench. The research is nearly complete, I promise!");
		break;
	case 3:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Nebulites are tiny stones the aliens dropped when they invaded Maple World. They seem to use them as a sort of power source. Monsters all over have been carrying them around for some reason. I guess they like shiny things! \r\n\r\nThe area around #b#m600000000##k has some of the best Nebulite chunks I've found so far. I think #b#p9201050##k there has some really primo pieces, but he's not the kind of guy to give handouts.");
		break;
	case 2:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("I can install sockets on your equipments for free untill the next patch. You better hurry because I'm not going to do the same after the patch!");
		break;
	case 2:
		cm.dispose();
}
}
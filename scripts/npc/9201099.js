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
	cm.sendSimple("Hello #h #, my name is Mo.\r\nI'll answer tou your all questions, choose one: #b\r\n#L0##b1) #kWhat are the rules of CloudMS?#l\r\n#L2##b2) #kWhat are the commands for me?#l\r\n#L3##b3) #kHow can I do PQ?#l\r\n#L4##b4) #kWho are CloudMS's Owner?#l\r\n#L5##b5) #kWhat is server's website url?#l");
	}
	else if (status == 1) {
	if (selection == 0) {
	cm.sendSimple("#b1. #rAny user must respect all staff members; threatening, harassing, cursing, or any verbal insult towards staff members is a top offence. \r\n\r\n\#b2.#r Any user who was caught with any unauthorized 3rd party programs that directly/indirectly interfere with the game play of the server which allows the user to gain an advantage in anyway will result in a ban. \r\n\r\n\#b3. #rCloudMS#r carries no responsibility of your account's security, if you give out your password; you are putting your account in jeopardy of being stolen. \r\n\r\n\#b4. #rYou obey the game rules, found on our website at the rules page; caught breaking any rule may result in any sort of penalty. \r\n\r\n\#b5. #rIn any case of any user's access being removed from the server; staff members have the right to restore or not to restore anyone's account/data of their free will. \r\n");
		cm.dispose();
	} else if (selection == 2) {
	cm.sendSimple("#bThere is a list of your commands:#k\r\n\r\n#r@str / dex / int / luk [amount] - Adds the amount of stats.\r\n@check - Checks your information.\r\n@check [name] - Checks for any character imformation.\r\n@monster - Displays the closest monster information wich closest to you.\r\n@monsterdrops - Checks the close monster's drop information.\r\n@apbank - Shows more information about the ability points bank.\r\n@uptime - Checks server uptime.\r\n@dispose - Helps to unstuck your character.\r\n@codex - Fixes the annoying codex in new tab. [Use the cards]\r\n@resetexp - Reset your exp to 0. [Use it only when necessary]\r\n@expfix - Fix your exp when it is stucked. [Use it only when necessary]\r\n@leet - Toggles leet chat to on / off mode for 500 mesos each time.\r\n@message [message] - Messages a CloudMS staff with your enquires.\r\n@chalk [message] - Displays text on a chalkboard that you input.\r\n@smega - Toggles super megaphone to on / off mode.\r\n@event - Join an event if there's one.\r\n@go [m	ap] - Go to the map that you requested.\r\n@npc - Shows the lists of NPC that are available while using command.\r\n@town - Shows the list of Town maps that are available.\r\n@mob - Shows the list of Monster maps that are available.\r\n@boss - Shows the list of Boss maps that are available.\r\n@misc - Shows the list of miscellaneous maps that are available.");
		cm.dispose();
	} else if (selection == 3) {
	cm.sendSimple("#bFor begin some PQ's, go to the NPC PQ's map by @go pq.\r\n[Party must]");
		cm.dispose();
	} else if (selection == 4) {
	cm.sendSimple("#bOwners list: #k\r\n\r\n\r\n#i 1002140# Almog\r\n\r\n#i 1002140# Adir");
		cm.dispose();
	} else if (selection == 5) {
	cm.sendSimple("#bCloudMS website - Maplestory.co.il.\r\nOur website was a generely portal for Maplestory for few years, probably, we turned it off.");
		cm.dispose();
	}
}
}
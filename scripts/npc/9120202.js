/*
	名字:	鈴木
	地圖:	基地內部
	描述:	801040100
*/

function start() {
	if (cm.getPlayer().itemQuantity(4000141))
		cm.sendNext("Th-that lantern! You really defeated the boss...? You...! Wow, I don't know what to say... Let's just get the heck out of here!");
	else
		cm.sendYesNo("Once you take down the Yakuza Boss, I'll want his lantern as proof. I can't believe you without proof, right? What...? You want to leave this room?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOk("I'm in awe of your resilience. Well, talk to me again if you want to return to Showa Town.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(cm.getPlayer().itemQuantity(4000138) ? 801040101 : 801040000), cm.getMap(cm.getPlayer().itemQuantity(4000138) ? 801040101 : 801040000).getPortal(0));
		}
		cm.dispose();
}
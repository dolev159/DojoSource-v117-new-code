/*
	名字:	俊伊
	地圖:	7層8層 A區域
	描述:	103040400
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
		cm.sendSimple("Hold up! Access to this area is limited due to remodeling. I can only allow people who meet certain conditions to enter here. \r\n#L0##bI'm helping #eBlake#n right now.#l\r\n#L1#I'm a #rVIP#b at this Shopping Center!#l");
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2286)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2287)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2288)).getStatus() == 1) {
			var em = cm.getEventManager("KerningSquare");
			var prop = cm.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer());
			cm.dispose();
			return;
			}
			cm.sendOk("Uh... It looks like the rooms ahead are a bit crowded right now. Please wait around here for a bit, ok?");
			cm.dispose();
			return;
			}
			cm.sendOk("I did not hear anything from Blake that you are assisting him.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Oh! Is that right? I apologize for my horrible memory. But you know, even for VIPs, you have to collect #b10 VIP Invitations#k in order for me to let you in. As you're probably aware, the VIP Zone has been created for people like you, #b#h0##k, to enjoy a pleasant environment for shopping and hunting. And...nevermind, I'm talking way too much.");
		break;
	case 2:
		cm.sendPrev("In any case, if you would like to enter the VIP Zone, please complete the #bAdmission to the VIP Zone#k quest. Once it's competed, I will let you enter Kerning Square's main attraction, the VIP Zone."); 
		break;
	case 3:
		cm.dispose();
}
}
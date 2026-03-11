/*
	名字:	Claudia
	地圖:	結婚小鎮
	描述:	680000000
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
		if (status < 2) {
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(8860)).getStatus() > 1 && cm.getPlayer().itemQuantity(4031528) < 1) {
			cm.sendNext("I've already done your hair once as a trade-for-services, sport. You'll have to snag an EXP Hair coupon from the Cash Shop if you want to change it again!");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getGender() < 1)
			hair = [30270, 30240, 30020, 30000, 30132, 30192, 30032, 30112, 30162];
		else
			hair = [31150, 31250, 31310, 31050, 31050, 31030, 31070, 31091, 31001];

			hair = hair[Math.floor(Math.random() * hair.length)] + parseInt(cm.getPlayer().getHair() % 10);

			cm.sendYesNo("Ready for an awesome hairdo? I think you are! Just say the word, and we'll get started!");
			break;
	case 1:
		cm.sendNext("Here we go!");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(4031528)) {
			cm.gainItem(4031528, -1);
			cm.getPlayer().setHair(hair);
			cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, hair);
			cm.sendOk("Not bad, if I do say so myself! I knew those books I studied would come in handy...");
			cm.dispose();
			return;
			}
			cm.sendOk("Hmmm...are you sure you have our designated free coupon? Sorry but no haircut without it.");
			cm.dispose();
}
}
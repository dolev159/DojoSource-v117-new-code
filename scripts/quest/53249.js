/*
	名字:	Suspicious Letter
	地圖:	鯨魚號碼頭
	描述:	120000000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53249)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(53249).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Are you gonna go to ground and find Burk-- I mean the fella who sent the letter that I haven't read?");
			break;
	case 1:
      		qm.sendNextPrevS("Do you think you can find him if I let you read it?", 2);
		break;
	case 2:
      		qm.sendNextPrev("Me? Nah, I'm about useless! But that roaming alchemist who left it here might know.");
		break;
	case 3:
      		qm.sendNextPrevS("(#b#p2040050##k? I'm right on your tail, #r#p9270084##k.)", 2);
		break;
	case 4:
      		qm.sendNextPrev("#b#p2040050##k said he was settin' sail for #r#m240000000##k, or whatever you landlubbers call it when you wander over to a place.");
		break;
	case 5:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(53249).forceComplete(qm.getPlayer(), qm.getNpc());
}
}
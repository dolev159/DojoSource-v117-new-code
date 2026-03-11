/*
	名字:	阿杜比斯
	地圖:	殘暴炎魔祭壇入口
	描述:	211042400
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
		cm.sendSimple("#e<Zakum Expedition: " + (cm.getPlayer().getMap().getId() == 211042400 ? "Normal" : "Chaos") + " Mode>#n \r\nZakum has resurrected again. If someone doesn't do something, he will cause a volcanic explosion and the entire EI Nath mountain will become a blazing inferno! \r\n\r\n#L0##bRequest to join the Zakum Expedition.");
		break;
	case 1:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("The party leader must choose to enter.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().itemQuantity(4001017) < 1) {
			cm.sendOk("You don't seem to have the material required to summon Zakum.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (cm.getPlayer().getMap().getId() == 211042400 && party.get(i).getMapid() != 211042400 || cm.getPlayer().getMap().getId() == 211042401 && party.get(i).getMapid() != 211042401) {
			cm.sendNext("All party members must be on the same map to enter.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (cm.getPlayer().getMap().getCharacterById(party.get(i).getId()).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1306)).getCustomData() > 0) {
			cm.sendOk("One or more of your party members have already cleared Zakum Normal Mode or Chaos Mode. You can only clear Zakum Normal Mode or Chaos Mode once a day.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager(cm.getPlayer().getMap().getId() == 211042400 ? "ZakumBattle" : "ChaosZakum");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Another party is already inside.");
			cm.dispose();
}
}
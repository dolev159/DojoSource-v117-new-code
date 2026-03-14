/*
	名字:	隱藏地圖
	地圖:	蒙特鳩祕密之室
	描述:	261000011
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("Romeo");

	eim.setInstanceMap(926100000).resetFully();
	eim.setInstanceMap(926100001).resetFully();
	eim.setInstanceMap(926100100).resetFully();
	eim.setInstanceMap(926100200).resetFully();
	eim.setInstanceMap(926100201).resetFully();
	eim.setInstanceMap(926100202).resetFully();
	eim.setInstanceMap(926100203).resetFully();
	eim.setInstanceMap(926100300).resetFully();
	eim.setInstanceMap(926100301).resetFully();
	eim.setInstanceMap(926100302).resetFully();
	eim.setInstanceMap(926100303).resetFully();
	eim.setInstanceMap(926100304).resetFully();
	eim.setInstanceMap(926100400).resetFully();
	eim.setInstanceMap(926100401).resetFully();
	eim.setInstanceMap(926100500).resetFully();
	eim.setInstanceMap(926100600).resetFully();

	eim.setInstanceMap(926100203).spawnNpc(2112000, new java.awt.Point(240, 243));
	eim.setInstanceMap(926100401).spawnNpc(2112000, new java.awt.Point(200, 100));

	eim.setInstanceMap(926100600).spawnNpc(2112005, new java.awt.Point(290, 100));
	eim.setInstanceMap(926100600).spawnNpc(2112006, new java.awt.Point(340, 100));

	eim.startEventTimer(20 * 60 * 1000); //30 mins

	return eim;
}


function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(926100000), eim.getMapInstance(926100000).getPortal(0));
	player.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2112004, 0, "This is the lab where rumors are abound that a suspicious noise can be heard from here every night. If there's anything hidden in here, it has to be in this place. Please look thoroughly into this lab.", "00 00", 0));
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getMap().getId() == 926100001 && mob.getMap().getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(926100001).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(926100001).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		}
	if (mob.getId() == 9300139 || mob.getId() == 9300140) {

		eim.getMapInstance(926100401).killMonster(9300137);
		eim.getMapInstance(926100401).killMonster(9300150);
		eim.getMapInstance(926100401).killMonster(9300150);

		eim.getMapInstance(926100401).setSpawns(false);//限制刷怪

		eim.getMapInstance(926100401).spawnNpc(2112006, new java.awt.Point(-20, 100));
		eim.getMapInstance(926100401).spawnNpc(2112005, new java.awt.Point(40, 100));

		eim.getMapInstance(926100401).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(926100401).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(926100401).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Successfully saved Juliet."));

		player.gainExp(player.getLevel() * 3000, true, true, true);
	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1205)).getStatus() < 2) {
		Packages.server.quest.MapleQuest.getInstance(1205).forceComplete(player, 0);
		player.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1205));
		}
		}
	if (mob.getId() == 9300137) {
		eim.disposeIfPlayerBelow(100, 926100700);
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 926100700);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 926100000 || mapid > 926100600) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	player.changeMap(eim.getMapInstance(926100700), eim.getMapInstance(926100700).getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 926100700);
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	if (eim.disposeIfPlayerBelow(0, 0)) {
		em.setProperty("state", 0);
}
}

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件
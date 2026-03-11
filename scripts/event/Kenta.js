/*
	名字:	隱藏地圖
	地圖:	危險之海岔道&amp;lt;準備室&gt;
	描述:	923040000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("Kenta");

	eim.setInstanceMap(923040100).resetFully();
	eim.setInstanceMap(923040200).resetFully();

	//設定順序不能修改
	eim.setInstanceMap(923040300).resetFully(false);
	eim.setInstanceMap(923040300).spawnMonsterOnGroundBelow(em.getMonster(9300460), new java.awt.Point(0, 620));
	eim.setInstanceMap(923040300).setSpawns(false);

	eim.setInstanceMap(923040400).resetFully();
	eim.setInstanceMap(923040400).spawnNpc(9020004, new java.awt.Point(-161, 123));
	eim.setInstanceMap(923040400).spawnMonsterOnGroundBelow(em.getMonster(9300461), new java.awt.Point(400, 123));
	eim.setInstanceMap(923040400).spawnMonsterOnGroundBelow(em.getMonster(9300468), new java.awt.Point(-1000, 123));

	eim.startEventTimer(20 * 60 * 1000); //20 mins

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(923040100), eim.getMapInstance(923040100).getPortal(0));
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if ((mob.getId() == 9300444 || mob.getId() == 9300445) && eim.getMapInstance(923040100).getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(923040100).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(923040100).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(923040100).startMapEffect("Please help! Move on to the next map quickly!", 5120052);
		eim.setProperty("stage1", 1);
		}

	if (mob.getId() == 9300460) {
		eim.getMapInstance(923040300).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "You have failed the mission because the Kenta you were guarding died."));
		eim.disposeIfPlayerBelow(100, 923040000);
		}

	if (mob.getId() == 9300461 || mob.getId() == 9300468) {
		eim.setProperty("stage4", eim.getProperty("stage4") == null ? 1 : 2);

	if (eim.getProperty("stage4") == 2) {
		eim.getMapInstance(923040400).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(923040400).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(923040400).startMapEffect("You beat Pianus!!!", 5120052);


		player.gainExp(player.getLevel() * 3000, true, true, true);
	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1214)).getStatus() < 2) {
		Packages.server.quest.MapleQuest.getInstance(1214).forceComplete(player, 0);
		player.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1214));
		}
		}
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 923040000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid == 923040300 && eim.getProperty("stage3") == null) {
		eim.schedule("ProtectingKenta0", 10 * 1000); //10秒後開始召喚怪物
		eim.setProperty("stage3", 1);
		}

	if (mapid < 923040100 || mapid > 923040400) {
		playerExit(eim, player);
}
}

function ProtectingKenta0(eim) { //保護坎特
	eim.getMapInstance(923040300).setSpawns(true);
	eim.getMapInstance(923040300).startMapEffect("Monsters! Help me! I need at least 3 minutes!", 5120052);

	for (var i = 0; i < eim.getPlayers().size(); i++)
	eim.applyBuff(eim.getPlayers().get(i), 2022792); //給予BUFF

	eim.schedule("ProtectingKenta1", 60 * 1000);
}

function ProtectingKenta1(eim) {
	eim.getMapInstance(923040300).startMapEffect("Just 2 minutes more!", 5120052);
	eim.schedule("ProtectingKenta2", 60 * 1000);
}

function ProtectingKenta2(eim) {
	eim.getMapInstance(923040300).startMapEffect("Just 1 minutes more!", 5120052);
	eim.schedule("ProtectingKenta3", 40 * 1000);
}

function ProtectingKenta3(eim) {
	eim.getMapInstance(923040300).startMapEffect("Just 20 seconds more!", 5120052);
	eim.schedule("ProtectingKenta4", 20 * 1000);
}

function ProtectingKenta4(eim) {
	eim.getMapInstance(923040300).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
	eim.getMapInstance(923040300).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
	eim.getMapInstance(923040300).spawnNpc(9020004, new java.awt.Point(0, 620));
	eim.getMapInstance(923040300).killAllMonsters(true);
	eim.getMapInstance(923040300).setSpawns(false);
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	player.changeMap(eim.getMapInstance(923040000), eim.getMapInstance(923040000).getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 923040000);
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
/*
	名字:	靈藥幻境
	地圖:	海盜船境地
	描述:	251010404
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("Pirate");

	eim.setInstanceMap(925100000).resetFully();

	eim.setInstanceMap(925100100).resetFully();

	eim.setInstanceMap(925100100).killAllMonsters(true);
	eim.setInstanceMap(925100100).setSpawns(false); //限制刷怪

	eim.setInstanceMap(925100400).resetFully();
	eim.setInstanceMap(925100400).setSpawns(false); //限制刷怪

	eim.setInstanceMap(925100500).resetFully();

	eim.startEventTimer(20 * 60000); //20 mins

	MonsterSummoning(eim); //怪物召喚控制

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(925100000), eim.getMapInstance(925100000).getPortal(0));
	player.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(6, "The Pirate Ship is about to set sail. Defeat all monsters and board the ship before the time runs out."));
}

function MonsterSummoning(eim) {//怪物召喚控制
	if (eim.getProperty("stage1") == null && eim.getProperty("stage1a") != null) {

	if (eim.getMapInstance(925100100).getAllMonstersThreadsafe().size() < 5) {
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(-144, 61));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(784, 70));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(73, 231));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(667, 228));
		}

	if (eim.getMapInstance(925100100).getAllMonstersThreadsafe().size() < 10) {
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(42, -21));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(794, -80));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(206, 67));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(575, 82));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(667, 63));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(317, 227));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(-28, 221));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(1088, 224));
		}

	if (eim.getMapInstance(925100100).getAllMonstersThreadsafe().size() < 15) {
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(901, -68));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(-6, 63));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(966, 63));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(415, 223));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(-208, 222));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(793, 226));
		}

	if (eim.getMapInstance(925100100).getAllMonstersThreadsafe().size() < 20) {
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(125, 61));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(875, 64));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(525, 223));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(192, 229));
		eim.getMapInstance(925100100).spawnMonsterOnGroundBelow(em.getMonster(9300114 + parseInt(eim.getProperty("stage1a"))), new java.awt.Point(998, 230));
		}
		}

	if (eim.getMapInstance(925100400).getReactorByName("sMob1").getState() < 1 && eim.getMapInstance(925100400).getMonsterById(9300120) == null) {
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300120), new java.awt.Point(49, 234));
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300120), new java.awt.Point(129, 235));
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300120), new java.awt.Point(-130, 231));
		}

	if (eim.getMapInstance(925100400).getReactorByName("sMob2").getState() < 1 && eim.getMapInstance(925100400).getMonsterById(9300121) == null) {
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300121), new java.awt.Point(-55, 68));
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300121), new java.awt.Point(25, 65));
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300121), new java.awt.Point(-189, 60));
		}

	if (eim.getMapInstance(925100400).getReactorByName("sMob3").getState() < 1 && eim.getMapInstance(925100400).getMonsterById(9300122) == null) {
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300122), new java.awt.Point(449, 231));
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300122), new java.awt.Point(631, 231));
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300122), new java.awt.Point(535, 229));
		}

	if (eim.getMapInstance(925100400).getReactorByName("sMob4").getState() < 1 && eim.getMapInstance(925100400).getMonsterById(9300126) == null) {
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300126), new java.awt.Point(386, 71));
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300126), new java.awt.Point(439, 69));
		eim.getMapInstance(925100400).spawnMonsterOnGroundBelow(em.getMonster(9300126), new java.awt.Point(225, 59));
		}

		eim.schedule("MonsterSummoning", 7 * 1000);
}

function monsterValue(eim, player, mob) {//殺怪後觸發

		eim.setProperty(player.getName(), eim.getProperty(player.getName()) == null ? 1 : parseInt(eim.getProperty(player.getName())) + 1);

		box = 0;
		for (var i = 1; i < 8; i ++)
	if (eim.getMapInstance(925100000).getReactorByName("" + i).getState() < 1) {
		box++;
		}

	if (mob.getMap().getId() == 925100000 && mob.getMap().getAllMonstersThreadsafe().size() < 1 && box == 7) {
		mob.getMap().startMapEffect("There are 7 box(es) that have not been checked yet. Please check the box(es) and eliminate the pirates in hiding.", 5120020);
		}

		for (var i = 1; i < 8; i ++)
	if (mob.getMap().getId() == 925100000 && mob.getMap().getAllMonstersThreadsafe().size() < 1 && box == 0) {
		eim.getMapInstance(925100000).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(925100000).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		}

	if (mob.getId() == 9300119 || mob.getId() == 9300105 || mob.getId() == 9300106) {
		eim.getMapInstance(925100500).spawnNpc(2094001, new java.awt.Point(777, 140));
		eim.getMapInstance(925100500).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "Miss Wu has been saved from Lord Pirate."));
		eim.getMapInstance(925100500).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(925100500).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));

		player.gainExp(player.getLevel() * 2000, true, true, true);
	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1204)).getStatus() < 2) {
		Packages.server.quest.MapleQuest.getInstance(1204).forceComplete(player, 0);
		player.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1204));
		}
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 925100700);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 925100000 || mapid > 925100600) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	player.changeMap(eim.getMapInstance(925100700), eim.getMapInstance(925100700).getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 925100700);
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
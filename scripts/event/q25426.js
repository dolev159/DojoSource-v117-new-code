/*
	名字:	瑞恩島
	地圖:	雪平原1
	描述:	140020000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("q25426");

	eim.setInstanceMap(914040000).resetFully();
	eim.setInstanceMap(914040001).resetFully();

	for (var i = 0; i < 3; i++)
	eim.setInstanceMap(914040000).spawnMonsterOnGroundBelow(em.getMonster(9300503), new java.awt.Point(540 + (Math.random() * 700), -334));
	for (var i = 0; i < 5; i++)
	eim.setInstanceMap(914040000).spawnMonsterOnGroundBelow(em.getMonster(9300503), new java.awt.Point(-2400 + (Math.random() * 1000), 86));
	for (var i = 0; i < 5; i++)
	eim.setInstanceMap(914040000).spawnMonsterOnGroundBelow(em.getMonster(9300503), new java.awt.Point(-1400 + (Math.random() * 1000), 86));
	for (var i = 0; i < 5; i++)
	eim.setInstanceMap(914040000).spawnMonsterOnGroundBelow(em.getMonster(9300503), new java.awt.Point(-400 + (Math.random() * 1000), 86));
	for (var i = 0; i < 5; i++)
	eim.setInstanceMap(914040000).spawnMonsterOnGroundBelow(em.getMonster(9300503), new java.awt.Point(600 + (Math.random() * 1000), 86));
	for (var i = 0; i < 5; i++)
	eim.setInstanceMap(914040000).spawnMonsterOnGroundBelow(em.getMonster(9300503), new java.awt.Point(1600 + (Math.random() * 1000), 86));

	eim.startEventTimer(10 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(914040000), eim.getMapInstance(914040000).getPortal(1));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 140020000);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 914040000 || mapid > 914040001) {
		playerExit(eim, player);
}
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	if (eim.disposeIfPlayerBelow(0, 0)) {
		em.setProperty("state", 0);
}
}

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function leftParty(eim, player) {}//離開小組觸發

function disbandParty(eim) {}//小組退出時觸發

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件
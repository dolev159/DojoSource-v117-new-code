/*
	名字:	騎士團要塞
	地圖:	西格諾斯庭園
	描述:	271040000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("CygnusBattle");

	eim.setInstanceMap(271040100).resetFully();

	eim.registerMonster(em.getMonster(8850000));

	eim.setInstanceMap(271040100).spawnMonsterOnGroundBelow(em.getMonster(8850000), new java.awt.Point(-363, 100));

	eim.startEventTimer(60 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(271040100), eim.getMapInstance(271040100).getPortal(1));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 271040210);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 8850000 || mob.getId() == 8850001 || mob.getId() == 8850002 || mob.getId() == 8850003) {
		eim.getMapInstance(271040100).spawnMonsterOnGroundBelow(em.getMonster(mob.getId() + 1), new java.awt.Point(-363, 100));
		}
	if (mob.getId() == 8850004) {
		eim.getMapInstance(271040100).spawnMonsterOnGroundBelow(em.getMonster(8850012), new java.awt.Point(-363, 100));
		}
	if (mob.getId() == 8850011) {
		eim.startEventTimer(3 * 60000);//60000 = 1分鐘
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 271040100 && mapid != 271040110) {
		playerExit(eim, chr);
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
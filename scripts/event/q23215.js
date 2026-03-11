/*
	名字:	隱藏地圖
	地圖:	過去的時間神殿1
	描述:	927000100
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間

	eim = em.newInstance("q23215");

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
}

function scheduledTimeout(eim) {//規定時間結束
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9001039 || mob.getId() == 9001040) {
		player.changeMap(eim.getMapInstance(mob.getMap().getId() + 10), eim.getMapInstance(mob.getMap().getId() +10).getPortal(0));
		}
	if (mob.getId() == 9001041 || mob.getId() == 9001042) {
		player.changeMap(eim.getMapInstance(310010000), eim.getMapInstance(310010000).getPortal(0));
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid < 927000100 || mapid > 927000119) {
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
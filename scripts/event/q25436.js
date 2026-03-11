/*
	名字:	隱密之地
	地圖:	陰森的洞穴
	描述:	910510600
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間

	eim = em.newInstance("q25436");

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
}

function scheduledTimeout(eim) {//規定時間結束
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9300506) {
		player.changeMap(eim.getMapInstance(player.getMap().getId()), eim.getMapInstance(player.getMap().getId()).getPortal(0));
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 910510600 || mapid > 910510601) {
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
/*
	名字:	水泥路
	地圖:	埃德爾斯坦公園2
	描述:	310020100
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間

	eim = em.newInstance("q23210");
	
	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
}

function scheduledTimeout(eim) {//規定時間結束
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9001036) {
		player.changeMap(eim.getMapInstance(931050110), eim.getMapInstance(931050110).getPortal(0));
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid < 931050100 || mapid > 931050109) {
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
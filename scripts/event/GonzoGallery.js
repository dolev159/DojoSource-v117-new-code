/*
	名字:	隱藏地圖
	地圖:	休菲凱曼畫廊
	描述:	956000000
*/

function setup(level, leaderid) {//開始事件，時間

	eim = em.newInstance("GonzoGallery");

	eim.startEventTimer(1200000); //20 mins

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 956000000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 956010000 || mapid > 956050000) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	eim.disposeIfPlayerBelow(0, 0)
}

function init() {}//服務端讀取

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function leftParty(eim, player) {}//離開小組觸發

function disbandParty(eim) {}//小組退出時觸發

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件
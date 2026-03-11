/*
	名字:	玩具城
	地圖:	赫爾奧斯塔圖書館
	描述:	222020000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間

	eim = em.newInstance("q25432");

	eim.setInstanceMap(922030200).resetFully();
	eim.setInstanceMap(922030201).resetFully();

	eim.startEventTimer(10 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(922030200), eim.getMapInstance(922030200).getPortal(0));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 222020000);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9300505) {
		player.changeMap(eim.getMapInstance(222020000), eim.getMapInstance(222020000).getPortal(0));
		}
		return 1;
}


function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 922030200 || mapid > 922030201) {
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
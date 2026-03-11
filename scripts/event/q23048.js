/*
	名字:	隱藏地圖
	地圖:	可疑的步道
	描述:	310060221
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("q23048");

	eim.setInstanceMap(931000302).resetFully();
	eim.setInstanceMap(931000312).resetFully();
	eim.setInstanceMap(931000322).resetFully();

	eim.startEventTimer(15 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(931000302), eim.getMapInstance(931000302).getPortal(0));
	eim.getMapInstance(931000302).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "Find the missing Job Instructor!"));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 310060220);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 931000302 && mapid != 931000312 && mapid != 931000322) {
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
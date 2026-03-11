/*
	名字:	被遺忘的神殿管理人
	地圖:	被遺忘的黃昏
	描述:	270050000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("Pinkbean");

	eim.setInstanceMap(270050100).resetFully();

	eim.startEventTimer(60 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(270050100), eim.getMapInstance(270050100).getPortal(0));

	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3522)).getStatus() == 1 || player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3538)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(7402).forceStart(player, 0, 1);
}
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 270050300);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 8820001) {
		eim.startEventTimer(3 * 60000);

		eim.applyBuff(player, 2022449);//加載Buff內容

		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 270050100) {
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
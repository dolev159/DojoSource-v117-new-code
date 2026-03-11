/*
	名字:	外星基地
	地圖:	外星物質複製機入口
	描述:	610040800
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("AlianBoss");

	em.newMonsterStats().setOHp(em.getMonster(9400802).getMobMaxHp() * 20);
	em.newMonsterStats().setOMp(em.getMonster(9400802).getMobMaxMp());
	em.newMonsterStats().setOExp(em.getMonster(9400802).getMobExp() * 7);

	em.getMonster(9400802).setOverrideStats(em.newMonsterStats());

	//eim.registerMonster(mob);

	eim.setInstanceMap(610040400).resetFully();

	eim.setInstanceMap(610040400).spawnMonsterOnGroundBelow(em.getMonster(9400802), new java.awt.Point(540, 40));

	eim.startEventTimer(30 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(610040400), eim.getMapInstance(610040400).getPortal(1));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 610040810);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9400802) {
		eim.startEventTimer(3 * 60000);

		Qa = player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).getCustomData();

	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).getStatus() == 1) {

		player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).setCustomData(Qa == null ? 1 : parseInt(Qa) + 1);
		}
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, player, mapid) {//不在此地圖中事件結束
	if (mapid != 610040400) {
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
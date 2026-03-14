/*
	名字:	獎勵階段
	地圖:	隱藏的寶物倉庫
	描述:	951000100
*/

function setup(mapid) {//開始事件，時間

	eim = em.newInstance("MonsterParkBonus");

	eim.schedule("Start", 5 * 1000);//加載指定時間

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
}

function Start(eim) {
	eim.getPlayers().get(0).getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("monsterPark/bonusStart", 3));
	eim.schedule("Monster", 7 * 1000);
}

function Monster(eim) {
	eim.startEventTimer(1 * 60000);
	eim.getPlayers().get(0).getMap().spawnMonsterOnGroundBelow(em.getMonster(9800141), new java.awt.Point(100 + (Math.random() * 700), Math.random() < 0.5 ? -37 : 212));
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9800141) {
		eim.schedule("Spawn", 5 * 1000);
		}
		return 1;
}

function Spawn(eim) {
	eim.getPlayers().get(0).getMap().spawnMonsterOnGroundBelow(em.getMonster(9800141), new java.awt.Point(100 + (Math.random() * 700), Math.random() < 0.5 ? -37 : 212));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.getPlayers().get(0).getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("monsterPark/bonusTimeout", 3));
	eim.schedule("Timeout", 7 * 1000);
}

function Timeout(eim) {
	eim.disposeIfPlayerBelow(100, 951000000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 951000100 || mapid > 951000159) {
		playerExit(eim, chr);
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
/*
	名字:	生命之穴
	地圖:	闇黑龍王洞穴入口
	描述:	240050400
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("ChaosHorntail");

	eim.setProperty("stage", 0);

	eim.setInstanceMap(240060001).resetFully();
	eim.setInstanceMap(240060101).resetFully();
	eim.setInstanceMap(240060201).resetFully();

	eim.startEventTimer(60 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(240060001), eim.getMapInstance(240060001).getPortal(1));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 240050000);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 8810102 || mob.getId() == 8810103 || mob.getId() == 8810104 || mob.getId() == 8810105 || mob.getId() == 8810106 || mob.getId() == 8810107 || mob.getId() == 8810108 || mob.getId() == 8810109) {
		var stage = parseInt(eim.getProperty("stage")) + 1;
		eim.setProperty("stage", stage);
		}
	if (eim.getProperty("stage") == 8) {
		eim.startEventTimer(3 * 60000);
		eim.schedule("Clear", 3 * 1000);//加載指定時間
		}
		return 1;
}

function Clear(eim) {//清除主體
	eim.getMapInstance(240060201).killAllMonsters(true);

	for (var i = 0; i < eim.getPlayers().size(); i++) {
		eim.applyBuff(eim.getPlayers().get(i), 2022108);//加載Buff內容

	if (eim.getPlayers().get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3707)).getStatus() == 1) {
		eim.getPlayers().get(i).mobKilled(8810018, 1);//添加任務怪物計數
}
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (!(mapid == 240060001 || mapid == 240060101 || mapid == 240060201)) {
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
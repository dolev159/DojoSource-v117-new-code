/*
	名字:	次元的縫隙
	地圖:	阿卡伊農的祭壇前
	描述:	272020110
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("ArkariumBattle");

	eim.setInstanceMap(272020200).resetFully();

	eim.setInstanceMap(272020200).spawnNpc(2144010, new java.awt.Point(280, -181));

	eim.startEventTimer(60 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(272020200), eim.getMapInstance(272020200).getPortal(2));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 272020110);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 8860000) {
		eim.startEventTimer(5 * 60000);
		eim.getMapInstance(272020200).getReactorById(2708001).forceHitReactor(1);
		eim.getMapInstance(272020200).getReactorById(2708002).forceHitReactor(1);
		eim.getMapInstance(272020200).getReactorById(2708003).forceHitReactor(1);
		eim.getMapInstance(272020200).getReactorById(2708004).forceHitReactor(1);
		eim.getMapInstance(272020200).getReactorById(2709001).forceHitReactor(1);

		player.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("The Goddess of Time, Rhinne, has been released from her seal."));

	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31180)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(31190).forceStart(player, 0, 2);
		Packages.server.quest.MapleQuest.getInstance(31191).forceStart(player, 0, 1);

		player.mobKilled(8860000, 1);//添加任務怪物計數
		}
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 272020200 && mapid != 272020300 && mapid != 272020400) {
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
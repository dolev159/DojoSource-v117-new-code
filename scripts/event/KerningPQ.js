/*
	名字:	隱藏地圖
	地圖:	第一次同行〈等待室〉
	描述:	910340700
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("KerningPQ");

	eim.setInstanceMap(910340100).resetFully();
	eim.setInstanceMap(910340200).resetFully();
	eim.setInstanceMap(910340300).resetFully();
	eim.setInstanceMap(910340400).resetFully();
	eim.setInstanceMap(910340500).resetFully();

	eim.setInstanceMap(910340500).spawnMonsterOnGroundBelow(em.getMonster(9300003), new java.awt.Point(-127, -435));

	eim.startEventTimer(20 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(910340100), eim.getMapInstance(910340100).getPortal(0));
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9300002 && eim.getMapInstance(910340400).getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(910340400).broadcastMessage(Packages.tools.packet.CField.environmentChange("gate", 2));
		eim.getMapInstance(910340400).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(910340400).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage4", 1);
		}
	if (mob.getId() == 9300003) {
		eim.getMapInstance(910340500).startMapEffect("King Slime has been defeated. All of the stages have been cleared.", 5120017);
		eim.getMapInstance(910340500).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(910340500).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));

		player.gainExp(player.getLevel() * 500, true, true, true);
	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1201)).getStatus() < 2) {
		Packages.server.quest.MapleQuest.getInstance(1201).forceComplete(player, 0);
		player.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1201));
		}
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 910340000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 910340100 || mapid > 910340500) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	player.changeMap(eim.getMapInstance(910340000), eim.getMapInstance(910340000).getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 910340000);
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	if (eim.disposeIfPlayerBelow(0, 0)) {
		em.setProperty("state", 0);
}
}

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件
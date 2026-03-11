/*
	名字:	隱藏地圖
	地圖:	隱藏之塔入口&amp;lt;準備室&gt;
	描述:	921160000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("Prison");

	eim.setInstanceMap(921160100).resetFully();
	eim.setInstanceMap(921160200).resetFully();
	eim.setInstanceMap(921160300).resetFully();
	eim.setInstanceMap(921160310).resetFully();
	eim.setInstanceMap(921160320).resetFully();
	eim.setInstanceMap(921160330).resetFully();
	eim.setInstanceMap(921160340).resetFully();
	eim.setInstanceMap(921160350).resetFully();
	eim.setInstanceMap(921160400).resetFully();
	eim.setInstanceMap(921160500).resetFully();
	eim.setInstanceMap(921160600).resetFully();
	eim.setInstanceMap(921160700).resetFully();

	eim.setInstanceMap(921160700).spawnMonsterOnGroundBelow(em.getMonster(9300454), new java.awt.Point(-961, -186));

	eim.startEventTimer(20 * 60 * 1000); //20 mins

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(921160100), eim.getMapInstance(921160100).getPortal(0));
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getMap().getId() == 921160200 && mob.getMap().getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(921160200).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921160200).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		}
	if (mob.getMap().getId() == 921160400 && mob.getMap().getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(921160400).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921160400).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		}
	if (mob.getId() == 9300454) {
		eim.getMapInstance(921160700).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921160700).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(921160700).spawnNpc(9020006, new java.awt.Point(-1561, -186));
		eim.getMapInstance(921160700).startMapEffect("You finally defeated Prison Guard Ani.", 5120053);

		player.gainExp(player.getLevel() * 3000, true, true, true);
	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1215)).getStatus() < 2) {
		Packages.server.quest.MapleQuest.getInstance(1215).forceComplete(player, 0);
		player.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1215));
		}
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 921160000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 921160100 || mapid > 921160700) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	player.changeMap(eim.getMapInstance(921160000), eim.getMapInstance(921160000).getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 921160000);
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
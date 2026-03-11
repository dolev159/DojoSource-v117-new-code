/*
	名字:	玩具城
	地圖:	愛奧斯塔101樓
	描述:	221023300
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("LudiPQ");

	eim.setInstanceMap(922010100).resetFully();
	eim.setInstanceMap(922010400).resetFully();
	eim.setInstanceMap(922010401).resetFully();
	eim.setInstanceMap(922010402).resetFully();
	eim.setInstanceMap(922010403).resetFully();
	eim.setInstanceMap(922010404).resetFully();
	eim.setInstanceMap(922010405).resetFully();
	eim.setInstanceMap(922010600).resetFully();
	eim.setInstanceMap(922010700).resetFully();
	eim.setInstanceMap(922010800).resetFully();
	eim.setInstanceMap(922010900).resetFully();

	eim.setInstanceMap(922010700).getPortal("next00").setScriptName("ludi_s4Clear");
	eim.setInstanceMap(922010800).getPortal("next00").setScriptName("ludi_s5Clear");

	eim.startEventTimer(20 * 60000); //20 mins

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(922010100), eim.getMapInstance(922010100).getPortal(0));
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9300008 || mob.getId() == 9300014) {
		eim.setProperty("stage2a", eim.getProperty("stage2a") == null ? 1 : parseInt(eim.getProperty("stage2a")) + 1);

	if (eim.getProperty("stage2a") == 14) {
		eim.getMapInstance(922010400).startMapEffect("You've defeated all the Dark Eyes and Shadow Eyes. Talk to the Lime Balloon to proceed to the next stage!", 5120018);
		eim.getMapInstance(922010400).broadcastMessage(Packages.tools.packet.CField.environmentChange("gate", 2));
		eim.setProperty("stage2", 1);

	for (var i = 0; i < 6; i++) {
		eim.getMapInstance(922010400 + i).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(922010400 + i).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		}
		}
		}

	if (mob.getId() == 9300010 && eim.getMapInstance(922010700).getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(922010700).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(922010700).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage4", 0);
		}

	if (mob.getId() == 9300012) {
		eim.getMapInstance(922010900).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(922010900).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));

		eim.setProperty("stage9", 0);

		Qa = player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1202)).getCustomData();

		player.gainExp(player.getLevel() * 1000, true, true, true);
	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1202)).getStatus() < 2) {
		Packages.server.quest.MapleQuest.getInstance(1202).forceComplete(player, 0);
		player.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1202));
		}
		player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1202)).setCustomData(Qa == null ? 1 : parseInt(Qa) + 1);
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 922010000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 922010100 || mapid > 922010900) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	player.changeMap(eim.getMapInstance(922010000), eim.getMapInstance(922010000).getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 922010000);
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
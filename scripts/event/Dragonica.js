/*
	名字:	神木村
	地圖:	天空的渡口
	描述:	240080000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("Dragonica");

	eim.setInstanceMap(240080100).resetFully();
	eim.setInstanceMap(240080200).resetFully();
	eim.setInstanceMap(240080300).resetFully();
	eim.setInstanceMap(240080400).resetFully();
	eim.setInstanceMap(240080500).resetFully();

	eim.startEventTimer(20 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(240080100), eim.getMapInstance(240080100).getPortal(1));
	player.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You are entering Crimson Sky."));
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getMap().getId() == 240080100 || mob.getMap().getId() == 240080200) {

	if (mob.getMap().getAllMonstersThreadsafe().size() > 0) {
		mob.getMap().broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("There are " + mob.getMap().getAllMonstersThreadsafe().size() + " monsters left."));
		}
	if (mob.getMap().getAllMonstersThreadsafe().size() < 1) {
		mob.getMap().broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("Please use the portal to move on to the next stage."));
		mob.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		mob.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		}
		}
	if (mob.getId() == 8300006) {
		mob.getMap().broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("Please use the portal to move on to the next stage."));
		mob.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		mob.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		}
	if (mob.getId() == 8300007) {
		mob.getMap().broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("Please move to the portal at the entrance."));
		mob.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		mob.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		mob.getMap().spawnNpc(2085003, new java.awt.Point(-337, -10));

		player.gainExp(player.getLevel() * 5000, true, true, true);
	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1210)).getStatus() < 2) {
		Packages.server.quest.MapleQuest.getInstance(1210).forceComplete(player, 0);
		player.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1210));
		}
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 240080000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid == 240080400 && eim.getProperty("stage4") == null) {
		eim.startEventTimer(3 * 60000);
		eim.setProperty("stage4", 1);
		}
	if (mapid == 240080500 && eim.getProperty("stage5") == null) {
		eim.startEventTimer(20 * 60000);
		eim.setProperty("stage5", 1);
		}
	if (mapid < 240080040 || mapid > 240080500) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	player.changeMap(eim.getMapInstance(240080000), eim.getMapInstance(240080000).getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 240080000);
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
/*
	名字: 	菇菇王國
	地圖: 	東邊城塔
	描述: 	106021400
*/

var mob = [3300005, 3300006, 3300007];

var mapEff = ["pepeKing/pepe/pepeB", "pepeKing/pepe/pepeG", "pepeKing/pepe/pepeW"];

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("KingPepeAndYetis");

	eim.startEventTimer(10 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖

	num = Math.floor(Math.random() * 3);

	eim.getMapInstance(106021500).resetFully();

	eim.getMapInstance(106021500).spawnMonsterOnGroundBelow(em.getMonster(mob[num]), new java.awt.Point(-28, -67));

	player.changeMap(eim.getMapInstance(106021500), eim.getMapInstance(106021500).getPortal(1));

	eim.getMapInstance(106021500).broadcastMessage(Packages.tools.packet.CField.environmentChange(mapEff[num], 3));
	eim.getMapInstance(106021500).broadcastMessage(Packages.tools.packet.CField.environmentChange("pepeKing/chat/nugu", 3));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 106021400);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 3300005 || mob.getId() == 3300006 || mob.getId() == 3300007) {
		eim.startEventTimer(3 * 60000);
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, player, mapid) {//不在此地圖中事件結束
	if (mapid != 106021500) {
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
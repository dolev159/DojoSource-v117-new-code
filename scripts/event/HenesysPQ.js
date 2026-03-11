/*
	名字:	隱藏地圖
	地圖:	月妙的年糕&amp;lt;離開地圖&gt;
	描述:	910010500
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("HenesysPQ");

	eim.setInstanceMap(910010000).resetFully(false);

	eim.setInstanceMap(910010000).setSpawns(false); //限制刷怪

	checkbunnyHealth(eim); //監控血量

	checkcakesdrop(eim); //監控年糕掉落

	eim.startEventTimer(10 * 60 * 1000); //10 mins

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(910010000), eim.getMapInstance(910010000).getPortal(0));
}

function checkbunnyHealth(eim) {//監控月妙血量
	bunny = eim.getMapInstance(910010000).getMonsterById(9300061); //讀取指定怪物ID

	if (bunny != null) {

		var hp = bunny.getHp();

		var oldHp = eim.getProperty("bunny_hp") == null ? 0 : eim.getProperty("bunny_hp");

	if (oldHp - hp > 100) {
		eim.getMapInstance(910010000).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "The Moon Bunny is feeling sick. please protect so it can make delicious rice cakes."));
		}
		eim.setProperty("bunny_hp", hp);
		}
		eim.schedule("checkbunnyHealth", 5 * 1000);
}

function checkcakesdrop(eim) {//監控年糕掉落
	bunny = eim.getMapInstance(910010000).getMonsterById(9300061); //讀取指定怪物ID

	cakes = new Packages.client.inventory.Item(4001101, 0, 1);

	st = eim.getProperty("cake") == null ? 1 : parseInt(eim.getProperty("cake"));

	if (bunny != null) {

		eim.setProperty("cake", st + 1);

		eim.getMapInstance(910010000).spawnItemDrop(bunny, eim.getPlayers().get(0), cakes, new java.awt.Point(-183, -433), true, true);

		eim.getMapInstance(910010000).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "The Moon Bunny made rice cake number " + st  + "."));
		}
		eim.schedule("checkcakesdrop", 20 * 1000);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9300061) {
		eim.getMapInstance(910010000).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Due to your failure to protect the Moon Bunny, you have been transported to the Exile Map."));
		eim.startEventTimer(10 * 1000);
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 910010300);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid != 910010000) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	player.changeMap(eim.getMapInstance(910010300), eim.getMapInstance(910010300).getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 910010300);
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
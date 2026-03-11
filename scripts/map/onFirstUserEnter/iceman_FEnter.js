/*
	名字:	冰雪平原
	地圖:	冰雪平原後路
	描述:	932000100
*/

importPackage(java.lang);

function start() {
	Iceman = Packages.server.life.MapleLifeFactory.getMonster(9300438);
	ms.getPlayer().getEventInstance().registerMonster(Iceman);
	switch (ms.getPlayer().getMap().getId() / 100 % 10) {
	case 1:
		ms.getPlayer().getMap().startMapEffect("It is so creepy here. Please stay close to me and keep me safe.", 5120051);
		ms.getPlayer().getEventInstance().setProperty("HP", "2000");
		break;
	case 2:
		ms.getPlayer().getMap().startMapEffect("There is a portal up there which leads you to Ice Curse Forest where the Ice Knight is. Please take me there.", 5120051);
		Iceman.setHp(Long.parseLong(ms.getPlayer().getEventInstance().getProperty("HP")));
		break;
		}
		ms.getPlayer().getMap().spawnMonsterWithEffectBelow(Iceman, new java.awt.Point(ms.getPlayer().getMap().getPortal(0).getPosition()), 12);
		Iceman.switchController(ms.getPlayer(), false);
		ms.getClient().getSession().write(Packages.tools.packet.MobPacket.getNodeProperties(Iceman, ms.getPlayer().getMap()));
		ms.dispose();
}
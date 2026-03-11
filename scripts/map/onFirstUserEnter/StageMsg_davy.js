/*
	名字:	隱藏地圖
	地圖:	前往海盜船之路
	描述:	925100000
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 925100000: //前往海盜船之路
		ms.getPlayer().getEventInstance().startEventTimer(4 * 60000);
		ms.getPlayer().getMap().startMapEffect("Eliminate all monsters within the time limit and board the Pirate Ship.", 5120020);
		break;
	case 925100100: //突破船首!
		ms.getPlayer().getEventInstance().startEventTimer(7 * 60000);
		ms.getPlayer().getMap().getReactorByName("treasure1").forceHitReactor(1);
		ms.getPlayer().getMap().startMapEffect("This is the place where the Lord Pirate is sealed. I can tell you how to unseal the Lord Pirate.", 5120020);
		break;
	case 925100400: //打倒海賊!
		ms.getPlayer().getEventInstance().startEventTimer(5 * 60000);
		ms.getPlayer().getMap().startMapEffect("Obtain the key from the monsters within the time limit, and close all the doors!", 5120020);
		break;
	case 925100500: //海賊王的最後
		ms.getPlayer().getEventInstance().startEventTimer(6 * 60000);
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300119), new java.awt.Point(777, 238));
		ms.getPlayer().getMap().startMapEffect("This is it! Eliminate the captain of the Red-Nose Pirates, the Lord Pirate!", 5120020);
		break;
	case 925100600: //雨揚的感謝
		ms.getPlayer().getEventInstance().stopEventTimer();
		break;
	default:
		}
		ms.dispose();
}
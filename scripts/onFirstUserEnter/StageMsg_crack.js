/*
	名字:	隱藏地圖
	地圖:	遺棄之塔
	描述:	922010100
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 922010100: //第1階段
		ms.getPlayer().getMap().startMapEffect("Defeat the Ratz and Black Ratz from Another Dimension, and collect 20 Dimensional Passes!", 5120018);
		break;
	case 922010400: //第2階段
		ms.getPlayer().getMap().startMapEffect("Defeat all the Dark Eyes and Shadow Eyes hiding in the darkness!", 5120018);
		break;
	case 922010401:
		ms.getPlayer().getMap().startMapEffect(ms.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0 ? "I can feel the energies of the monsters. Please find and defeat them." : "I can't feel the energies of the monsters. Please proceed to a different room.", 5120018);
		break;
	case 922010402:
		ms.getPlayer().getMap().startMapEffect(ms.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0 ? "I can feel the energies of the monsters. Please find and defeat them." : "I can't feel the energies of the monsters. Please proceed to a different room.", 5120018);
		break;
	case 922010403:
		ms.getPlayer().getMap().startMapEffect(ms.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0 ? "I can feel the energies of the monsters. Please find and defeat them." : "I can't feel the energies of the monsters. Please proceed to a different room.", 5120018);
		break;
	case 922010404:
		ms.getPlayer().getMap().startMapEffect(ms.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0 ? "I can feel the energies of the monsters. Please find and defeat them." : "I can't feel the energies of the monsters. Please proceed to a different room.", 5120018);
		break;
	case 922010405:
		ms.getPlayer().getMap().startMapEffect(ms.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0 ? "I can feel the energies of the monsters. Please find and defeat them." : "I can't feel the energies of the monsters. Please proceed to a different room.", 5120018);
		break;
	case 922010600: //第3階段
		ms.getPlayer().getMap().startMapEffect("Figure out the hidden code for the box and get to the top.", 5120018);
		break;
	case 922010700: //第4階段
		ms.getPlayer().getMap().startMapEffect("Eliminate all the Rombots in this map!", 5120018);
		break;
	case 922010800: //第5階段
		ms.getPlayer().getMap().startMapEffect("Get on the box that corresponds to the answer to the question!", 5120018);
		break;
	case 922010900: //時空的裂縫
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300012), new java.awt.Point(941, 184));
		ms.getPlayer().getMap().startMapEffect("Defeat the monsters, and then summon and defeat Alishar!", 5120018);
		break;
	default:
		}
		ms.dispose();
}
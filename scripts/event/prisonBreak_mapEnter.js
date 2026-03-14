/*
	名字:	隱藏地圖
	地圖:	隱藏之塔
	描述:	921160100
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 921160100: //隱藏之塔
		ms.getPlayer().getMap().startMapEffect("Sshh! You must escape the tower by quietly avoiding the obstacles.", 5120053);
		break;
	case 921160200: //前往空中監獄的路
		ms.getPlayer().getMap().startMapEffect("You must defeat all the guards. Otherwise, they will call other guards, and that is bad.", 5120053);
		break;
	case 921160300: //黑暗之塔1
		ms.getPlayer().getMap().startMapEffect("They've created a maze to keep people from entering or escaping. You must find the door that leads to the Aerial Prison!", 5120053);
		break;
	case 921160350: //黑暗之塔6
		ms.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "You've found the door that leads to the Aerial Prison!"));
		break;
	case 921160400: //通往空中監獄的秘密通道
		ms.getPlayer().getMap().startMapEffect("Defeat all the guards that are defending the door!", 5120053);
		break;
	case 921160500: //最後的陷阱
		ms.getPlayer().getMap().startMapEffect("This is the last obstacle. Please press on to the Aerial Prison.", 5120053);
		break;
	case 921160600: //空中監獄
		ms.getPlayer().getMap().startMapEffect("Open the prison door by defeating the guard and recovering the prison key.", 5120053);
		break;
	case 921160700: //教官的房間
		ms.getPlayer().getMap().startMapEffect("Please free us by defeating the Prison Guard!", 5120053);
		break;
	default:
		}
		ms.dispose();
}
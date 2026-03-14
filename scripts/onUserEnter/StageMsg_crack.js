/*
	名字:	隱藏地圖
	地圖:	遺棄之塔
	描述:	922010400
*/

function start() {
	for (var i = 0; i < 6; i++)
	if (ms.getMap(922010400 + i).getAllMonstersThreadsafe().size() > 0) {
		ms.dispose();
		return;
		}
		ms.getPlayer().getMap().startMapEffect("You've defeated all the Dark Eyes and Shadow Eyes. Talk to the Lime Balloon to proceed to the next stage!", 5120018);
		ms.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("gate", 2));
		ms.dispose();
}
/*
	名字:	危險的躲迷藏
	地圖:	可疑的實驗室
	描述:	931000010
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(23007).indexOf("vel00=1") == -1) {
		pi.openNpc(2159006);
		}
		return true;
}
/*
	名字:	萬能傳送點
	地圖:	維多利亞港
	描述:	104000000
*/

var text = ["#0# Ariant Coliseum", "#1# Mu Lung Training Center", "#2# Monster Carnival 1", "#3# Monster Carnival 2", "#4# Dual Raid", "#5# Nett's Pyramid", "#6# Kerning Subway", "#7# Happyville", "#8# Golden Temple", "#9# Moon Bunny", "#10# First Time Togethe", "#11# Dimensional Crack", "#12# Forest of Poison Haze", "#13# Remnant of the Goddess", "#14# Lord Pirate", "#15# Romeo and Juliet", "#16# Resurrection of the Hoblin King", "#17# Dragon's Nest", "#18#", "#19#", "#20#", "#21# Kenta in Danger", "#22# Escape", "#23# The Ice Knight's Curse"];

var map = [980010000, 925020000, 980000000, 980030000, 923020000, 926010000, 910320000, 209000000, 950100000, 910010500, 910340700, 221023300, 300030100, 200080101, 251010404, 261000021, 211000002, 240080000, 0, 0, 0, 923040000, 921160000, 932000000];

var level = [255, 90, 255, 255, 90, 60, 25, 255, 0, 20, 20, 20, 70, 70, 70, 70, 120, 120, 255, 255, 255, 120, 120, 20];

var chat = "";

function start() {
	for (i = 0; i < level.length; i++)
	if (cm.getPlayer().getLevel() >= level[i]) {
		chat += "" + text[i] + "";
		}
		cm.askMapSelection(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
		cm.getPlayer().changeMap(cm.getMap(map[selection]), cm.getMap(map[selection]).getPortal(0));
		}
		cm.dispose();
}
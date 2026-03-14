/*
	名字:	日落之路
	地圖:	紅砂沙漠
	描述:	260020300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23271)).getStatus() != 1 || pi.getPlayer().itemQuantity(4032975)) {
		return false;
		}
	if (pi.getMap(926030000).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(926030000), pi.getMap(926030000).getPortal(1)); //沙漠的角落1
		return true;
}
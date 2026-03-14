/*
	名字:	黑暗時間神殿
	地圖:	時間神殿迴廊2
	描述:	272010100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getStatus() > 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2144000, 0, "You've stopped #p2144010#'s plans to break the Black Mage out of his confinement. Now it's time for you to return to the present and enter the Dimensional Schism. #p2144010# can't hide any longer!", "00 00", 16));
		return true;
		}
	if (pi.getMap(272010200).getCharacters().size() < 1) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getMobKills(8860001) > 0) {
		pi.getMap(272010200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(272010200), pi.getMap(272010200).getPortal(1)); //黑魔法師的房前迴廊
		return true;
		}
		pi.getEventManager("Arkarium").startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
}
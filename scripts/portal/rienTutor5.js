/*
	名字:	瑞恩島
	地圖:	寒冷的森林５
	描述:	140090500
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21019).indexOf("miss=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21019, pi.getPlayer().getInfoQuest(21019) + ";miss=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage("You're very close to town. I'll head over there first since I have somethings to take care of. You take your time."));
		return false;
}
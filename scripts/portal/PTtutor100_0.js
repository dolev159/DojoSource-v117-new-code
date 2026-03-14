/*
	名字:	疑問的飛行船
	地圖:	大廳
	描述:	915000100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25000)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(915000200), pi.getMap(915000200).getPortal(2)); //外部
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Your most excellent manservant, Gaston, will see to the final preparations. Talk to him."));
		return false;
}
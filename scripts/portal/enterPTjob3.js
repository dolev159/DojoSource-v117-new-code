/*
	名字:	隱密之地
	地圖:	納希沙漠寶物倉庫入口
	描述:	915010100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Defeat the Dust Dwarves around the vault to enter."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(915010101), pi.getMap(915010101).getPortal(1)); //納希沙漠寶物倉庫
		return true;
}
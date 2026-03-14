/*
	名字:	畫中的世界
	地圖:	小雪球棲息地
	描述:	956040100
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You cannot enter this area yet."));
	return false;
}
/*
	名字:	神木村
	地圖:	天空地區盡頭
	描述:	240080600
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(6, "The exit has been closed."));
	return true;
}
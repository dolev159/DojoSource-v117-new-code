/*
	名字:	清隆
	地圖:	佔領戰等待室
	描述:	262000300
*/

function start() {
	cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.openUI(70));
	cm.dispose();
}
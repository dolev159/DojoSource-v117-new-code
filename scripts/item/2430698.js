/*
	名字:	休菲凱曼的紙條
	地圖:	休菲凱曼的紙條
	描述:	休菲凱曼的紙條
*/

function start() {
	im.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(9074100, 0, "Phone Number: 1123 \r\nProduct Name: B8-1", "00 00", 0));
	im.dispose();
}
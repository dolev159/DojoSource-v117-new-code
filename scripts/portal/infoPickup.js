/*
	名字:	楓之島
	地圖:	小樹林
	描述:	40000
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("UI/tutorial.img/21"));
	return false;
}
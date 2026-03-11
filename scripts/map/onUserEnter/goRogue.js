/*
	名字:	楓之島
	地圖:	盜賊教程
	描述:	1020400
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroLock(1));
	ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction3.img/rogue/Scene" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
	ms.dispose();
}
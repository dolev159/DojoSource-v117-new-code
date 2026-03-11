/*
	名字:	隱藏地圖
	地圖:	聯盟的結成
	描述:	913050000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroLock(1));
	ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction5.img/unitedMaple/Scene0"));
	ms.dispose();
}
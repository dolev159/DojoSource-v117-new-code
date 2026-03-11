/*
	名字:	航海中
	地圖:	前往猴子方向
	描述:	912060100
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));

	ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/Scene00"));
	ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/out00"));
	ms.dispose();
}
/*
	名字:	動畫
	地圖:	新手村1
	描述:	900090101
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
	ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction4.img/PromiseDragon/Scene0"));
	ms.dispose();
}
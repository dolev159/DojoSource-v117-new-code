/*
	名字:	隱密之地
	地圖:	耶雷弗散步步道
	描述:	913050203
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
	ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction6.img/Phantom/Scene"));
	ms.dispose();
}
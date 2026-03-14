/*
	名字:	隱藏地圖
	地圖:	913070071
	描述:	913070071
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
	ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction7.img/mikhail/1st_Job"));
	ms.dispose();
}
/*
	名字:	耶雷弗
	地圖:	聯盟會議場
	描述:	913050010
*/

function start() {
	y = ms.getPlayer().getJob();
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroLock(0));
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(y < 1000 ? 190 : y < 2000 ? 10000190 : y < 2200 ? 20000190 : y < 2300 ? 20010190 : y < 2400 ? 20020190 : y < 3200 ? 30010190 : 30000190), 1, 1, -1);
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("WiIl of the Alliance obtained!"));
	ms.dispose();
}
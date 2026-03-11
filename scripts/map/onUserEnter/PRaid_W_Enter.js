/*
	名字:	霧之海
	地圖:	鬼盜船航海室
	描述:	923020100
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendPyramidEnergy("PRaid_expPenalty", "0"));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendPyramidEnergy("PRaid_ElapssedTimeAtField", "0"));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendPyramidEnergy("PRaid_Point", "-1"));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendPyramidEnergy("PRaid_Bonus", "-1"));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendPyramidEnergy("PRaid_Total", "-1"));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendPyramidEnergy("PRaid_Team", ""));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendPyramidEnergy("PRaid_IsRevive", "0"));

	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendGhostPoint("PRaid_Point", "-1"));

	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendGhostStatus("Red_Stage", "1"));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendGhostStatus("Blue_Stage", "1"));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendGhostStatus("redTeamDamage", "0"));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.sendGhostStatus("blueTeamDamage", "0"));
	ms.dispose();
}
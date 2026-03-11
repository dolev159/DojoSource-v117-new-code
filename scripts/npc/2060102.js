/*
	名字:	扭曲次元的門
	地圖:	小菇菇
	描述:	10000
*/

function start() {
	if (cm.getPlayer().getMap().getId() != 10000 || cm.getPlayer().getLevel() > 1) {
		cm.dispose();
		return;
		}
		var chat = "Through the doors of twisted dimensions, you can transform into other professions.#b";
		chat += "\r\n#L0#I'll continue playing Explorer";
		chat += "\r\n#L1#I want to be a Dual Blade";
		chat += "\r\n#L2#I want to be a Cannoneer";
		chat += "\r\n#L3#I want to be a Jett";
		chat += "\r\n#L4#I want to be a Demon Slayer";
		chat += "\r\n#L5#I want to be a Mercedes";
		cm.sendSimple(chat);
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
		cm.sendOk("If you leave here, there will be no chance.");
		cm.dispose();
		break;
	case 1:
		cm.dispose();
		cm.getPlayer().setSubcategory(1);

		Hair0  = [33820, 33830];

		Hair1  = [34810, 34820];

		num = Math.floor(Math.random() * 2);

		cm.getPlayer().setHair(cm.getPlayer().getGender() < 1 ? Hair0[num] : Hair1[num]);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, cm.getPlayer().getGender() < 1 ? Hair0[num] : Hair1[num]);

		cm.getPlayer().setFace(cm.getPlayer().getGender() < 1 ? 20265 : 21261);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, cm.getPlayer().getGender() < 1 ? 20265 : 21261);

		cm.getPlayer().fakeRelog();
		cm.getPlayer().changeMap(cm.getMap(103050900), cm.getMap(103050900).getPortal(0));
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().setSubcategory(2);
		cm.getPlayer().fakeRelog();
		cm.getPlayer().changeMap(cm.getMap(3000600), cm.getMap(3000600).getPortal(0));
		break;
	case 3:
		cm.dispose();
		cm.gainEquip(cm.getPlayer().getGender() < 1 ? 1050233 : 1051283, -5);
		cm.gainEquip(1072661, -7);
		cm.gainEquip(1492150, -11);
		cm.gainEquip(1102395, -9);

		Face0  = [20100, 20401, 20402];

		Face1  = [21002, 21201, 21700];

		num = Math.floor(Math.random() * 3);

		cm.getPlayer().setFace(cm.getPlayer().getGender() < 1 ? Face0[num] : Face1[num]);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, cm.getPlayer().getGender() < 1 ? Face0[num] : Face1[num]);

		cm.getPlayer().setHair(cm.getPlayer().getGender() < 1 ? 36110 : 34983);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, cm.getPlayer().getGender() < 1 ? 36110 : 34983);

		cm.getPlayer().changeJob(508);
		cm.getPlayer().changeMap(cm.getMap(552000060), cm.getMap(552000060).getPortal(0));
		break;
	case 4:
		cm.dispose();
		cm.gainEquip(cm.getPlayer().getGender() < 1 ? 1050191 : 1051236, -5);
		cm.gainEquip(1072518, -7);
		cm.gainEquip(1322123, -11);

		cm.getPlayer().setFace(cm.getPlayer().getGender() < 1 ? 20248 : 21246);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, cm.getPlayer().getGender() < 1 ? 20248 : 21246);

		cm.getPlayer().setHair(cm.getPlayer().getGender() < 1 ? 33531 : 34411);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, cm.getPlayer().getGender() < 1 ? 33531 : 34411);

		cm.getPlayer().setSkinColor(13);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.SKIN, 13);

		cm.getPlayer().changeJob(3001);
		cm.getPlayer().setDemonMarking(1012276 + Math.floor(Math.random() * 5));
		cm.getPlayer().changeMap(cm.getMap(931050310), cm.getMap(931050310).getPortal(0));
		break;
	case 5:
		cm.dispose();
		cm.gainEquip(cm.getPlayer().getGender() < 1 ? 1050192 : 1051237, -5);
		cm.gainEquip(1072519, -7);
		cm.gainEquip(1522038, -11);
		cm.gainEquip(1352000, -10);

		Face0  = [20549, 20557];

		Face1  = [21547, 21555];

		num = Math.floor(Math.random() * 2);

		cm.getPlayer().setFace(cm.getPlayer().getGender() < 1 ? Face0[num] : Face1[num]);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.FACE, cm.getPlayer().getGender() < 1 ? Face0[num] : Face1[num]);

		cm.getPlayer().setHair(cm.getPlayer().getGender() < 1 ? 33453 : 34423);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.HAIR, cm.getPlayer().getGender() < 1 ? 33453 : 34423);

		cm.getPlayer().setSkinColor(12);
		cm.getPlayer().updateSingleStat(Packages.client.MapleStat.SKIN, 12);
		cm.getPlayer().changeJob(2002);
		cm.getPlayer().changeMap(cm.getMap(910150000), cm.getMap(910150000).getPortal(0));
}
}
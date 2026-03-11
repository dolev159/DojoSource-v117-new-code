/*
	名字:	塞尼
	地圖:	機器人美麗的經紀人
	描述:	100000104
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 3) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getAndroid() == null) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "You don't have an Android. Try again when you get one."));
			cm.dispose();
			return;
			}
			cm.sendSimple("Hello. I'm Lauren, the Android Beautician. You would like to give your android a makeover? You've come to the right place! I'll give your android a whole new look! \r\n#L0##bChange Hairstyle#l\r\n#L3#Dye Hair#l\r\n#L6#Plastic Surgery#l");
			break;
	default:
		if (status == 1) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("Which coupon would you like to use? \r\n#L1##bChange Hairstyle (VIP Coupon)#l\r\n#L2#Change Hairstyle (Regular Coupon)#l");
		break;
	default:
		if (status == 2) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().hasEquipped(1662000) || cm.getPlayer().hasEquipped(1662002))
			hair = [30000, 30020, 30030, 30040, 30050, 30060, 30100, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30400, 30410, 30420, 30430, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30550, 30560, 30570, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30690, 30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790, 30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30890, 30900, 30910, 30920, 30930, 30940, 30950, 30990];
		else
			hair = [31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 31320, 31330, 31340, 31350, 31360, 31400, 31410, 31420, 31430, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31570, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31660, 31670, 31680, 31690, 31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31780, 31790, 31800, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 31910, 31920, 31930, 31940, 31950, 31990];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getAndroid().getHair() % 10);

			cm.sendAndroidStyle("Please choose a hairstyle that fits your android.", hair);
			break;
	case 3:
		if (cm.getPlayer().itemQuantity(5150053)) {
			cm.gainItem(5150053, -1);
			cm.setAndroidHair(hair[selection]);
			cm.sendOk("All done! You like?");
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have a coupon.");
			cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().hasEquipped(1662000) || cm.getPlayer().hasEquipped(1662002))
			hair = [32160, 32310, 32330, 32340, 32370, 32380, 32390, 32400, 32410, 32420, 33000, 33040, 33050, 33060, 33070, 33080, 33090, 33100, 33110, 33120, 33130, 33150, 33170, 33180, 33190, 33210, 33220, 33240, 33250, 33260, 33270, 33280, 33290, 33330, 33350, 33360, 33370, 33380, 33390, 33400, 33410, 33430, 33440, 33450, 33460, 33470, 33480, 33500, 33510, 33520, 33530, 33540, 33550, 33580, 33600, 33610, 33620, 33630, 33660, 33670, 33690, 33800];
		else
			hair = [32150, 32320, 32350, 32360, 33030, 33160, 33590, 33680, 34000, 34010, 34020, 34030, 34040, 34050, 34060, 34070, 34080, 34090, 34100, 34110, 34120, 34130, 34140, 34150, 34160, 34170, 34180, 34190, 34210, 34220, 34240, 34250, 34260, 34270, 34310, 34320, 34330, 34340, 34360, 34370, 34380, 34400, 34410, 34420, 34430, 34440, 34450, 34470, 34480, 34490, 34510, 34540, 34590, 34600, 34610, 34620, 34630, 34650, 34660, 34670, 34680, 34690, 34720, 34780, 34790];

			hair = hair[Math.floor(Math.random() * hair.length)] + parseInt(cm.getPlayer().getAndroid().getHair() % 10);

			cm.sendYesNo("If you use a regular Coupon, your android will end up with a random hairstyle. Do you really want to use a #b#t5150052##k?");
			break;
	case 3:
		if (cm.getPlayer().itemQuantity(5150052)) {
			cm.gainItem(5150052, -1);
			cm.setAndroidHair(hair);
			cm.sendOk("Okay, all done. Take a look, What do you think?");
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have a coupon.");
			cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("Which coupon would you like to use? \r\n#L4##bDye Hair (VIP Coupon)#l\r\n#L5#Dye Hair (Regular Coupon)#l");
		break;
	default:
		if (status == 2) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 2:
		hair = parseInt(cm.getPlayer().getAndroid().getHair() / 10) * 10;

		hair = [hair +1, hair +3, hair +4, hair +5];

		cm.sendAndroidStyle("Select a hair color that suits your android.", hair);
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(5151036)) {
			cm.gainItem(5151036, -1);
			cm.setAndroidHair(hair[selection]);
			cm.sendOk("All done! You like?");
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have a coupon.");
			cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 2:

		hair = parseInt(cm.getPlayer().getAndroid().getHair() / 10) * 10;

		hair = [hair +0, hair +1, hair +2, hair +3, hair +4, hair +5, hair +6, hair +7];

		hair = hair[Math.floor(Math.random() * hair.length)];

		cm.sendYesNo("If you use a regular Coupon, your android will end up with a random haircolor. Do you really want to use a #b#t5151035##k?");
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(5151035)) {
			cm.gainItem(5151035, -1);
			cm.setAndroidHair(hair);
			cm.sendOk("Okay, all done. Take a look, What do you think?");
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have a coupon.");
			cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("Which coupon would you like to use? \r\n#L7##bPlastic Surgery (VIP Coupon)#l\r\n#L8#Plastic Surgery (Regular Coupon)#l");
		break;
	default:
		if (status == 2) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().hasEquipped(1662000) || cm.getPlayer().hasEquipped(1662002))
			face = [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20025, 20026, 20027, 20028, 20029];
		else
			face = [21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019, 21020, 21021, 21022, 21023, 21024, 21025, 21026, 21027, 21028, 21029];

			for (var i = 0; i < face.length; i++)
			face[i] = face[i] + parseInt(cm.getPlayer().getAndroid().getFace() / 100 % 10) * 100;

			cm.sendAndroidStyle("Please choose a face that fits your android.", face);
			break;
	case 3:
		if (cm.getPlayer().itemQuantity(5152057)) {
			cm.gainItem(5152057, -1);
			cm.setAndroidFace(face[selection]);
			cm.sendOk("All done! You like?");
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have a coupon.");
			cm.dispose();
}
}

function action8(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendYesNo("If you use a regular Coupon, your android will end up with a random face. Do you really want to use a #b#t5152056##k?");
		break;
	case 3:
		if (cm.getPlayer().hasEquipped(1662000) || cm.getPlayer().hasEquipped(1662002))
			face = [20030, 20031, 20032, 20036, 20037, 20040, 20043, 20044, 20045, 20046, 20047, 20048, 20049, 20050, 20052, 20053, 20055, 20056, 20057];
		else
			face = [21030, 21031, 21033, 21034, 21035, 21038, 21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21049, 21052, 21053, 21054, 21055, 21058, 21062];

			face = face[Math.floor(Math.random() * face.length)] + parseInt(cm.getPlayer().getAndroid().getFace() / 100 % 10) * 100;

		if (cm.getPlayer().itemQuantity(5152056)) {
			cm.gainItem(5152056, -1);
			cm.setAndroidFace(face);
			cm.sendOk("Okay, all done. Take a look, What do you think?");
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have a coupon.");
			cm.dispose();
}
}
//By Blake
//Starting Npc - Sera
function start() {
cm.sendSimple ("#i 3991002##i 3991011##i 3991014##i 3991020##i 3991003##i 3991038##i 3991044#\r\n\r\nHello #b#h ##k, Welcome to #dCloudMs#k!\r\nI want to regard you for joining us, there is alot of fun here.\r\n\r\nFor get continue you must get 3 (#i 4000019#)\r\nWhen continue to warp, you'll get the starter pack which includes that list:\r\n\r\n#i 2000019#(100) #i 5062000#(10) #i 5062001#(10)  #i 4310025# (30)  #i 2049402# (10)  #i 5450000# (5)\r\n+ Mesos: 150,000 + Nx cash: 25,000.\r\n#L1##bI collected 3, warp me please.#k#l");
}

function action(mode, type, selection) {
	if (selection == 0) {
	cm.spawnMonster(9300217, 5);
	cm.dispose();
}
         if (selection == 1) { 
    if (cm.getPlayer().haveItem(4000019, 3)) {
	cm.gainItem(5062000, 10); // Mark of the Beta
	cm.gainItem(5062001, 10); // Power Elixir
	cm.gainItem(5450000, 5); // Miu Miu
	cm.gainItem(2049402, 10); // Miu Miu
	cm.gainItem(2000019, 100); // Miu Miu
	cm.gainItem(4310025, 30); // Miu Miu
        cm.gainNXCredit(50000);
	cm.gainMeso(150000);
    	cm.warp(910000000);
	cm.sendSimple ("You got a starter pack!\r\nFor more information go to #bMo#k.\r\nYou can find him in the Free Market.");
	cm.dispose();
    } else {
	cm.sendOk("#i 3991002##i 3991011##i 3991014##i 3991020##i 3991003##i 3991038##i 3991044#\r\n\r\nYou do not have 3 of #i 4000019# ");
	cm.dispose();

    }
}
}
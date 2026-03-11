/*
	名字:	瑪塔塔
	地圖:	天空的渡口
	描述:	240080000
*/

function start() {
	cm.sendSimple("I wish I could soar through the sky... You know, if you are interested in flying, go see Chief Tatamo in Leafre. \r\n\r\n#L0##bCan I purchase a tablet?#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendOk("The tablet cannot be used in Heroic Worlds.");
		cm.dispose();
}
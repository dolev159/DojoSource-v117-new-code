/*
	名字:	福斯魏德 教授
	地圖:	新葉城-市區中心
	描述:	600000000
*/

function start() {
	cm.sendSimple("Hey! I know what you're thinking? What do you want? \r\n#L0##bI found a futuristic-looking object! I figured you might be night person to talk to with you being a time-traveling scientist and all...#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendOk("What you are holding is anything but futuristic. I need futuristic looking things to continue this conversation with you. Come back to me when you find something!"); 
		cm.dispose();
}
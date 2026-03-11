/*
	名字:	裴爾
	地圖:	秘密廣場
	描述:	310010000
*/

function start() {
	cm.sendSimple("What is it? \r\n\r\n#L0##bI want to talk to you.#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (Math.floor(cm.getPlayer().getJob() / 100) != 33) {
			cm.sendNext("Hmm...you want to talk? All right. I love animals, you know...especially cats. They're just so elegant and graceful.");
			cm.dispose();
			return;
			}
			cm.sendNext("When your Jaguar starts misbehaving, you have to look to yourself first. Are you living up to expectations? Are you on the right path? Jaguars are clever...and they know if something is wrong.");
			}
			cm.dispose();
}
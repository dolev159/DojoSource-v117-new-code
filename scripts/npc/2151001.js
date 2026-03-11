/*
	名字:	赫力泰
	地圖:	秘密廣場
	描述:	310010000
*/

function start() {
	cm.sendSimple("What is it? \r\n\r\n#L0##bI want to talk to you.#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (Math.floor(cm.getPlayer().getJob() / 100) != 32) {
			cm.sendNext("Well... I'm not really that good with words, you see... I'm not the best person to hang around with.");
			cm.dispose();
			return;
			}
			cm.sendNext("What's wrong? Are things getting difficult for you? The path of a Battle Mage isn't an easy one, you know. But then again, nothing is easy in life...you must work to get anywhere. Be persistent.");
			}
			cm.dispose();
}
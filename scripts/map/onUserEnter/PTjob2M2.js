/*
	名字:	隱密之地
	地圖:	天空之城寶物倉庫
	描述:	915010001
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
	ms.sendNextS("This place is frighteningly well-preserved. Now where did I put that skill book? The small cabinet with the world's first meso? The trunk with the only existing Reverse Miracle Cube?", 17);
}

function action(mode, type, selection) {
	if (mode > 0)
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
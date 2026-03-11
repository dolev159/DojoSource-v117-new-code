/*
	名字:	隱藏地圖
	地圖:	危險之海1
	描述:	923040100
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 923040100: //危險之海1
		ms.getPlayer().getMap().startMapEffect("Can you hear me? could you eliminate all the enraged monsters?", 5120052);
		break;
	case 923040200: //危險之海2
		ms.getPlayer().getMap().startMapEffect("I'm running out of air! Please eliminate monsters and get me 20 Air Bubbles!", 5120052);
		break;
	case 923040300: //危險之海中央
		ms.getPlayer().getMap().startMapEffect("Here! I'm here! I was trapped by those furious sea creatures. Thank you so much for coming.", 5120052);
		break;
	case 923040400: //危險的洞窟
		ms.getPlayer().getMap().startMapEffect("Do you see those humongous fish over there?", 5120052);
		break;
	default:
		}
		ms.dispose();
}
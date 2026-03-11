/*
	名字:	隱密之地
	地圖:	第一次同行
	描述:	910340100
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 910340100: //1號關隘
		ms.getPlayer().getMap().startMapEffect("Everyone! Talk to Cloto, and defeat Ligators to find the coupons Cloto wants!", 5120017);
		break;
	case 910340200: //2號關隘
		ms.getPlayer().getMap().startMapEffect("Find 3 ropes that can open the door to the next stage, then grab onto them!", 5120017);
		break;
	case 910340300: //3號關隘
		ms.getPlayer().getMap().startMapEffect("Find the 3 Platforms that can open the door to the next stage.", 5120017);
		break;
	case 910340400: //4號關隘
		ms.getPlayer().getMap().startMapEffect("Eliminate the vicious Curse Eyes!", 5120017);
		break;
	case 910340500: //最後的關隘
		ms.getPlayer().getMap().startMapEffect("Defeat King slime!", 5120017);
		break;
	default:
		}
		ms.dispose();
}
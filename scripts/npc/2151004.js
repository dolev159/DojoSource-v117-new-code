/* Euenice
	FMNPC
*/
importPackage(java.util);

var status = -1;
var Money = 500000;

var ch = Math.floor(Math.random()*(35-1+1)+1);
var i;

function start() {
status = -1;
action(1, 0, 0);

}

function action(mode, type, selection) {
var 奶茶控 = (cm.getChar().getGender() == 0 ? "歐尼醬":"歐乃醬");
    if (mode == 1) {
        status++;
    } else {
        if (status >= 2 || status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
	 cm.sendNext("#d" + 奶茶控 + " #h #　~ ，人家有很多玩具不想要了，可是丟掉又很浪費，不如來抽獎吧:D (#b特#r別#d感#g謝#e#r培根#d)");
    } else if (status == 1) {
	cm.sendSimple("#d抽獎需要"+Money+"元呢，"+奶茶控+"#h # 　有嗎？ \r\n #L0##d有唷，拿去吧。#L1#不好意思我沒有~");
	} else if (status == 2) {
	if(selection == 1){
	cm.sendOk("#d沒關西，"+奶茶控+"，下次記得帶唷~");
	cm.dispose();
	} else if (selection == 0){
	if(cm.getChar().getMeso() < Money){
	cm.sendOk("#d"+奶茶控+"的錢好像沒帶夠呢，去檢查一下吧~");
	cm.dispose();
	return;
	} else if(!cm.canHold(1302000)){
	cm.sendOk("#d"+奶茶控+"的背包好像滿了呢，去檢查一下吧~");
	cm.dispose();
	return;
	}
	cm.gainMeso(-Money);
	//ch = 0;
		//cm.sendOk(ch);
	/*	if(ch == 0){
		cm.getChar().gainItem(01302000,1);
		cm.sendOk("#v1302000#");
		}*/
		
    switch(ch){
	case 0:
	cm.gainItem(01302000,1);
	break;
	case 1:
	i = 1302007;cm.gainItem(i,1);break;
	case 2:
	i = 1302013;cm.gainItem(i,1);break;
	case 3:
	i = 1302014;cm.gainItem(i,1);break;
	case 4:
	i = 1302016;cm.gainItem(i,1);break;
	case 5:
	i = 1302017;cm.gainItem(i,1);break;
	case 6:
	i = 1302021;cm.gainItem(i,1);break;
	case 7:
	i = 1302022;cm.gainItem(i,1);break;
	case 8:
	i = 1302024;cm.gainItem(i,1);break;
	case 9:
	i = 1302025;cm.gainItem(i,1);break;
	case 10:
	i = 1302026;cm.gainItem(i,1);break;
	case 11:
	i = 1302027;cm.gainItem(i,1);break;
	case 12:
	i = 1302028;cm.gainItem(i,1);break;
	case 13:
	i = 1302029;cm.gainItem(i,1);break;
	case 14:
	i = 1302035;cm.gainItem(i,1);break;
	case 15:
	i = 1302049;cm.gainItem(i,1);break;
	case 16:
	i = 1302063;cm.gainItem(i,1);break;
	case 17:
	i = 1302067;cm.gainItem(i,1);break;
	case 18:
	i = 1302071;cm.gainItem(i,1);break;
	case 19:
	i = 1302132;cm.gainItem(i,1);break;
	case 20:
	i = 1302150;cm.gainItem(i,1);break;
	case 21:
	i = 1302160;cm.gainItem(i,1);break;
	case 22:
	i = 1312013;cm.gainItem(i,1);break;
	case 23:
	i = 1322003;cm.gainItem(i,1);break;
	case 24:
	i = 1322005;cm.gainItem(i,1);break;
	case 25:
	i = 1322006;cm.gainItem(i,1);break;
	case 26:
	i = 1322007;cm.gainItem(i,1);break;
	case 27:
	i = 1322009;cm.gainItem(i,1);break;
	case 28:
	i = 1322012;cm.gainItem(i,1);break;
	case 29:
	i = 1322025;cm.gainItem(i,1);break;
	case 30:
	i = 1322027;cm.gainItem(i,1);break;
	case 31:
	i = 1322051;cm.gainItem(i,1);break;
	case 32:
	i = 1332032;cm.gainItem(i,1);break;
	case 33:
	i = 1372017;cm.gainItem(i,1);break;
	case 34:
	i = 1402013;cm.gainItem(i,1);break;
	case 35:
	i = 1402014;cm.gainItem(i,1);break;
	case 36:
	i = 1402014;cm.gainItem(i,1);break;
	}
	cm.dispose();
	}
/*	var y = Math.floor(Math.random() * toy.length);
   var x = toy[y];
	var item = cm.gainGachaponItem(x, 1,"");
	 if (item != -1) {
            cm.gainMeso(-Money);
            cm.sendOk(奶茶控 +"抽獎獲得了 #b#t" + item + "##k. #i" + item + "#");
	cm.dispose();
	} else {
	//cm.sendOk("  y:  " +y+ " x:  " +x+ "  item:  " +item);
            cm.sendOk("出現錯誤呢~　錢先退給你吧");
			cm.dispose();
       }
	}*/
    } else {
        cm.dispose();
		}
}
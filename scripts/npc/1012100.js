/*
	名字:	赫麗娜
	地圖:	弓箭手培訓中心
	描述:	100000201
*/

var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
    } else {
        if (mode === 0 && status === 0) {
            cm.dispose();
            return;
        }
        if (mode === 1) {
            status++;
        } else {
            status--;
        }

        if (status === 0) {
            cm.sendOk("Welcome to the Bowman Instructional School.");
            cm.dispose();
        }
    }
}

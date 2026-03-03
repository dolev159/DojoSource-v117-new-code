/*
This NPC Made by BuyIT
*/
var status = 0;
function start() {
status = -1;
action(1, 0, 0);
}
function action(mode, type, selection) {
if (status >= 0 && mode == 0) {
cm.dispose();
return;
}
if (mode == 1)
status++;
else
status--;
if (status == 0) {
cm.sendYesNo("Do you wanna reset your stats?");
} else if (status ==1) {
var wstat1 = cm.getPlayer().getRemainingAp() + cm.getPlayer().getStr() + cm.getPlayer().getDex() + cm.getPlayer().getInt() + cm.getPlayer().getLuk();
var wstat2 = wstat1-16;
cm.getPlayer().resetStats(4, 4, 4, 4);
cm.getPlayer().updateSingleStat(MapleStat . AVAILABLEAP,wstat2);
cm.getPlayer().setRemainingAp (wstat2);
cm.dispose();
}
}
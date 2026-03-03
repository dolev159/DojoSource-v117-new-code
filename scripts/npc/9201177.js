var status;

function start() {
status = -1;
action(1, 0, 0);
}

function action(mode, type, selection) {

if (mode == -1) {
cm.dispose();
}
else {
if (status == 0 && mode == 0) {
cm.dispose();
return;
    }
}

if (mode == 1) 
   status++;

else 
   status--;
    if (status == 0) { 
cm.sendAcceptDecline("You have completed the Jumping Quest. Click accept to receive:\r\n\r\n#b1) #i 4310025# (20)\r\n2) 8 Jumping Quest Point#k.");
}else if (status == 1) {
 var map = cm.getPlayer().getMapId();
 var mapname = "Unknown MapID";
 if (map == 682000200) {
 mapname = "Ghost Chimney";
}
    cm.warp(910000000,0);
	cm.gainJQPoints(8);
	cm.gainItem(4310025, 20);
	cm.gainItem(4032024, -1);
	cm.msiMessage("[Jumping Quest Notice] Congratulations to "+cm.getPlayer().getName()+" for trying to beat the Jumping Quest without the required item.");
	cm.dispose();
}
}

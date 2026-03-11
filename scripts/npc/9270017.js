/*
    NPC: 9270017
    Description: Checks for item 4031731 and warps player to map 5400100000
*/

function start() {
    cm.sendYesNo("Would you like to proceed?");
}

function action(mode, type, selection) {
    if (mode > 0) {
        if (cm.getPlayer().itemQuantity(4031731)) {
            cm.gainItem(4031731, -1);
            cm.getPlayer().changeMap(cm.getMap(5400100000), cm.getMap(5400100000).getPortal(0));
        } else {
            cm.sendOk("You don't have the required item.");
        }
    }
    cm.dispose();
} 
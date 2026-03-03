/**
	Mr. Oh - Dungeon : Sleepywood (105040300)
**/

function start() {
    	if (cm.getPlayer().getLevel() <= 39) {
	cm.sendOk("You must be level 40 for using me");
 } else 
    cm.sendStorage();
    cm.dispose();
}
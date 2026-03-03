/**
	Mr. Mohammed - El Nath : El Nath Market (211000100)
**/

function start() {
    	if (cm.getPlayer().getLevel() <= 39) {
	cm.sendOk("You must be level 40 for using me");
 } else 
    cm.sendStorage();
    cm.dispose();
}
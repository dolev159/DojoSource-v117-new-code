/*
	Mr. Gong - Herb Town : Herb Town (251000000)
*/

function action(mode, type, selection) {
    	if (cm.getPlayer().getLevel() <= 39) {
	cm.sendOk("You must be level 40 for using me");
 } else 
    cm.sendStorage();
    cm.dispose();
}
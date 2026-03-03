/* Storage
*/

function start() {
    	if (cm.getPlayer().getLevel() <= 39) {
	cm.sendOk("You must be level 40 for using me");
 } else 
    cm.sendStorage();
}

function action(mode, type, selection) {
    cm.dispose();
}
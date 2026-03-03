/*
	Yuse - Zipangu : Showa Town (801000000)
*/

function start() {
    	if (cm.getPlayer().getLevel() <= 39) {
	cm.sendOk("You must be level 40 for using me");
 } else 
    cm.sendStorage();
    cm.dispose();
}
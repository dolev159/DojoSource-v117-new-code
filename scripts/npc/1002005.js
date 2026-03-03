/*
	NPC Name: 		Mr. Kim
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Storage
*/
function action(mode, type, selection) {
    	if (cm.getPlayer().getLevel() <= 39) {
	cm.sendOk("You must be level 40 for using me");
 } else 
    cm.sendStorage();
    cm.dispose();
}
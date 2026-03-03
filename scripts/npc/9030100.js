function start() {
 
	if (cm.getLevel() >= 50) {
   cm.sendStorage();

    cm.dispose();


	} else {
	cm.sendOk("You must be level 50 for using me.");
	cm.dispose();
	 	}
}
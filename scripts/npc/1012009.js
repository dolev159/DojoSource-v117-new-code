function start() {
 
	if (cm.getLevel() >= 40) {
   cm.sendStorage();

    cm.dispose();


	} else {
	cm.sendOk("You must be level 40 for using me.");
	cm.dispose();
	 	}
}
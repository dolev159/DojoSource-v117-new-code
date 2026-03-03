function action(mode, type, selection) {
	if (cm.getPlayer().getLevel() <= 39) {
	cm.sendOk("You must be level 40 for using me");
 } else 
    cm.sendStorage();
    cm.dispose();
}
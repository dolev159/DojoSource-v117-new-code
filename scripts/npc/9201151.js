function start() {
    status = -1; 
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else { 
        if (mode == 1) { 
            status++;
        } else { 
            status--;
        } 
    } 
    if(status == 0) { 
       cm.sendSimple("#e#bHey#k #r#h ##k.\r\n\r\n#bI do not believe you finally became to this level.\r\nThis is the stage when you can change your job, if you want to, of course#k.\r\n#r[Knowledge]#k #rIf you continue with this proccess, " +
             "#k\r\n#L0#Reset SP#l"); 
    } else if (status == 1) {         
        if (selection == 0) {
            if(cm.getPlayer().getLevel() >= 130) { 
                cm.getPlayer().resetSP(50); 
cm.teachSkill(4110012,10,10); //demon slayer   
cm.teachSkill(4340012,20,20); //demon slayer     

                cm.reloadChar();
                cm.sendOk("Enjoy being reborn!");
                cm.dispose();
            } else {
                cm.sendOk("You're level is not high enough!");
                cm.dispose(); 
            }
        } else if (selection == 1) {
            if(cm.getPlayer().getLevel() >= 200) { 
                cm.getPlayer().setLevel(1);
                cm.getPlayer().setJob(1000); 
                cm.reloadChar();
                cm.sendOk("Enjoy being reborn!");
                cm.dispose();
            } else {
                cm.sendOk("You're level is not high enough!");
                cm.dispose(); 
            }
        } else if (selection == 2) {
             if(cm.getPlayer().getLevel() >= 200) { 
                cm.getPlayer().setLevel(1);
                cm.getPlayer().setJob(2000); 
                cm.reloadChar();
                cm.sendOk("Enjoy being reborn!");
                cm.dispose();
            } else {
                cm.sendOk("You're level is not high enough!");
                cm.dispose(); 
            }
        } else if (selection == 3) {
             if(cm.getPlayer().getLevel() >= 200) { 
                cm.getPlayer().setLevel(1);
                cm.getPlayer().setJob(2200); 
                cm.reloadChar();
                cm.sendOk("Enjoy being reborn!");
                cm.dispose();
            } else {
                cm.sendOk("You're level is not high enough!");
                cm.dispose(); // 
            }
        } else if (selection == 4) {
             if(cm.getPlayer().getLevel() >= 200) { 
                cm.getPlayer().setLevel(1);
                cm.getPlayer().setJob(2300); 
                cm.reloadChar();
                cm.sendOk("Enjoy being reborn!");
                cm.dispose();
            } else {
                cm.sendOk("You're level is not high enough!");
                cm.dispose(); // 
            }
        } else if (selection == 5) {
             if(cm.getPlayer().getLevel() >= 200) { 
                cm.getPlayer().setLevel(1);
                cm.getPlayer().setJob(2400);
                cm.reloadChar();
                cm.sendOk("Enjoy being reborn!");
                cm.dispose();
            } else {
                cm.sendOk("You're level is not high enough!");
                cm.dispose(); // 
            }
        } else if (selection == 6) {
             if(cm.getPlayer().getLevel() >= 200) {
                cm.getPlayer().setLevel(1);
                cm.getPlayer().setJob(3000); 
                cm.reloadChar();
                cm.sendOk("Enjoy being reborn!");
                cm.dispose();
            } else {
                cm.sendOk("You're level is not high enough!");
                cm.dispose(); // 
            }
        } else if (selection == 7) {
             if(cm.getPlayer().getLevel() >= 200) { 
                cm.getPlayer().setLevel(1);
                cm.getPlayer().setJob(3001); 
                cm.reloadChar();
                cm.sendOk("Enjoy being reborn!");
                cm.dispose();
            } else {
                cm.sendOk("You're level is not high enough!");
                cm.dispose(); // 
            }
        } else if (selection == 8) {
             if(cm.getPlayer().getLevel() >= 200) { 
                cm.getPlayer().setLevel(1);
                cm.getPlayer().setJob(5000);
                cm.reloadChar();
                cm.sendOk("Enjoy being reborn!");
                cm.dispose();
            } else {
                cm.sendOk("You're level is not high enough!");
                cm.dispose(); //
            }
        }
    }
    else 
        cm.dispose();
    }

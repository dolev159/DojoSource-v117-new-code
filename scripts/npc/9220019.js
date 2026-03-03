var status = 0; // Final Stage 

function start() {  
    status = -1;  
    action(1, 0, 0);  
}  

function action(mode, type, selection) {  
    if (mode == -1) {  
        cm.dispose();  
    } else {  
        if (mode == 0) {  
            cm.dispose();  
            return;  
        }  
        if (mode == 1)  
            status++;  
        else  
            status--;  
        if (status == 0) {  
            cm.sendSimple("#rOMFG#k WELCOME!! FUCK IT, Just HELP ME!!, Please help me!!, OH LORD!!, theirs a ghost possessing a Snail!! HELP!!!!!!!!!\r\n#L0#Okay, chill!!#l\r\n#L1#There you Go The Job is Done!!#l");  
        } else if (selection == 0) {  
        if (cm.getPlayer().getMap().getMonsterCount() == 0) {  
        cm.summonMob(100000, 2000000000, 1, 1) 
        cm.dispose();   
        }else{    
        cm.sendOk("#rKILL IT!!!#k HURRY!!!!!!!!!!!!!!");  
        cm.dispose(); 
        } 
        } else if (selection == 1) { 
        if (cm.getPlayer().getMap().getMonsterCount() == 0) { 
        cm.sendOk("Thank you so much... Ahh thats a relief... here Take these #i4000313#GMLs! that I have in my pocket!\r\n#rYou have completed the PQ#k"); 
        cm.gainItem(4000313, 5); 
        cm.warp(910000000, 0); 
        cm.dispose();   
        }else{ 
        cm.sendOk("FUCK YOU LIAR HURRY!!!!#rKILL IT!!!#kHURRY!!!!!!!!!!!!!!"); 
        cm.dispose();              
        } 
        } 
        } 
        }  
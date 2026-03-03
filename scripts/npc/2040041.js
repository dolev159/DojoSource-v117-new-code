var status; 

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == 1) 
        status++; 
    else { 
        cm.sendOk("#e#kCome back to me when you wish to exchange your NX Points for my items."); 
        cm.dispose(); 
        return; 
    } 
                    if (status == 0) { 
        cm.sendSimple ("Hello #b#h ##k, I'm Aqua Ballon, there is you change for using my Cash system - Follow the steps for that: \r\n-----------------------------------------\r\nYou currently have:  #bVote points:#k " + cm.getVPoints() +"   #bNx Cash:#k " + cm.checkNX()  +  
		"\r\n#L1##k#bStep 1: #kEarn vote points" + 
                "\r\n#L0##k#bStep 2: #kExchange vote points for Nx Cash#l" + "\r\n\r\n#eNow choose one of these options:#k"+
                "\r\n#L2##k#b#kBuy Cash Items#l" + 
		"\r\n#L5##k#b#kExchange Vote points for cubes#l" +
		"\r\n#L6##k#b#kExchange Vote points for Anniversary coins#l");
                     } else if (selection == 1) { 
                      cm.sendOk("#bLog-in our website and vote for us, you'll get 1 VP for that.\r\nURL: Maplestory.co.il.#k"); 
                      cm.dispose(); 
                     } else if (selection == 2) { 
			if (cm.getPlayer().checkNX() == 0) {
			cm.sendOk("#b[Nx Cash System]#k You have not nx points.\r\nGo to #bstep 1#k and earn some");
			} else {
				cm.dispose();
				cm.openNpc(9000055);
}
                    } else if (selection == 0) { 
        cm.sendSimple ("Please choose the amount of NX that you would like to exchange:" + 
                 "\r\n#L8##b2,000 NX (1 Vote Point)" + 
                 "\r\n#L9#5,000 NX (2 Vote Points)" + 
                 "\r\n#L10#12,000 NX (4 Vote Points)" + 
                 "\r\n#L11#25,000 NX (10 Vote Points)" + 
                 "\r\n#L12#50,000 NX (20 Vote Points)#k"); 
        } else if (selection == 5) { 
               cm.sendSimple ("Please choose the amount of Super Miracle Cubes that you would like to exchange:" +  
            "\r\n#L23##b5 Miracle cubes (2 Vote Points)" +  
            "\r\n#L24#10 Miracle cubes (4 Vote Points)" +  
            "\r\n#L25#25 Miracle cubes (10 Vote Points)" +  
            "\r\n#L26#50 Miracle cubes (20 Vote Points)#k"); 
                    } else if (selection == 8) { 
                var price = 5000000; 
                if (cm.getVPoints() > 0) {       
                    cm.setVPoints(-1);                     
                   cm.gainNXCredit(2000);
                   cm.dispose(); 
                     } else { 
                   cm.sendOk ("You do not have enough Vote Points to exchange for 2000 NX."); 
                   cm.dispose(); 
                   } 
        } else if (selection == 6) { 
               cm.sendSimple ("Please choose the amount of Super Miracle Cubes that you would like to exchange:" +  
            "\r\n#L60##b#i 4310025# (5) (3 Vote Points)" +  
            "\r\n#L61##i 4310025# (10) (4 Vote Points)"); 
                    } else if (selection == 8) { 
                var price = 5000000; 
                if (cm.getVPoints() > 0) {       
                    cm.setVPoints(-1);                     
                   cm.gainNXCredit(4000);
                   cm.dispose(); 
                     } else { 
                   cm.sendOk ("You do not have enough Vote Points to exchange for 2000 NX."); 
                   cm.dispose(); 
                   } 
                } else if (selection == 9) { 
                var price = 10000000; 
                if (cm.getVPoints() > 1) {       
                    cm.setVPoints(-2);                     
                   cm.gainNXCredit(10000); 
                   cm.dispose(); 
                     } else { 
                   cm.sendOk ("You do not have enough Vote Points to exchange for 1,000 NX."); 
                   cm.dispose(); 
                         }
		} else if (selection == 5) { 
               cm.sendSimple ("Please choose the amount of Super Miracle Cubes that you would like to exchange:" +  
            "\r\n#L23##b5  (1 Vote Points)" +  
            "\r\n#L24#15   (2 Vote Points)" +  
            "\r\n#L25#20   (3 Vote Points)" +  
            "\r\n#L26#30   (4 Vote Points)#k");
                } else if (selection == 10) { 
                var price = 15000000; 
                if (cm.getVPoints() > 3) {       
                    cm.setVPoints(-4);                     
                   cm.gainNXCredit(24000);
                   cm.dispose(); 
                     } else { 
                   cm.sendOk ("You do not have enough Vote Points to exchange for 2,000 NX."); 
                   cm.dispose(); 
                   } 
                } else if (selection == 11) { 
                var price = 20000000; 
                if (cm.getVPoints() > 9) {       
                    cm.setVPoints(-10);                     
                   cm.gainNXCredit(50000); 
                   cm.dispose(); 
                     } else { 
                   cm.sendOk ("You do not have enough Vote Points to exchange for 5,000 NX."); 
                   cm.dispose(); 
                   } 
                } else if (selection == 12) { 
                if (cm.getVPoints() > 19) {       
                    cm.setVPoints(-20);                     
                   cm.gainNXCredit(100000); 
                   cm.dispose(); 
                     } else { 
                   cm.sendOk ("You do not have enough Vote Points to exchange for 10,000 NX."); 
                   cm.dispose(); 
} 
}  
else if (selection == 23) { 
                if (cm.getVPoints() > 0) {    
                    cm.setVPoints(-1);  
        cm.gainItem(5062002, 5); 
        cm.sendOk("Enjoy your Super Miracle Cubes"); 
        cm.dispose(); 
      } else { 
        cm.sendOk("You do not have enough Vote Points to exchange for 5 Super Miracle Cubes.") 
        cm.dispose(); 
        } 
    } 
else if (selection == 24) { 
                if (cm.getVPoints() > 1) {    
                    cm.setVPoints(-2);  
        cm.gainItem(5062002, 15); 
        cm.sendOk("Enjoy your Super Miracle Cubes"); 
        cm.dispose(); 
      } else { 
        cm.sendOk("You do not have enough Vote Points to exchange for 10 Super Miracle Cubes.") 
        cm.dispose(); 
        } 
    } 
else if (selection == 25) { 
                if (cm.getVPoints() > 2) {    
                    cm.setVPoints(-3);  
        cm.gainItem(5062002, 20); 
        cm.sendOk("Enjoy your Super Miracle Cubes"); 
        cm.dispose(); 
      } else { 
        cm.sendOk("You do not have enough Vote Points to exchange for 25 Super Miracle Cubes.") 
        cm.dispose(); 
        } 
    } 
else if (selection == 26) { 
                if (cm.getVPoints() > 3) {    
                    cm.setVPoints(-4);  
        cm.gainItem(5062002, 30); 
        cm.sendOk("Enjoy your Super Miracle Cubes"); 
        cm.dispose(); 
      } else { 
        cm.sendOk("You do not have enough Vote Points to exchange for 50 Super Miracle Cubes.") 
        cm.dispose(); 
        } 
    }  
else if (selection == 60) { 
                if (cm.getVPoints() > 0) {    
                    cm.setVPoints(-3);  
        cm.gainItem(4310025, 5); 
        cm.sendOk("Enjoy your #b7th anniversary coins#k"); 
        cm.dispose(); 
      } else { 
        cm.sendOk("You do not have enough Vote Points to exchange for 5 7th anniversary coins.") 
        cm.dispose(); 
        } 
    } 
else if (selection == 61) { 
                if (cm.getVPoints() > 0) {    
                    cm.setVPoints(-4);  
        cm.gainItem(4310025, 10); 
        cm.sendOk("Enjoy your #b7th anniversary coins#k"); 
        cm.dispose(); 
      } else { 
        cm.sendOk("You do not have enough Vote Points to exchange for 10 7th anniversary coins.") 
        cm.dispose(); 
        } 
    } 
    }  
















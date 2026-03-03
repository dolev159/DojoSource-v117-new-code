status = -1; 
function start() { 
action(1,0,0); 
} 
function action(mode, type, selection) { 
status++; 
if(mode != 1){ 
if(mode == 0 && status == 4) 
status -= 2; 
else{ 
cm.dispose(); 
return; 
} 
} 
if (cm.getPlayer().getMapId() == 800000000) { 
if (status == 0)  
cm.sendSimple("hey:" + cm.getWarnings()); 
else if (status == 1) { 
if (selection == 0) { 
cm.sendNext("hey:" + cm.getWarnings()); 
} else if (selection == 1) { 
cm.sendOk("OK. If you ever change your mind, please let me know."); 
cm.dispose(); 
} 
} else if (status == 2) { 
var map = cm.getPlayer().getSavedLocation("WORLDTOUR"); 
if (map == undefined) 
map = 104000000; 
cm.warp(map, parseInt(Math.random() * 5)); 
cm.dispose(); 
} 
}  else { 
if (status == 0)  
cm.sendNext("hey:" + cm.getWarnings()); 
else if (status == 1)  
cm.sendSimple("We currently offer this place for you traveling pleasure: #bMushroom Shrine of Japan#k. I'll be there serving you as the travel guide. Rest assured, the number of destinations will be increase over time. Now, would you like to head over to the Mushroom Shrine?#b\r\n#L0#Yes, take me to Mushroom Shrine (Japan)"); 
else if (status == 2) 
cm.sendNext("Would you like to travel to #bMushroom Shrine of Japan#k? If you desire to feel the essence of Japan, there's nothing like visiting the Shrine, a Japanese cultural melting pot. Mushroom Shrine is a mythical place that serves the incomparable Mushroom God from ancient times."); 
else if (status == 3) { 
if(cm.getMeso() < 3000){ 
cm.sendNext("You don't have enough mesos to take the travel."); 
cm.dispose(); 
return; 
} 
cm.sendNextPrev("Check out the female shaman serving the Mushroom God, and I strongly recommend trying Takoyaki, Yakisoba, and other delocious food sold in the streets of Japan. Now, let's head over to #bMushroom Shrine#k, a mythical place if there ever was one."); 
} else if (status == 4) { 
cm.gainMeso(-3000);  
cm.warp(800000000); 
cm.getPlayer().saveLocation("WORLDTOUR");			
cm.dispose(); 
}
}
}  
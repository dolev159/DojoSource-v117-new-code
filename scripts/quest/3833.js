/*
    Name: 尋找不夠的藥材 (Finding Ingredient)
    Map: 靈藥幻境 (Herb Town)
    ID: 3833
    Nexus Omni v117 Standard
*/

var milestones = [1, 10, 50, 100, 200, 300, 500, 700, 900, 1000];
var rewardItems = [2001500, 2022144, 2020007, 2020008, 2001513, 2001528, 2001530, 2000012, 2001530, 2000019];
var rewardQtys = [1, 10, 50, 50, 50, 50, 50, 50, 50, 50];
var rewardExps = [90, 9000, 90000, 195000, 210000, 219000, 2105028, 2105028, 2105028, 2105028];

var Text1 = [
    "I guess you got SOMETHING for me. I'll take those",
    "So... this is really the best you could do? Huh. Let me take those",
    "Really? That's it? It's not bad, but I think you could've done better. I'll take those",
    "Honestly it's not quite enough, but I'm desperate. Here, I'll take those",
    "Good. This should be enough to keep Tae Sang happy. I'll take those",
    "Hm... I hope Tae Sang will be satisfied for a while. Thanks. I'll take those",
    "This is a lot! Tae Sang will be set for a while. Here, I'II take those",
    "Oh, wow... I am sure gathering these wasn't easy. Thank you very much. Here, I'll take those",
    "Did YOU gather all of these? A-amazing... I had no idea you were so powerful. Let me have those",
    "Ha... ha ha ha. Do you have supernatural powers? How many Sr. Bellflower Roots did you have to sacrifice? In any event, thank you. Hand over those"
];

var Text2 = "What do you have in your inventory anyway? Please make some room so I can give you something.";

var Text3 = [
    "I don't think I'll be able to talk to Tae Sang for a while after this...",
    "I don't know how I am going to face Tae Sang with this...",
    "If only I had more with me... then I wouldn't have resorted to this.",
    "Sigh. Tae Sang will be complaining for a while..",
    "Now I'll have to really dry these Bellflowers. They need to be dried in order to be used as a medicinal ingredient.",
    "This should be enough for Tae Sang.",
    "It won't be easy loading all these Bellflowers on the ship. I may have to ask for help...",
    "Hmmm... I don't know if I can put all this on the boat.",
    "How am I going to carry all this to Mu Lung...?",
    "I think this will be enough to make Tae Sang faint..."
];

var status = -1;
var x = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        if (qm.getQuestStatus(3833) == 0) {
            qm.forceStartQuest();
            qm.dispose();
            return;
        }

        var qty = qm.getPlayer().itemQuantity(4000294);
        for (var i = 0; i < milestones.length; i++) {
            if (qty >= milestones[i]) {
                x = i;
            }
        }

        if (x == -1) {
            qm.sendOk("You don't have enough #t4000294#. Please bring me at least 1.");
            qm.dispose();
            return;
        }

        var suffix = (x == 0 ? " items#k now." : x == 8 ? "#k items, please." : x == 9 ? "#k items, if you would." : " items#k you got for me.");
        var msg = Text1[x] + " #b" + qty + " #t4000294#" + suffix;
        msg += "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v" + rewardItems[x] + "# " + rewardQtys[x] + " #t" + rewardItems[x] + "#";
        msg += "\r\n#fUI/UIWindow.img/QuestIcon/8/0# " + rewardExps[x] + " exp";
        
        qm.sendNext(msg);

    } else if (status == 1) {
        if (qm.getInventory(2).getNumFreeSlot() < 1) { // 2 = USE
            qm.sendOk(Text2);
            qm.dispose();
            return;
        }
        
        qm.removeAll(4000294);
        qm.gainItem(rewardItems[x], rewardQtys[x]);
        qm.gainExp(rewardExps[x]);
        qm.forceCompleteQuest(3833);
        qm.sendOk(Text3[x]);
    } else if (status == 2) {
        qm.dispose();
    }
}
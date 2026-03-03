/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
               Matthias Butz <matze@odinms.de>
               Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 *9201142 - Witch Malady - Haunted House
 *@author BubblesDev v75 (Moogra)
 *@author DstroyerDev v83 (Revan)
 */

function start() {
    cm.sendNext("Nice to meet you!");
    cm.dispose();
}

/*
 * creditz: nico, kane, jorn
 */
var status = 0;
var items_10   = [
2044713, // scroll for claw attack 50%
2044613, // scroll for crossbow for attack 50%
2044513, // scroll for bow for attack 50%
2044420, // scroll for polearm for attack 50%
2044320, // scroll for spear for attack 50%
2044220, // scroll for two handed blunt weapon for attack 50%
2044120, // scroll for two handed axe for attack 50%
2044028, // scroll for two handed sword for attack 50%
2043813, // scroll for staff for magic attack 50%
2043713, // scroll for wand for magic attack 50%
2043313, // scroll for dagger for attack 50%
2043220, // scroll for one handed blunt weapon for attack 50%
2043120, // scroll for one handed axe for attack 50%
2043022, // scroll for one handed sword for attack 50%
2040834, // scroll for gloves for attack 50%
2040542, // scroll for armor for dex 50%
2040333, // scroll for earring for int 50%
2044817, // scroll for knuckler for attack 50%
2044910, // scroll for gun for attack 50%
1302107, // black crystal blade
5220000, // 10 Gacha Tickets
2022179, // 3 Onyx Apple
2022282, // 2 Naricain's Demon Elexir
2070018, // 1 Balanced Furies
4310025, // 7th coin
1132004, // black belt
1132014, // witch's crimson belt
1132015, // witch's ocean blue belt
1132016, // witch's deep purple belt
];
var qtyitems_10   = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, // 50%'s
1,10,3,2,1,1,1,1,1,1]; // other shet
var items_30   = [
2044713, // scroll for claw attack 50%
2044613, // scroll for crossbow for attack 50%
2044420, // scroll for polearm for attack 50%
2044320, // scroll for spear for attack 50%
2044220, // scroll for two handed blunt weapon for attack 50%
2044120, // scroll for two handed axe for attack 50%
2044028, // scroll for two handed sword for attack 50%
2043813, // scroll for staff for magic attack 50%
2043713, // scroll for wand for magic attack 50%
2043313, // scroll for dagger for attack 50%
2043220, // scroll for one handed blunt weapon for attack 50%
2043120, // scroll for one handed axe for attack 50%
2043022, // scroll for one handed sword for attack 50%
2040834, // scroll for gloves for attack 50%
2040542, // scroll for armor for dex 50%
2040333, // scroll for earring for int 50%
2044817, // scroll for knuckler for attack 50%
2044910, // scroll for gun for attack 50%
2040921, // dark scroll for shield for magic att 70%
2040922, // dark scroll for shield for magic att 30%
2040916, // dark scroll for shield for weapon att 70%
2040917, // dark scroll for shield for weapon att 30%
2044004, // dark scroll for two handed sword for attack 70%
2044005, // dark scroll for two handed sword for attack 30%
2044204, // dark scroll for two handed blunt weapon for attack 70%
2044205, // dark scroll for two banded blunt weapon for attack 30%
2044104, // dark scroll for two handed axe for attack 70%
2044105, // dark scroll for two handed axe for attack 30%
2043804, // dark scroll for staff for magic attack 70%
1152062, // dark scroll for staff for magic attack 30%
2043704, // dark scroll for wand for magic attack 70%
2043705, // dark scroll for wand for magic attack 30%
2043004, // dark scroll for one handed sword for attack 70%
2043005, // dark scroll for one handed sword for attack 30%
2043204, // dark scroll for one handed blunt weapon for attack 70%
2043205, // dark scroll for one handed blunt weapon for attack 30%
1032104, // dark scroll for one handed axe for  attack 70%
2043105, // dark scroll for one handed axe for attack 30%
2044704, // dark scroll for claw for attack 70%
2044705, // dark scroll for claw for attack 30%
2043304, // dark scroll for dagger for attack 70%
2043305, // dark scroll for dagger for attack 30%
2044304, // dark scroll for spear for attack 70%
2044305, // dark scroll for spear for attack 30%
2044404, // dark scroll for polearm for attack 70%
1032103, // dark scroll for polearm for attack 30%
2044903, // dark scroll for gun for attack 70%
2044904, // dark scroll for gun for attack 30%
2044803, // dark scroll for knuckler for attack
2043605, // dark scroll for knuckler for attack 30%
2044504, // dark scroll for bow for attack 70%
2044505, // dark scroll for bow for attack 30%
2044604, // dark scroll for crossbow for attack 70%
2044605, // dark scroll for crossbow for attack 30%
2040508, // dark scroll for overall armor for dex 70%
2040509, // dark scroll for overall armor for dex 30%
2040518, // dark scroll for overall armor for int 70%
1152079, // dark scroll for overall armor for int 30%
2040520, // dark scroll for overall armor for luk 70%
2043601, // dark scroll for overall armor for luk 30%
2040531, // dark scroll for overall armor for str 70%
2040533, // dark scroll for overall armor for str 30%
2040810, // dark scroll for gloves for attack 70%
2040811, // dark scroll for gloves for attack 30%
2040814, // dark scroll for gloves for magic attack 70%
2040815, // dark scroll for gloves for magic attack 30%
2040304, // dark scroll for earring for int 70%
2012008, // dark scroll for earring for int 30%
2040306, // dark scroll for earring for dex 70%
2040307, // dark scroll for earring for dex 30%
2040320, // dark scroll for earring for LUK 70%
2040322, // dark scroll for earring for luk 30%
2340000, // 2 White Scroll
2049100, // 2 Chaos Scroll
1072344, // Facestompers
2022069, // 10 Red Cider
2022179, // 1 Onyx Apple
2022282, // 1 Naricain's Demon Elexir
1452044, // Dragon Shiner Bow
1472051, // Dragon Green Sleve
1472052, // Dragon Purple Sleve
1462039, // Dragon Shiner Cross
1332049, // Dragon Kanzir
1332050, // Dragon Kreda
1312031, // Dragon Axe
1322052, // Dragon Mace
1302059, // Dragon Carabella
2070016, // Dragon Chelbird
1432038, // Dragon Faltizan
1382036, // Dragon Staff
1412026, // Dragon Battle Axe
1422028, // Dragon Flame
1402036, // Dragon Claymore
1372032, // Dragon Wand
1482013, // Dragon Slash Claw
1492013, // Dragonfire Revolver
1402051, // Dusk Raven's Wing
1412040, // Redner
1452060, // Crimson Arclancer
1472073, // Night Raven's Claw
1422031, // Blue Seal Cushion
1432048, // Pooh Pooh Shovel
1432056, // Stormshear
1442002, // Eviscerator
1442068, // Crimson Arcglaive
1442057, // Purple Surfboard
1102207, // Goldensoul Cape
1102194, // Shroud of Zakum
1102206, // Blackfist Cloak
1102205, // Crimsonheart Cloak
1072321, // Canopus Boots
1082216, // Canopus Glove
1002649, // Canopus Hat
1052134, // Canopus Suit
2070016, // 1 Crystal Ilbi Throwing Stars
2330004, // Shiny Bullet
2060004, // 1000 Crystal Arrows for bow (+4attk)
2061004, // 1000 Crystal arrows for xbow (+4att)
1132002, // blue belt
1132003, // red belt
1022082, // spectrum goggles
4310025, // 7th coin
1022103, // Archeologist's glasses(2)
1022089, // Archeologist's glasses(3)
1022088, // Archeologist's glasses(1)
1012071, // chocolate icecream bar
];
var qtyitems_30   = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2, // 50%'s
3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, // 30%'s & 70%'s
2,2,1,10,1,1, // pots, good scrolls
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // dragon eq
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // other very good eq
1000,1000, // good arrows
1,1,1,1,1,1,1,1 // belt, glasses,bars
];
var items_50   = [
2044713, // scroll for claw attack 50%
2044613, // scroll for crossbow for attack 50%
2044513, // scroll for bow for attack 50%
2044420, // scroll for polearm for attack 50%
2044320, // scroll for spear for attack 50%
2044220, // scroll for two handed blunt weapon for attack 50%
2044120, // scroll for two handed axe for attack 50%
2044028, // scroll for two handed sword for attack 50%
2043813, // scroll for staff for magic attack 50%
2043713, // scroll for wand for magic attack 50%
2043313, // scroll for dagger for attack 50%
2043220, // scroll for one handed blunt weapon for attack 50%
2043120, // scroll for one handed axe for attack 50%
2043022, // scroll for one handed sword for attack 50%
2040834, // scroll for gloves for attack 50%
2040542, // scroll for armor for dex 50%
2040333, // scroll for earring for int 50%
2044817, // scroll for knuckler for attack 50%
2044910, // scroll for gun for attack 50%
2040921, // dark scroll for shield for magic att 70%
2040922, // dark scroll for shield for magic att 30%
2040916, // dark scroll for shield for weapon att 70%
2040917, // dark scroll for shield for weapon att 30%
2044004, // dark scroll for two handed sword for attack 70%
1152068, // dark scroll for two handed sword for attack 30%
2044204, // dark scroll for two handed blunt weapon for attack 70%
2044205, // dark scroll for two banded blunt weapon for attack 30%
2044104, // dark scroll for two handed axe for attack 70%
2044105, // dark scroll for two handed axe for attack 30%
2043804, // dark scroll for staff for magic attack 70%
2043805, // dark scroll for staff for magic attack 30%
2043704, // dark scroll for wand for magic attack 70%
2043705, // dark scroll for wand for magic attack 30%
2043004, // dark scroll for one handed sword for attack 70%
2043005, // dark scroll for one handed sword for attack 30%
2043204, // dark scroll for one handed blunt weapon for attack 70%
2043205, // dark scroll for one handed blunt weapon for attack 30%
2043104, // dark scroll for one handed axe for  attack 70%
2043105, // dark scroll for one handed axe for attack 30%
2044704, // dark scroll for claw for attack 70%
2044705, // dark scroll for claw for attack 30%
2043304, // dark scroll for dagger for attack 70%
2043305, // dark scroll for dagger for attack 30%
2044304, // dark scroll for spear for attack 70%
2040759, // dark scroll for spear for attack 30%
2044404, // dark scroll for polearm for attack 70%
2044405, // dark scroll for polearm for attack 30%
2044903, // dark scroll for gun for attack 70%
2044904, // dark scroll for gun for attack 30%
2044803, // dark scroll for knuckler for attack 70%
2044803, // dark scroll for knuckler for attack 30%
2044504, // dark scroll for bow for attack 70%
2044505, // dark scroll for bow for attack 30%
2044604, // dark scroll for crossbow for attack 70%
2044605, // dark scroll for crossbow for attack 30%
2040508, // dark scroll for overall armor for dex 70%
2040509, // dark scroll for overall armor for dex 30%
2040518, // dark scroll for overall armor for int 70%
2040519, // dark scroll for overall armor for int 30%
2040520, // dark scroll for overall armor for luk 70%
2040521, // dark scroll for overall armor for luk 30%
1112920, // dark scroll for overall armor for str 70%
2040533, // dark scroll for overall armor for str 30%
2040810, // dark scroll for gloves for attack 70%
2040811, // dark scroll for gloves for attack 30%
2040814, // dark scroll for gloves for magic attack 70%
2040815, // dark scroll for gloves for magic attack 30%
2040304, // dark scroll for earring for int 70%
2040759, // dark scroll for earring for int 30%
2040306, // dark scroll for earring for dex 70%
2040307, // dark scroll for earring for dex 30%
2040320, // dark scroll for earring for LUK 70%
2040322, // dark scroll for earring for luk 30%
1012011, // rudolphs Red Nose (str)
1012012, // rudolphs Red Nose (dex)
1012013, // rudolphs Red Nose (int)
1012014, // rudolphs Red Nose (luk)
1012015, // rudolphs Red Nose (W.ATK)
1012017, // rudolphs Red Nose (M.ATK)
2340000, // 1 White Scroll
1072427, // Red Christmas Sock
1082223, // Stormcaster Glove
1082149, // Brown Work Glove
1082228, // Green Mittens
5220000, // 5 Gachapon Tickets
2049100, // 1 Chaos Scroll
4001126, // 800 Leaves
4001126, // 1280 Leaves
2022069, // 5 Red Cider
3010001, // Sky blue wooden chair
3010002, // Green Chair
3010003, // Red Chair
3010006, // Yellow chair
3010009, // Red round chair
3010013, // Beach chair
3010014, // Moon star chair
3010018, // Palm tree beach chair
3011000, // Fishing chair
3010045, // Ice Chair
3010046, // Dragon chair (inferno)
3010047, // Dragon chair (abyss)
3010072, // Miwok cheifs chair
4310025, // 7th coin
3010060, // Noblesse chair
3010062, // Bamboo chair
3010067, // Red designer chair
3010043, // Halloween broomstick chair
3010071, // Mini Shinsoo chair
3010085, // Olivia’s chair
3010116, // the spirit of rock chair
3010044, // winter red chair
3010106, // Ryko chair
3010111, // tiger skin chair
3012010, // half heart chocolate cake chair
3012011, // chocolate fondue chair
3010069, // yellow robot chair
3010073, // Giant pink bean cushion
3010064, // Male desert rabbit cushion
1372039, // Elemental Wand 5
1372040, // Elemental Wand 6
1372041, // Elemental Wand 7
1372042, // Elemental Wand 8
1382049, // Elemental Staff 5
1382050, // Elemental Staff 6
1382051, // Elemental Staff 7
1382052, // Elemental Staff 8
1082168, // Blue Dragon Gauntlet
1072273, // Blue Dragon Boots
1002551, // Blue Dragon Helmet
1052075, // Blue Dragon Armor
1082164, // Blue Elemental Gloves
1002773, // Gold Dragon Crown
1052076, // Blue Czar
1072268, // Blue Elemental Shoes
1082167, // Black Garina Gloves
1002550, // Black Garina Hood
1052072, // Black Garina
1072272, // Black Garina Shoes
1082163, // Red Hunter Gloves
1002547, // Red Hunter
1072269, // Red Hunter Shoes
1402037, // Stonetooth Sword
2022273, // 1 Siwss Cheese
2022273, // 3 Siwss Cheese
2022283, // 1 Subani Mystic w/e shitty M.ATK potion
2022245, // 3 Heartstoppers
2022245, // 6 Heartstoppers
2070006, // 1 Ilbi Throwing Stars
2330003, // Vital Bullet
1072239, // Yellow Snowshoes
1102041, // Pink Adventurer Cape
1102084, // Pink Gaia Cape
1102042, // Purple Adventurer Cape
1102086, // Purple Gaia Cape
1132000, // white belt
1132001, // yellow belt
1122007, // Spiegelmann's Necklace
1122058, // Spiegelmann's Necklace of chaos
1122014, // Silver Deputy Star
1032026, // Gold Emerald Earrings
1112405, // lilin's ring(3)
1112413, // lilin's ring(1)
1112414, // lilin's ring(2)
1112401, // spiegelmann's ring(W.atk)
1112402, // spiegelmann's ring(m.atk)
1052167, // Ultimate Agent overall
];

var qtyitems_50   = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // 50%'s
2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2, // 30%'s & 70%'s
1,1,1,1,1,1, // nose
1,1,1,1,1, // ws, random eq
5,1,1280,2500,100,100,100,5, // pitches; leaves, tix
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // chairs
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // ele & dragon eq
1,3,1,3,6,1,1, // pots, stars, bullets
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 // other eq
];
var items      = new Array(items_10,items_30,items_50);
var quantities = new Array(qtyitems_10,qtyitems_30,qtyitems_50);

function start() {
    status = 0;
    action (1, 0, 0);
}

function action(mode, type, selection) {
	if (cm.getPlayer().getLevel() <= 39) {
		cm.sendOk("You must be level 40 for using me");
	} else {
    if (mode == -1 || (mode == 0 && status == 0)) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 1) {
            cm.sendYesNo("#rHello #b #h ##k, iff you bring me the following: \r\n\r\n#v4310025# #b#z4310025# x 1#k \r\n\r\n I will give you: \r\n\r\n #fUI/UIWindow.img/QuestIcon/4/0# \r\n\r\n #fUI/UIWindow.img/QuestIcon/5/0# #bx 1 Mysterious Prize#k \r\n\r\n #fUI/UIWindow.img/QuestIcon/6/0#  #bx 1#k");
        } else if (status == 2) {
            if (cm.haveItem(4310025, 1)) { //Halloween Candy
                chance = Math.ceil(Math.random() * 100);
                var type_ = 2;
                if (chance <= 10) {
                    type_ = 0;
                } else if (chance <= 30){
                    type_ = 1;
                }
                random = Math.floor(Math.random() * items[type_].length);
                itemid = items[type_][random];
                quantity = quantities[type_][random];
                if (cm.canHold(itemid)) {
                    cm.gainItem(itemid, quantity);
                    cm.gainItem(4310025, -1); //Halloween Candy
                    cm.sendOk("Thank you for the #v4310025# #b#z4310025# x 1#k #h #! \r\n\r\n #fUI/UIWindow.img/QuestIcon/4/0# \r\n\r\n #v" + itemid + "# #b#z" + itemid + "# x " + quantity + "#k \r\n\r\n #fUI/UIWindow.img/QuestIcon/6/0#  #bx 1#k");
                    cm.dispose();
                } else {
                    cm.sendOk("Make some space in all of your inventories before giving candy to strangers."); //lmfao I had too <3
                    cm.dispose();
                }
            } else {
                cm.sendOk("I'm sorry #h #, in order to receive:\r\n\r\n#fUI/UIWindow.img/QuestIcon/5/0# #bx 1 Mysterious Prize#k \r\n\r\n #fUI/UIWindow.img/QuestIcon/6/0#  #bx 1#k \r\n\r\n #fUI/UIWindow.img/QuestIcon/8/0#  #bx 10,000#k \r\n\r\n #fUI/UIWindow.img/QuestIcon/7/0#  #bx 100,000#k \r\n\r\n You need to have the following: \r\n\r\n\ #v4310025# #b#z4310025# x 1#k");
                cm.dispose();
            }
        }
    }
} 
}
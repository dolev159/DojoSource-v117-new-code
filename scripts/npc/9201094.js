/*
	名字:	克倫
	地圖:	新葉城-市區中心
	描述:	600000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (type == 5) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendSimple("Salu o'kahari, friend! Oh.. what does that mean, you ask? Forgive me, it simply means 'Hello' in the Taru tongue. \r\n#L0##bUm, saloo oh-ka.. er, hello to you too! Who are you, may I ask, and why are you speaking Taru?#l");
		break;
	case 1:
		cm.sendNext("I am Corine. And this lovable orange scruff of fur is my friend, Khafre. <Khafre growls> Oh, be quiet, Khaffy... you know I think you look quite handsome and are really not the least bit scruffy. Khafre is quite proud even for a tiger and can be a bit sensitive sometimes. In answer to your question, I speak Taru because it is the language of my ancestors; I am a Ranger descended from the Taru Tribe of ancient Masteria. Even though not many people speak it today, I speak it because it is part of who I am.");
		break;
	case 2:
		cm.sendSimple("It's important to remember the traditions of your ancestors and keep them alive, don't you think? \r\n#L0##bYes, we can learn a lot about ourselves from our past to help guide us for the future.#l\r\n#L1#I've never heard of the Taru. Ancient history, eh? Out with the old and in with the new, is what I say!#l");
		break;
	default:
		if (status == 3 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 3:
		cm.sendSimple("My, my! Such wisdom from one so young! What do you think of this one, Khafre? <Khafre eyes you and purrs> That's what I think too. I meet many people through my travels, but not all of them show the maturity that you have with your words. Allow me to tell you about Khafre and myself. We are originally from Henesys, but have traveled back here to Masteria to the homeland of my ancestors. \r\n#L0##bPlease.. tell me more about your ancestors, the Taru.#l");
		break;
	case 4:
		cm.sendNext("Surely. In ancient Masteria, hundreds and hundreds of years ago, there was a proud tribe of mystical jungle warriors named the Taru. They inhabited what is now known as the Krakian Jungle. Even though they could be fierce fighters, the Taru were a peaceful people, and lived in harmony with the jungle and the creatures which dwelled within.");
		break;
	case 5:
		cm.sendNextPrev("They believed that every human soul had an animal counterpart, and accordingly, every Taru warrior was bonded with an animal companion at birth. The two remained inseparable through life, learning to live and fight together. Such was the nature of that bond, that the strength of the relationship between the warrior and his or her pet actually became manifest in the power of the warrior's weapon.");
		break;
	case 6:
		cm.sendSimple("\r\n#L2##bSo what happened to them? Are there still Taru in the Krakian Jungle today?#l\r\n#L3#Speaking of a weapon, that's a powerful looking bow you've got there...#l\r\n#L4#Sorry, Corine, but if the Taru Tribe disappeared from Masteria over a thousand years ago, how do you know you are descended from them?#l");
		break;
	default:
		if (status == 7 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 3:
		cm.sendOk("<shakes her head> There is an old Taru saying: If one does not mark one's path, one is doomed to walk in circles. After all, how can you tell where you're going, if you don't know where you're starting from? I bid you goodbye. May the Jungle Spirit guide your path.");
		break;
	case 4:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 7:
		cm.sendNext("I...Sadly, I must say no. Even before the disappearance of the Masterian continent a thousand years ago, the Taru had vanished from the jungle. All I know is that Masterian history says that it was the Krakians that drove them from the jungle...and perhaps wiped them out. But this makes no sense because the Krakians were peaceful, gentle creatures, and the Taru lived in peace alongside them for hundreds of years!");
		break;
	case 8:
		cm.sendSimple("I know that in the millenium that has passed, finding a clue here now to their disappearance is like pinpointing a whisper in the dark. But in my heart, I believe that something of my ancestor's tribe still remains in the Jungle! It must! You may not believe me, but in my blood, I can hear the Jungle Spirit calling to me... I heard her from across the sea in Henesys, the night that Masteria returned. This is what brings me here to my ancestor's homeland... to learn what happened to my people and the facts behind their disappearance! This is my Spirit Quest. \r\n#L0##bIf I find anything in my travels in the jungle relating to the Taru, I'll let you know.#l");
		break;
	case 9:
		cm.sendOk("Thank you, friend. Perhaps the Jungle Spirit has brought our paths together for a reason. I look forward to speaking again with you soon. O'hana taru'teha... which means, May the Jungle Spirit guide your path.");
		break;
	case 10:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 7:
		cm.sendNext("This? Yes. This bow is called an Akhamagna, such a Taru weapon. I have used it all my life. It has been with me since I was a little girl... just like Khafre here. <Khafre purrs> Yes, my furry orange friend, it has been a good journey... Sorry. As I was saying...");
		break;
	case 8:
		cm.sendNextPrev("As with their animal companion, a Taru brave was introduced to his or her weapon at an early age. When a Taru babe was old enough to crawl, the child was placed in front of an array of weapons: a bow, a crossbow, a claw, and so forth. Whichever the babe would crawl to first would be the one in which the child would be trained, and became the child's chosen weapon through life. The Taru brave kept her weapon throughout her development as a warrior... and warrior, weapon and pet would grow together.");
		break;
	case 9:
		cm.sendSimple("What do you mean 'grow'?");
		break;
	case 10:
		cm.sendNext("You see, Taru weapons are very special in that they were created from the Jungle. And because of this, the weapons carry the spirit of the jungle within them. As I said, the Taru warrior and her pet were inseparable, and their life journeys brought them even closer together. The spirit within the Taru warrior's weapon could sense this bond, and when the time was right, the Taru brave and her animal companion could undertake a special quest called the Spirit Quest. When the two finally returned from their quest, a mystic ritual could be performed allowing the spirit within the weapon to recognize the stronger bond between warrior and pet. The spirit within could thus attain an enhanced 'Suma' form, or even more powerful 'Magna' form, making the warrior's weapon even stronger than before.");
		break;
	case 11:
		cm.sendSimple("Wow...so all Taru weapons can be upgraded, so to speak?");
		break;
	case 12:
		cm.sendNext("Yes, that is so. However, not every brave was allowed to undertake this Spirit Quest. Only those who were judged to be worthy, those who had been given a #bSpirit Feather#k, could do so.");
		break;
	case 13:
		cm.sendPrev("There are two stages of the Spirit Quest, the #bSuma#k and then the #bMagna#k. The Suma stage required #bone such Feather#k to begin, and the subsequent Magna stage required #btwo#k Khafre and I, we have undertaken this Spirit Quest to the Magna stage, and accordingly, my Akhamagna is many times more powerful than the simple Akha I wielded as a young girl. Should you find a Taru weapon or object in your travels, bring it back to me, and I shall tell you more...");
		break;
	case 14:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 7:
		cm.sendSimple("<Khafre growls menacingly> Khafre! Stop that. Our friend asks a legitimate question. To tell you the truth, I thought myself to be like any other Victorian Islander when I was born, and did not discover who my ancestors were until I was much older. You see, I did not know my parents, and was raised by my nana, my grandmother, who passed away a few years ago. \r\n#L0##bI am sorry to hear that...#l");
		break;
	case 8:
		cm.sendNext("The Jungle Spirit teaches us that death is a part of life, and not a sorrowful occasion when the one passing on has come to the end of a long and full journey, but I thank you tor your sentiment, friend.");
		break;
	case 9:
		cm.sendNextPrev("My nana never told me of my heritage until she lay on her deathbed, but even so, she raised me in the old Taru ways, pairing me with Khaffy when I was a baby, giving me an Akha, telling me Taru legends in the form of bedtime stories, and teaching me to love and respect the natural order of things. Before she passed on to the next world, she gave me an ancient charm, which she claimed belonged to a legendary Taru chieftain named Teharu. She said it was my birthright, and that one day, I had to leave Henesys and follow it.");
		break;
	case 10:
		cm.sendPrev("At first, I didn't understand and thought it hard to believe her... but then one night, I felt it in my blood, and the next morning, I heard news that the lost continent of Masteria had returned. I do not claim to know everything about the Taru, or what my purpose in this life to be, but I know that my place is here, in the land of my ancestors.");
		break;
	case 11:
		cm.dispose();
}
}
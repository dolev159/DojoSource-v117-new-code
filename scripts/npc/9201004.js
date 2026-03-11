/*
	名字:	文森
	地圖:	結婚小鎮
	描述:	680000000
*/

var select = -1;

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
		if (status < 1) {
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
		cm.sendSimple("Greetings Traveler! I trust your adventures have proven lively thus far. My name is Ames the Wise, and I'm the oldest citizen in Amoria. I can offer a lifetime's worth of advice if you want to get married. Would you like to know more? \r\n#L0##bYes, I'm interested in marriage.#l\r\n#L1#No, no...I'm definitely not ready for that. But I'd still like to see what Amoria's about. Do I have to be married?#l\r\n#L2#Ok, I think I'll talk to some people around here.#l\r\n#L3#How do I get engaged?#l\r\n#L4#How do I get married?#l\r\n#L5#I want to be married in the White Wedding Chapel!#l\r\n#L6#I want the wedding of my dreams in the Cathedral!#l\r\n#L7#How do I invite my friends?#l\r\n#L8#What happens after the Wedding?#l\r\n#L9#What's the difference between normal and Premium Weddings?#l\r\n#L10#What about Marriage Benefits?#l\r\n#L11#How do I get my marriage annulled?#l\r\n#L12#Ok, I understand the system. Thank you!#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Ready to get married, eh? First things first-congratulations! I'm happy for you. Second, you'll need to get engaged. After that, figure out where you want to get married-at the Cathedral or the White Wedding Chapel. Both are great places as far as I'm concerned.");
		break;
	case 2:
		cm.sendNextPrev("You'll also need a Normal or Premium Wedding ticket from the Cash Shop for either location-just one per couple. After that, you'll be happily married and enjoy the benefits of marriage. I can explain a little more if you want...");
		break;
	case 3:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Amoria welcomes everyone. You do not have to married to help some of the good townspeople around here-or hunt. I invite you to speak with a few of them and see if you can assist them.");
		break;
	case 2:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Great! Stay as long as you like. See me if you have some questions.");
		break;
	case 2:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Good thinking. You'll have to be male to obtain an Engagement Ring. After you have one, select the propose option, and wait for a response from your sweetheart. I recommend both of you being online so you can celebrate. As for getting an engagement ring, I'd speak with Moony, our ring-maker.");
		break;
	case 2:
		cm.sendNextPrev("He's crafts the best rings I've ever seen-4 different kinds in fact. When you do select your engagement ring, please pick carefully-wouldn't want to make a mistake! What else is on your mind?");
		break;
	case 3:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Straight to the point, eh? I like that. Well, after you抮e engaged, you抣l need to speak with Wedding Coordinator Victoria or Wayne and make your reservation. You will need a normal or Premium Wedding Ticket from the Cash Shop, an Engagement Ring and some time. If you抳e recently performed an annulment, then you抣l need to wait 7 days before you can marry again and Moony will make you a new ring.");
		break;
	case 2:
		cm.sendNextPrev("There抯 a bit more documentation for the Cathedral, they have a more elaborate system over there. Also, you抣l need to tell the Wedding Coordinator your wish lists.");
		break;
	case 3:
		cm.sendNextPrev("Pila Present will hold them for you when your friends turn them in, and you can pick them up afterwards. You抣l also get wedding invitations to send them. Do you know where you want to get married?");
		break;
	case 4:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Bit of an adventurous streak, I see. Pelvis Bebop and his crew know how to put on a nice show. Just speak with Wedding Assistant Bonnie, and be sure you have a Wedding Receipt, an Engagement Ring and about 5-10 minutes.");
		break;
	case 2:
		cm.sendNextPrev("The White Wedding Chapel is faster, and a little more care-free. Anything else you're interested in?");
		break;
	case 3:
		cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Ah, the Cathedral. If there's a place you want to really want to get married in style, that's it. As I mentioned before, they have a more elaborate system, so you'll need to speak with High Priest John for his permission.");
		break;
	case 2:
		cm.sendNextPrev("The bride-to-be will also have to call on Mom and Dad to vouch for you both. To get married in the Cathedral, Just speak with Wedding Assistant Nicole and be sure you have a Wedding Receipt, the Officiator's Permission, and an Engagement Ring and about 10-20 minutes.");
		break;
	case 3:
		cm.sendNextPrev("Also, the Cathedral allows your guests to give the married couple an experience blessing during the wedding-1 exp per click, in fact. What else would you like to know?");
		break;
	case 4:
		cm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You will receive Wedding Invitations along with your Wedding ticket. If you need more, you can talk with one of the Wedding Assistants. The invitations are pretty simple, you just type in your friend's name, hit 揝end?and off they go.");
		break;
	case 2:
		cm.sendNextPrev("They'll land in the Etc slot-make sure they have a few spaces free. What else would you like to know?");
		break;
	case 3:
		cm.dispose();
}
}

function action8(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("For the White Wedding Chapel and the cathedral, after the Wedding ends, you and your guests are sent to the photo area, Cherished Visage. You can snap away for 60 seconds, and then relax with the new couple for 5 minutes.");
		break;
	case 2:
		cm.sendNextPrev("After that, you're whisked back to Amoria. Unless you have a premium ticket, in which case you get to visit the famous Robin the Huntress. What else are you curious about?");
		break;
	case 3:
		cm.dispose();
}
}

function action9(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Well, the normal Wedding ticket is nice enough; however, the Premium Wedding ticket gives the newly married couple and their guests a Wedding Party afterwards at the Untamed Hearts Hunting Ground.");
		break;
	case 2:
		cm.sendNextPrev("It's hosted by the legendary lady archer herself, Robin the Huntress. There's quite a few valuables there I'm told, though you'll see for yourself.");
		break;
	case 3:
		cm.dispose();
}
}

function action10(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Now you're talking. As a way to remember Elias the Hunter, Married Couples receive the rings, which produce an effect whenever you're near each other-it's different depending on the ring you choose. You'll also get to do some activities that are for Couples only.");
		break;
	case 2:
		cm.sendNextPrev("For instance, some of the townsfolk here will give you tasks that they wouldn't give others, they'll trust you a little more. It's a different lifestyle, and you'll always be with your sweetheart. What else can I assist with?");
		break;
	case 3:
		cm.dispose();
}
}

function action11(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Some marriages don't work out for the best. It's unfortunate, but you can visit Moony to end your marriage. Make sure you have a good amount of money as well. Anything else?");
		break;
	case 2:
		cm.dispose();
}
}

function action12(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("My pleasure, friend! Visit me anytime if you need to know more.");
		break;
	case 2:
		cm.dispose();
}
}
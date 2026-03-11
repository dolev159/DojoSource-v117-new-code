/*
	名字:	奇丹
	地圖:	騎士之殿
	描述:	915000300
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNext("Who're you? You new?");
		break;
	case 1:
		cm.sendNextPrevS("Kidan! Old pal! You really don't remember me? We say hello all the time!", 2);
		break;
	case 2:
		cm.sendNextPrev("Oh, um, sorry about that...");
		break;
	case 3:
		cm.sendNextPrevS("It's okay old chum, I know you're seeing countless people coming through. It can't be easy to remember all of them, but I was hoping you'd at least remember ME.", 2);
		break;
	case 4:
		cm.sendNextPrev("H-hey! I said I was sorry! This place is like a madhouse right now. You can't blame a guy for missing a few faces.");
		break;
	case 5:
		cm.sendNextPrevS("It's really that bad?", 2);
		break;
	case 6:
		cm.sendNextPrev("Of course! We've got some new royal lady claiming that Empress Cygnus may be a fake! How could anyone feel at ease?!");
		break;
	case 7:
		cm.sendNextPrevS("That's a good point. That's why I'm here!", 2);
		break;
	case 8:
		cm.sendNextPrev("It's got me pretty worried too. Even the Empress looked worried. She was white as a ghost when I saw her.");
		break;
	case 9:
		cm.sendNextPrevS("Not looking forward to having a new empress, Kidan?", 2);
		break;
	case 10:
		cm.sendNextPrev("I would never wish ill of Empress Cygnus! We would not be where we are today without her leadership. But if this new woman's claims are true...");
		break;
	case 11:
		cm.sendNextPrevS("Do you really think there is another member of the Empress's bloodline?", 2);
		break;
	case 12:
		cm.sendNextPrev("This Hilla woman insisted that she was a descendant to the last Empress.");
		break;
	case 13:
		cm.sendNextPrevS("That would explain the foul mood.", 2);
		break;
	case 14:
		cm.sendNextPrev("Indeed. If Shinsoo were here, she could clear this up. Unfortunately she is not.");
		break;
	case 15:
		cm.sendNextPrev("Why did that woman insist on holding the conference today of all days?!");
		break;
	case 16:
		cm.sendNextPrevS("lt seems awfully convenient, doesn't it?", 2);
		break;
	case 17:
		cm.sendNextPrev("I hope this works out. What are we going to do if Cygnus isn't the real empress? I have devoted myself to her.");
		break;
	case 18:
		cm.sendNextPrev("Ereve can't split into two. lt would be chaos.");
		break;
	case 19:
		cm.sendNextPrevS("Don't worry too much, Kidan. I have a feeling these things will all work out.", 2);
		break;
	case 20:
		cm.sendNextPrev("I wish I had your optimism. At any rate, this Hilla character must be quite confident to call all these people here.");
		break;
	case 21:
		cm.sendNextPrevS("Confidence is required of both truthsayers and liars. You never know. Maybe someone INCREDIBLE will come swooping in to clear this up.", 2);
		break;
	case 22:
		cm.sendNextPrev("What does that mean? Why are you talking like that?");
		break;
	case 23:
		cm.sendNextPrevS("Don't worry yourself! I'm sure I'll see you after everything is said and done.", 2);
		break;
	case 24:
		cm.sendPrev("Uh...okay, see you.");
		break;
	case 25:
		cm.dispose();
}
}
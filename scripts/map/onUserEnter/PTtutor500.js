/*
	名字:	耶雷弗
	地圖:	耶雷弗 大會議場
	描述:	915000500
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		ms.dispose();
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
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.sendNextS("(Looks like I'm not too late. Everyone's here, but nothing has started yet. I'll just grab one of these empty seats...)", 17);
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 4:
		ms.sendNextS("(Cygnus and her knights look very serious. Can't say that I blame them.)", 17);
		break;
	case 5:
		ms.sendNextPrevS("(The senators don't seem so thrilled either. I wonder what they're thinking? Maybe I can get closer...)", 17);
		break;
	case 6:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 7:
		ms.sendNextS("Could it be true? Could Cygnus have been a fake this whole time?", 5, 1402200);
		break;
	case 8:
		ms.sendNextPrevS("Are you listening to yourself? How could that even be possible? Cygnus is the empress now and she'll be the empress tomorrow!", 5, 1402201);
		break;
	case 9:
		ms.sendNextPrevS("I'm not arguing that she's a total impostor, but if there really is someone with the treasure of Ereve...", 5, 1402203);
		break;
	case 10:
		ms.sendNextPrevS("Aria was supposed to have valued that gem above all other things. She was going to pass it on to the rightful heir.", 5, 1402202);
		break;
	case 11:
		ms.sendNextPrevS("lf that treasure proves she is the real empress, I mean if someone other than Cygnus even belongs to Aria's bloodline... Everything we've worked for could be in jeopardy.", 5, 1402200);
		break;
	case 12:
		ms.sendNextPrevS("I won't betray Cygnus after all she's done for Ereve, but I can't ignore the legitimacy of this woman's claims either!", 5, 1402203);
		break;
	case 13:
		ms.sendNextPrevS("The Maple World alliance was just about to form a unified front. The only reason most of these people are here is because they trusted Cygnus. The alliance may fall to pieces if someone else steps in.", 5, 1402202);
		break;
	case 14:
		ms.sendNextPrevS("We could stand here and speculate all day. I think it is time we let this accuser speak for herself.", 5, 1402201);
		break;
	case 15:
		ms.sendNextPrevS("Shhh... She's here.", 5, 1402201);
		break;
	case 16:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 17:
		ms.sendNextS("(The director of this convoluted play finally arrives.)", 17);
		break;
	case 18:
		ms.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("phantom/hillah", 3));
		ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("Magatia/alceCircle", 4));
		ms.spawnNPCRequestController(1402400, -131, -7, 0);
		ms.spawnNPCRequestController(1402401, -209, -7, 0);
		ms.spawnNPCRequestController(1402401, -282, -7, 0);
		ms.spawnNPCRequestController(1402401, -59, -7, 0);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 7000));
		break;
	case 19:
		ms.sendNextS("Thank you all for coming! I am Hilla, and I am here to tell you that I am the true heir to the Empress's throne.", 5, 1402400);
		break;
	case 20:
		ms.sendNextPrevS("...", 5, 1402100);
		break;
	case 21:
		ms.sendNextPrevS("We're here to prove that you're lying.", 5, 1402101);
		break;
	case 22:
		ms.sendNextPrevS("So you would like to think, but I'd like to talk about an old tale that the people of Ereve seem to have conveniently forgotten. A tale of Aria, the empress during the time of the Black Mage's reign...", 5, 1402400);
		break;
	case 23:
		ms.sendNextPrevS("(Aria...)", 17);
		break;
	case 24:
		ms.sendNextPrevS("As you all must know, there was no historical record left over after the Black Mage rose to power, but there WAS a persistent story of a gem that Aria clung to. The treasure called Skaia.", 5, 1402400);
		break;
	case 25:
		ms.sendNextPrevS("Skaia, Aria's lost treasure. lt's said to have been passed down from empress to empress to protect them! lt holds many wondrous powers!", 5, 1402400);
		break;
	case 26:
		ms.sendNextPrevS("The stories about Aria's possession of Skaia are not in question, but there are no records of what powers the jewel actually possessed...", 5, 1402104);
		break;
	case 27:
		ms.sendNextPrevS("I stand before you with proof of my lineage and you argue semantics? I have the jewel, not Cygnus!", 5, 1402400);
		break;
	case 28:
		ms.sendNextPrevS("When the Black Mage's army decimated Ereve, the Skaia was thought lost. I'm sure that's the old story you've all heard. But do you all really think such an important treasure would be written off as a loss? Do you think our forefathers would have let it linger in some tomb?", 5, 1402400);
		break;
	case 29:
		ms.sendNextPrevS("That is lunacy! The Skaia was protected from the Black Mage, quietly passed down for hundreds of years until I could reveal my birthright!", 5, 1402400);
		break;
	case 30:
		ms.sendNextPrevS("So that's your argument?", 5, 1402105);
		break;
	case 31:
		ms.sendNextPrevS("That is the truth.", 5, 1402400);
		break;
	case 32:
		ms.sendNextPrevS("How can you prove that the Skaia you have is real? lt could be a fake.", 5, 1402103);
		break;
	case 33:
		ms.sendNextPrevS("A valid question, but ultimately foolish. The name Skaia is well known, but very few have actually seen it. In fact, the only people in Maple World that would have even seen its picture are here today. That means that all of YOU are the proof that my Skaia is real!", 5, 1402400);
		break;
	case 34:
		ms.sendNextPrevS("Do you not recognize the Skaia in my hand? ls it not the jewel you have all seen before?", 5, 1402400);
		break;
	case 35:
		ms.sendNextPrevS("Listen to what you're saying! Jewels can be forged and reproduced. There is no way we can be certain that the one you have is the real thing.", 5, 1402106);
		break;
	case 36:
		ms.sendNextPrevS("I'm sorry, Sir Hawkeye, but were you alive hundreds of years ago? No. Your opinion the validity of this gem is of no importance.", 5, 1402400);
		break;
	case 37:
		ms.sendNextPrevS("Besides, we have not yet gotten to the real argument. I ask you all, why is the Lady Cygnus so frail? lf she is indeed the true heir, she would not be overpowered by Shinsoo's strength. Lady Cygnus, you yourself must know that you were not meant to wield the power you've stolen...", 5, 1402400);
		break;
	case 38:
		ms.sendNextPrevS("Such insolence!", 5, 1402102);
		break;
	case 39:
		ms.sendNextPrevS("Oh... was I being insolent? ls speaking the truth now a sign of betrayal?", 5, 1402400);
		break;
	case 40:
		ms.sendNextPrevS("Think on my words and decide for yourselves! lsn't that your role, Cygnus? To act on what is best for the people?", 5, 1402400);
		break;
	case 41:
		ms.sendNextPrevS("She is right. I am no one special and I am unable to fully absorb Shinsoo's power. I don't know why, but I was born like this.", 5, 1402100);
		break;
	case 42:
		ms.sendNextPrevS("lf this woman questions my validity as your empress, we must at least allow her to discuss it, or we will be no better than the Black Mage...", 5, 1402100);
		break;
	case 43:
		ms.sendNextPrevS("Lady Cygnus!", 5, 1402101);
		break;
	case 44:
		ms.sendNextPrevS("I have to do what is right! I've asked the world to fight for me while I sit here under the protection of more people I've asked to fight for me. lf I've done that without any real authority or qualification...", 5, 1402100);
		break;
	case 45:
		ms.sendNextPrevS("Then I am no better than a tyrant.", 5, 1402100);
		break;
	case 46:
		ms.sendNextPrevS("(Her voice is shaking like a leaf, but her eyes are firm. She really is Aria's niece... and she seems to be quite popular.)", 17);
		break;
	case 47:
		ms.sendNextPrevS("I believe we've dragged this on long enough! Let's see who truly carries the bloodline of the empress. lt is said that Skaia will shine in the hands of an Empress. Do you care to test your mettle, little Cygnus?", 5, 1402400);
		break;
	case 48:
		ms.sendNextPrevS("lt shines in my hands. Will it shine in yours?", 5, 1402400);
		break;
	case 49:
		ms.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("phantom/skaia", 3));
		ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("phantom/skaia", 4));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 9000));
		break;
	case 50:
		ms.sendNextS("AH...", 5, 1402100);
		break;
	case 51:
		ms.sendNextPrevS("Not even a flicker. What more do you need?", 5, 1402400);
		break;
	case 52:
		ms.sendNextPrevS("...", 5, 1402100);
		break;
	case 53:
		ms.sendNextPrevS("lt's too early for conclusions, Empress.", 5, 1402102);
		break;
	case 54:
		ms.sendNextPrevS("That's right. We still don't even know if that stone is real.", 5, 1402106);
		break;
	case 55:
		ms.sendNextPrevS("R-right! Even I can make light with magic!", 5, 1402103);
		break;
	case 56:
		ms.sendNextPrevS("When Shinsoo returns, she'll reveal the truth. You absolutely cannot believe that woman's words.", 5, 1402104);
		break;
	case 57:
		ms.sendNextPrevS("lf you falter, the Cygnus Knights falter as well. Stay strong.", 5, 1402105);
		break;
	case 58:
		ms.sendNextPrevS("Your alliance is the foundation for a new era in Maple World. This could all be a scheme to place doubt on your position. We cannot listen to her until she presents solid proof.", 5, 1402101);
		break;
	case 59:
		ms.sendNextPrevS("Everyone...", 5, 1402100);
		break;
	case 60:
		ms.sendNextPrevS("Your hounds are trying desperately to ignore the truth.", 5, 1402400);
		break;
	case 61:
		ms.sendNextPrevS("I won't deny your hard work, Cygnus. You have been surprisingly wise for a young girl, but I urge you to make the right decision.", 5, 1402400);
		break;
	case 62:
		ms.sendNextPrevS("Acknowledge me as the real empress and step away from this charade before it's too late.", 5, 1402400);
		break;
	case 63:
		ms.sendNextPrevS("Tell the alliance that they will follow me now.", 5, 1402400);
		break;
	case 64:
		ms.sendNextPrevS("Of course, I'm not without sympathy to your situation. I'lI give you some time to take all of this in. Do whatever you need to do to reconcile yourself with the truth.", 5, 1402400);
		break;
	case 65:
		ms.sendNextPrevS("When you are finished, you will find that the true Empress of Maple World is not Cygnus, but Hilla.", 5, 1402400);
		break;
	case 66:
		ms.sendNextPrevS("(Gaston should be ready about now. Time to take the plunge!)", 17);
		break;
	case 67:
		ms.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("phantom/phantom", 3));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 68:
		ms.sendNextS("Jumping ahead of ourselves, aren't we?", 17);
		break;
	case 69:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(150000000), ms.getMap(150000000).getPortal(0));
}
}
/*
	名字:	克蘿倫斯修女
	地圖:	結婚小鎮
	描述:	680000000
*/

function start() {
	cm.sendSimple("I can guide you to the Wedding. Which one suits you? \r\n#L0##bI am now ready to get Married in cathedral.#l\r\n#L1#I am invited to the wedding!#l");
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
		cm.sendNext("Let's see...I'm sorry, but I don't think you have the Reservation Receipt with you right now. Without the Reservation Receipt, I'm afraid I can't help you. You'd better talk to Victoria first Sorry.");
		break;
	case 1:
		cm.sendNext("I apologize, but the Wedding hasn't started yet. When it does, I'll be sure to let you in.");
		}
		cm.dispose();
}



/*

//Wedding Assistant Nicole
script "cathedral" {
field = self.field;
inventory = target.inventory;
qr = target.questRecord;
	
if (field.id == 680000000 ) {
//first words
	v1 = self.askMenu( "I can guide you to the Wedding. Which one suits you?\r\n#b#L0#I am now ready to get Married in cathedral.#l\r\n#L1#I am invited to the wedding!#l#k" );
	if ( v1 == 0 ) {
		if (target.isInParty == 1 ) {
				//checking the Reservation Receipt
	    		if ( inventory.itemCount(4031375) == 0 and inventory.itemCount(4031480) == 0 )  self.say( "Let's see...I'm sorry, but I don't think you have the Reservation Receipt with you right now. Without the Reservation Receipt, I'm afraid I can't help you. You'd better talk to Victoria first Sorry. " );
				//checking the Officiator's Permission
		      	else if ( inventory.itemCount(4031374) == 0 )  self.say( "Let's see...I'm sorry, but I don't think you have the Officiator's Permission with you right now. Without the Officiator's Permission, I'm afraid I can't help you. You'd better talk to High Priest John first. Sorry. " );
			else {
				set = FieldSet( "Wedding2" );
		      		result = set.enter( target.nCharacterID, 1 );
				//Enter Return Code
		//1 : another wedding has started.
		//2 : bride and groom are not in the same map.
		//3 : there are not 2 members in party
		//4 : male-male female-female couple
		//5 : not engaged yet
		//6 : there's no empty slot 
		//7 : there's no wedding available(for invited people)
		//8 : there's no wedding invitation(for invited people)
		//9 : Unknown Error
		//10 : bride and groom didn't reserve the hall
		//11 : wedding type mismatching

				if ( result == 1) self.say ("Looks like another Wedding has begun, sweetie. When it finishes, I'll be sure to let you in!");
		      		else if ( result == 2) self.say ("You need to be in a 2-person party with your fianc閑 or fianc?and in #bthe same map#k to get married.");
 		      		else if ( result == 3) self.say ("You need to be in #ba 2-person party with your fianc閑 or fianc?#kto get married.");
 		      		else if ( result == 4) self.say ("You need to be in #ba 2-person party with your fianc閑 or fianc?#kto get married.");
 		      		else if ( result == 5) self.say ("You need to be in #ba 2-person party with your fianc閑 or fianc?#kto get married.");
 		      		else if ( result == 6) self.say ("You need an equip slot open to receive the ring, as soon as you make room, we can begin.");
 		      		else if ( result == 9) self.say ("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later");
				else if ( result == 10) self.say ("You have to make a reservation to start the wedding");
				else if ( result == 11) self.say ("It appears that you've made your reservation at another wedding hall");
	      		}
		}
		//bride and groom are not in the party
		else self.say("You need to be in #ba 2-person party with your fianc閑 or fianc?#kto get married.");
	}
	else if ( v1 == 1 ) {
		if (target.isInParty == 0) {
			nRet = self.askYesNo( "Greetings! I can tell that you're a guest of the Bride and Groom, would you like to enter the Cathedral?");
			if ( nRet == 0 ) self.say( "Well, it looks like this isn't your cup of tea, please stand aside and let others enter. " );
		      	else {
				set = FieldSet( "Wedding2" );
				result = set.enter( target.nCharacterID, 0 );
				if ( result == 7) self.say ("I apologize, but the Wedding hasn't started yet. When it does, I'll be sure to let you in. ");
				else if ( result == 8) self.say ("Sorry, but without an invitation, I can't let you in.");
				else if ( result == 9) self.say ("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later");
		      	}
		}
		//invited people are in the party
		else self.say("Oh no, I am sorry, but I cannot let you in since you're in a party with someone other than your loved one. I suggest you leave the party first, and then come back and see me~");
	}
}
else if (field.id == 680000200) {
// in the cathedral 
nRet = self.askYesNo( "Would you like to go back outside? ");
	if ( nRet == 0 ) self.say( "Please take a seat, and wait for the ceremony to begin." );
	else {
		// user wants to exit
		self.say( "Maybe we'll see you at the altar someday. Happy travels! ");
		if (field.id == 680000200 ) registerTransferField( 680000500, "" );
	}
}
}
*/
/*
	名字:	寶妮
	地圖:	結婚小鎮
	描述:	680000000
*/

function start() {
	cm.sendSimple("I can guide you to the Wedding. Which one suits you?\r\n#b#L0#I am now ready to get Married in Chapel.#l\r\n#L1#I am invited to the wedding!#l");
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
		cm.sendNext("Let's see...I'm sorry, but I don't think you have Reservation ticket with you right now. Without the Reservation Receipt, I'm afraid I can't help you. You'd better talk to Wayne first. Sorry.");
		break;
	case 1:
		cm.sendNext("I apologize, but the Wedding hasn't started yet. When it does, I'll be sure to let you in.");
		}
		cm.dispose();
}





/*

//Wedding Assistant Bonnie 
script "vegas" {
field = self.field;
inventory = target.inventory;
qr = target.questRecord;
	
if (field.id == 680000000 ) {
	v1 = self.askMenu( "I can guide you to the Wedding. Which one suits you?\r\n#b#L0#I am now ready to get Married in Chapel.#l\r\n#L1#I am invited to the wedding!#l#k" );
	if ( v1 == 0 ) {
		if (target.isInParty == 1) {
			if (inventory.itemCount(4031376) == 0 and inventory.itemCount(4031481) == 0 ) self.say( "Let's see...I'm sorry, but I don't think you have Reservation ticket with you right now. Without the Reservation Receipt, I'm afraid I can't help you. You'd better talk to Wayne first. Sorry. " );
			else{
				set = FieldSet( "Wedding1" );
				result = set.enter( target.nCharacterID, 1 );
				
				if ( result == 1) self.say (" Looks like another Wedding has begun, sweetie. When it finishes, I'll be sure to let you in!");
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
		else self.say("You need to be in #ba 2-person party with your fianc閑 or fianc?#kto get married.");
	}
	else if ( v1 == 1 ) {
		if (target.isInParty == 0) {
			nRet = self.askYesNo( "Welcome! I can tell that you're a guest of the Bride and Groom, would you like to enter the Chapel?");
			if ( nRet == 0 ) self.say( "Step aside then, there are others ready to go in." );
			else {
				set = FieldSet( "Wedding1" );
				result = set.enter( target.nCharacterID, 0 );
				if ( result == 7) self.say ("I apologize, but the Wedding hasn't started yet. When it does, I'll be sure to let you in. ");
				else if ( result == 8) self.say ("Sorry, but without an invitation, I can't let you in.");
				else if ( result == 9) self.say ("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my logbook, please try again later");
			}
		}
		else self.say("Oh no, I am sorry, but I cannot let you in since you're in a party with someone. I suggest you leave the party first, and then come back and see me~");
	}
}
else if (field.id == 680000100) {
	nRet = self.askYesNo( "Stiff legs, I see. Would you like to head outside and stretch a bit?");
	if ( nRet == 0 ) self.say( "Well, take a seat. The ceremony should start soon." );
	else {
		self.say( "Ok, come on back when you're ready. ");
		if (field.id == 680000100 ) registerTransferField( 680000500, "" );
	}
}
} */
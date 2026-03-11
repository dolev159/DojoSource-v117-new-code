/*
	名字:	瑪格麗特修女
	地圖:	結婚小鎮
	描述:	680000000
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
		if (type == 2) {
		cm.sendNext("Hmm... let me know when you are ready. I am always here for you!");
		cm.dispose();
		return;
		}
		if (status < 2) {
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
		cm.sendSimple("I'm here to help you prepare for your Wedding. I can help you make a Reservation, get additional Invitations, or tell you what you'll need to get married in our Cathedral. What would you like to know?\r\n#b#L0#How can I get married here?#l\r\n#L1#I'd like to make a Premium Reservation.#l\r\n#L2#I'd like to make a Normal Reservation.#l\r\n#L3#I have more guests coming, I'd like some more Invitations.#l#k" );
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
		cm.sendNext("To get married in the Cathedral, you'll need #ra Cathedral Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box and most of all, love#k. Soon as you have them, we'll be happy to assist with your Wedding plans! If you reserved the Cathedral don't forget to see High Priest John for the Officiator's permission.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Looks like you're missing something you need. Please remember that you need #ra Cathedral Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
		break;
	case 2:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Looks like you're missing something you need. Please remember that you need #ra Cathedral Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
		break;
	case 2:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendYesNo("That's wonderful! I thought you might need a few more, so here you go. Pass them out to many people as you want! Do you get your #bReservation Receipt and the Wedding Invitation Ticket#k?");
		break;
	case 2:
		cm.sendNext("Oh dear, it looks like you're missing a Cathedral Reservation Receipt. I'm afraid I'll have to postpone those invitations for now. When you get one, be sure to return!");
		break;
	case 3:
		cm.dispose();
}
}








/*


//Wedding Coordinator Victoria - Cathedral
script "cathedralCoordinator" {
inventory = target.inventory;
//first dialog
self.say("Before I help you make a reservation for the Cathedral Wedding, I strongly recommend that #bboth you and your partner#k need to have at least #b3 Etc. slots#k available. Please check your etc. inventory.");
v1 = self.askMenu( "And by the way, I must tell you, you look wonderful today! I'm here to help you prepare for your Wedding. I can help you make a Reservation, get additional Invitations, or tell you what you'll need to get married in our Cathedral. What would you like to know?\r\n#b#L0#How can I get married here?#l\r\n#L1#I'd like to make a Premium Reservation.#l\r\n#L2#I'd like to make a Normal Reservation.#l\r\n#L3#I have more guests coming, I'd like some more Invitations.#l#k" );
if ( v1 == 0 ) {
//How can I get married here?
	self.say( "To get married in the Cathedral, you'll need #ra Cathedral Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box and most of all, love#k. Soon as you have them, we'll be happy to assist with your Wedding plans! If you reserved the Cathedral don't forget to see High Priest John for the Officiator's permission." );
}
else if ( v1 == 1 ) {
//I'd like to make a Premium Reservation.
	if (target.isInParty == 1) {
		self.say("Ready to walk down the aisle. Let's book your reservation now.");
		if (inventory.slotCount( 4 ) > inventory.holdCount( 4 )+1 and inventory.itemCount(4031375) == 0){
			// cash item check
			if (inventory.itemCount( 5251003 ) == 0 ) self.say(" Looks like you're missing something you need. Please remember that you need #ra Cathedral Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
			else if (inventory.itemCount( 5251003 ) > 0 ) {
			retPos = target.hasRequestedTransferWorld;
			
			if ( retPos == 0 ) {
			        result = target.makeReservation(10); // 10 : Premium Cathedral
//MakeReservation Return Code

//0 : Success
//1 : bride and groom are not in the party
//2 : bride and groom are not in the same map.
//3 : there are not 2 members in party
//4 : male-male female-female couple
//5 : not engaged yet
//9 : Unknown Error

			        if (result == 1) self.say("You also need to be in #ba 2-person party with your fianc閑 or fianc?#kand in the same map to get married.");
			        else if (result == 2) self.say("You need to be in a 2-person party with your fianc閑 or fianc?and in #bthe same map#k to get married.");
			        else if (result == 3) self.say("You also need to be in a #b2-person party with your fianc閑 or fianc?k and in the same map to get married.");
			        else if (result == 4) self.say("You also need to be in a 2-person party with #byour fianc閑 or fianc?k and in the same map to get married.");
			        else if (result == 5) self.say("Please remember that you need #ba Cathedral Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
				else if (result == 6) self.say("Sorry... but your wedding reservation is already done.");
			        else if (result == 7) self.say("You need an etc slot open to receive the Reservation receipt and Invitations, as soon as you make room, we can begin.");
				else if (result == 9) self.say("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later!");		        
			}
			else self.say( "Sorry, but you are disabled from getting married." );
			}
		}
		//no empty slot
		else self.say("You need an etc slot open to receive the Reservation receipt and Invitations, as soon as you make room, we can begin. Additionally, check if you have an old Reservation receipt.");
	}
	//bride and groom are not in the party
	else self.say( "To make a Reservation, you'll need to be grouped with your fianc?or fianc閑... " );
}
else if ( v1 == 2 ) {
//I'd like to make a normal Reservation.	
//same structure with  'I'd like to make a premium Reservation.'
	if (target.isInParty == 1) {
			self.say( "To make a Reservation, you'll need to be grouped with your fianc?engaged, and ready to walk down the aisle. Let's book your reservation now. " );
		if (inventory.slotCount( 4 ) > inventory.holdCount( 4 )+1 and inventory.itemCount(4031480) == 0){ 
			if (inventory.itemCount( 5251000 ) == 0  ) self.say(" Looks like you're missing something you need. Please remember that you need #ra Cathedral Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation. ");
			else if (inventory.itemCount( 5251000 ) > 0 ) {
			retPos = target.hasRequestedTransferWorld;
			
			if ( retPos == 0 ) {
			
				result = target.makeReservation(11); // 11 : Normal Cathedral

				if (result == 1) self.say("You also need to be in #ba 2-person party with your fianc閑 or fianc?#kand in the same map to get married.");
				else if (result == 2) self.say("You need to be in a 2-person party with your fianc閑 or fianc?and in #bthe same map#k to get married.");
				else if (result == 3) self.say("You also need to be in a #b2-person party with your fianc閑 or fianc?k and in the same map to get married.");
				else if (result == 4) self.say("You also need to be in a 2-person party with #byour fianc閑 or fianc?k and in the same map to get married.");
				else if (result == 5) self.say("Please remember that you need #ba Cathedral Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
				else if (result == 6) self.say("Sorry... but your wedding reservation is already done.");
			        else if (result == 7) self.say("You need an etc slot open to receive the Reservation receipt and Invitations, as soon as you make room, we can begin.");
				else if (result == 9) self.say("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later!");		        
				}
				else self.say( "Sorry, but you are disabled from getting married." );
			}
		}
		else self.say("You need an etc slot open to receive the Reservation receipt and Invitations, as soon as you make room, we can begin. Additionally, check if you have an old Reservation receipt.");
	}
	else self.say( "To make a Reservation, you'll need to be grouped with your fianc?.. " );

}
else if ( v1 == 3 ) {
//I have more guests coming, I'd like some more Invitations.
	if (target.isInParty == 1) {
		v2 = self.askYesNo("That's wonderful! I thought you might need a few more, so here you go. Pass them out to many people as you want! Do you get your #bReservation Receipt and the Wedding Invitation Ticket#k?");
		// clicks 'no'
		if(v2 == 0) self.say("Hmm... let me know when you are ready. I am always here for you!");
		else {
		//checking a Cathedral Reservation Receipt
			if(inventory.itemCount(4031375)==0 and inventory.itemCount(4031480)==0 ) self.say("Oh dear, it looks like you're missing a Cathedral Reservation Receipt. I'm afraid I'll have to postpone those invitations for now. When you get one, be sure to return!");
			//a Cathedral Reservation Receipt and cash item invitation ticket
			else if (inventory.itemCount(4031375)==1 and inventory.itemCount(5251100)==0) self.say("Oh dear, it looks like you're missing #ba Wedding Invitation Ticket#k. I'm afraid I'll have to postpone those invitations for now. When you get one, be sure to return!");
			else if (inventory.itemCount(4031480)==1 and inventory.itemCount(5251100)==0) self.say("Oh dear, it looks like you're missing #ba Wedding Invitation Ticket#k. I'm afraid I'll have to postpone those invitations for now. When you get one, be sure to return!");
			else if (inventory.itemCount(4031375)==1 and inventory.itemCount(5251100)>0) {
				ret = inventory.getAdditionalInvitation;
				//inventory is full or unknown error
				if (ret == 0) self.say(" Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later. Please check your inventory is full and come to see me again!!");
				// exchange succeeded
				else self.say("Here you are~");
			}
			else if (inventory.itemCount(4031480)==1 and inventory.itemCount(5251100)>0) {
				ret = inventory.getAdditionalInvitation;
				//inventory is full or unknown error
				if (ret == 0) self.say(" Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later. Please check your inventory is full and come to see me again!!");
				// exchange succeeded
				else self.say("Here you are~");
			}
			
		}
	}
	//bride and groom are not in the party
	else self.say( "To receive some more invitations, you'll need to be grouped with your fianc?.. " );
}

}*/
/*
	名字:	Wayne
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
		cm.sendSimple("You are looking lovely today! I'm here to help you prepare for your Wedding. I can help you make a Reservation, get additional Invitations, or tell you what you'll need to get married in our Chapel. What would you like to know?\r\n#b#L0#How can I get married here?#l\r\n#L1#I'd like to make a Premium Reservation.#l\r\n#L2#I'd like to make a Normal Reservation.#l\r\n#L3#I have more guests coming, I'd like some more Invitations.#l#k");
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
		cm.sendNext("To get married in the Chapel, you'll need #ra Chapel Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k and some time. Soon as you have them, we'll be happy to assist with your Wedding plans!");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Looks like you're missing something you need. Please remember that you need #ra Chapel Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
		break;
	case 2:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Looks like you're missing something you need. Please remember that you need #ra Chapel Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
		break;
	case 2:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendYesNo("Popular, huh? No problem, I can help you with that. Here are a few more. Did you get your #bReservation Receipt and the Wedding Invitation Ticket#k?");
		break;
	case 2:
		cm.sendNext("Oh dear, it looks like you're missing #ra Chapel Reservation Receipt#k. I'm afraid I'll have to postpone those invitations for now. When you get one, be sure to return!");
		break;
	case 3:
		cm.dispose();
}
}







/*

// Wedding Coordinator Wayne- Vegas
script "vegasCoordinator" {
inventory = target.inventory;
v1 = self.askMenu( "You are looking lovely today! I'm here to help you prepare for your Wedding. I can help you make a Reservation, get additional Invitations, or tell you what you'll need to get married in our Chapel. What would you like to know?\r\n#b#L0#How can I get married here?#l\r\n#L1#I'd like to make a Premium Reservation.#l\r\n#L2#I'd like to make a Normal Reservation.#l\r\n#L3#I have more guests coming, I'd like some more Invitations.#l#k" );
	if ( v1 == 0 ) {
		self.say( "To get married in the Chapel, you'll need #ra Chapel Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k and some time. Soon as you have them, we'll be happy to assist with your Wedding plans!" );
	}
	else if ( v1 == 1 ) {
		if (target.isInParty == 1) {
			self.say( "To make a Reservation, you'll need to be grouped with your fianc? and ready to walk down the aisle. Let's book your reservation now. " );
			if (inventory.slotCount( 4 ) > inventory.holdCount( 4 )+1 and inventory.itemCount(4031376) == 0){ 
				if (target.inventory.itemCount( 5251002 ) == 0  ) self.say(" Looks like you're missing something you need. Please remember that you need #ra Chapel Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
				else if (target.inventory.itemCount( 5251002 ) >0) {
				
				retPos = target.hasRequestedTransferWorld;
			
				if ( retPos == 0 ) 		{
					result = target.makeReservation(20); // 20 : Premium Chapel
				        if (result == 1) self.say("You also need to be in #ba 2-person party with your fianc閑 or fianc?#kand in the same map to get married.");
				        else if (result == 2) self.say("You need to be in a 2-person party with your fianc閑 or fianc?and in #bthe same map#k to get married.");
				        else if (result == 3) self.say("You also need to be in a #b2-person party with your fianc閑 or fianc?k and in the same map to get married.");
				        else if (result == 4) self.say("You also need to be in a 2-person party with #byour fianc閑 or fianc?k and in the same map to get married.");
				        else if (result == 5) self.say("Please remember that you need #ba Chapel Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
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
	else if ( v1 == 2 ) {
		if (target.isInParty == 1) {
			self.say( "To make a Reservation, you'll need to be grouped with your fianc? and ready to walk down the aisle. Let's book your reservation now. " );
			if (inventory.slotCount( 4 ) > inventory.holdCount( 4 )+1 and inventory.itemCount(4031481) == 0){ 
				if (target.inventory.itemCount( 5251001 ) == 0  ) self.say(" Looks like you're missing something you need. Please remember that you need #ra Chapel Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
				else if (target.inventory.itemCount( 5251001 ) > 0) {
				
				retPos = target.hasRequestedTransferWorld;	
			
				if ( retPos == 0 ) 	{	
				result = target.makeReservation(21); // 21 : Normal Chapel
				if (result == 1) self.say("You also need to be in #ba 2-person party with your fianc閑 or fianc?#kand in the same map to get married.");
				else if (result == 2) self.say("You need to be in a 2-person party with your fianc閑 or fianc?and in #bthe same map#k to get married.");
				else if (result == 3) self.say("You also need to be in a #b2-person party with your fianc閑 or fianc?k and in the same map to get married.");
				else if (result == 4) self.say("You also need to be in a 2-person party with #byour fianc閑 or fianc?k and in the same map to get married.");
				else if (result == 5) self.say("Please remember that you need #ba Chapel Wedding Ticket, any Engagement Ring or an Empty Engagement Ring Box#k to make a reservation.");
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
		if (target.isInParty == 1) {
		v2 = self.askYesNo("Popular, huh? No problem, I can help you with that. Here are a few more. Did you get your #bReservation Receipt and the Wedding Invitation Ticket#k?");
			if(v2 == 0) self.say("Hmm... let me know when you are ready. I am always here for you!");
			else {
				if(target.inventory.itemCount(4031376)==0 and target.inventory.itemCount(4031481)==0) self.say("Oh dear, it looks like you're missing #ra Chapel Reservation Receipt#k. I'm afraid I'll have to postpone those invitations for now. When you get one, be sure to return!");
				else if (target.inventory.itemCount(4031376)==1 and target.inventory.itemCount(5251100)==0) self.say("Oh dear, it looks like you're missing a #rWedding Invitation Ticket#k. I'm afraid I'll have to postpone those invitations for now. When you get one, be sure to return!");
				else if (target.inventory.itemCount(4031481)==1 and target.inventory.itemCount(5251100)==0) self.say("Oh dear, it looks like you're missing a #rWedding Invitation Ticket#k. I'm afraid I'll have to postpone those invitations for now. When you get one, be sure to return!");
				else if (target.inventory.itemCount(4031376)==1 and target.inventory.itemCount(5251100)>0) {
					ret = inventory.getAdditionalInvitation;
					if (ret == 0) self.say(" Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later. Please check your inventory is full and come to see me again!!");
					else self.say("Here you are~");
				}
				else if (target.inventory.itemCount(4031481)==1 and target.inventory.itemCount(5251100)>0) {
					ret = inventory.getAdditionalInvitation;
					if (ret == 0) self.say(" Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later. Please check your inventory is full and come to see me again!!");
					else self.say("Here you are~");
				}
			}
		}
		else self.say( "To receive some more invitations, you'll need to be grouped with your fianc?.. " );
	}
}
*/
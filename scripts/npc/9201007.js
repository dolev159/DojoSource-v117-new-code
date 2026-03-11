/*
	名字:	安娜修女
	地圖:	結婚禮堂
	描述:	680000210
*/

function start() {
	cm.sendOk("Please wait for the ceremony to begin.");
	cm.dispose();
}



/*
//Wedding Asistant Nancy - beginCeremony QID
script "beginCeremony" {
qr = target.questRecord;
inventory = target.inventory;

if (target.isWeddingCouple == 1 and target.isInParty == 1 ) {
	if(inventory.slotCount( 1 ) > inventory.holdCount( 1 ) and inventory.slotCount( 4 ) > inventory.holdCount( 4 )){
	//begin the ceremony
		nRet = self.askYesNo( "You two both look fantastic! Are you ready to begin the Wedding Ceremony? ");
		if ( nRet == 0 ) self.say( "Ok, please remember that the ceremony will automatically start 10 minutes after you enter the Cathedral." );
		else {
		// want to begin the ceremony
			if (getCurrentWeddingState==1) target.startWedding;
			else if (getCurrentWeddingState==2) self.say ("Please wait for the ceremony to end");
		}
	}
	else self.say("You need an equip slot and an etc slot open to receive #bthe Ring and the Onyx Chest#k, as soon as you make room, we can begin.");
}
		//bride and groom are not in the party
else if ( target.isWeddingCouple == 1 and target.isInParty == 0) self.say("You both look fantastic!");
		//invited people
else self.say(" Please wait for the ceremony to begin.");
}*/
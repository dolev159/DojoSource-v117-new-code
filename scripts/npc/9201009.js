/*
	名字:	傑克
	地圖:	結婚禮堂
	描述:	680000110
*/

function start() {
	cm.sendOk("Please wait for the ceremony to begin.");
	cm.dispose();
}



/*
//Wedding Asistant Jackie
script "beginVagasCeremony" {
qr = target.questRecord;
inventory = target.inventory;

if (target.isWeddingCouple == 1 and target.isInParty == 1 ) {
	if(inventory.slotCount( 1 ) > inventory.holdCount( 1 ) and inventory.slotCount( 4 ) > inventory.holdCount( 4 )){
    nRet = self.askYesNo( "You're certainly dressed for the occasion. Are you ready to get this show on the road?");
    if ( nRet == 0 ) self.say( "No problem. Please remember that the ceremony will automatically start 5 minutes after you enter the Chapel." );
	else {
			if (getCurrentWeddingState==1) target.startWedding;
			else if (getCurrentWeddingState==2) self.say ("Please wait for the ceremony to end");
		}
	}
	else self.say("You need an equip slot and an etc slot open to receive #bthe Ring and the Onyx Chest#k, as soon as you make room, we can begin.");
}
else if ( target.isWeddingCouple == 1 and target.isInParty == 0) self.say("You both look fantastic!");
else self.say(" Please wait for the ceremony to begin.");

}

*/
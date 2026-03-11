/*
	名字:	羅貝特四世
	地圖:	結婚小鎮
	描述:	680000000
*/

function start() {
	cm.sendOk("I oversee all Cathedral Weddings...if you'd like to get married in the Cathedral, please speak with me as well!");
	cm.dispose();
}


/*

//******* Wedding: High Priest's Quest			8816
script "HighPriest" {

	field = self.field;
	qr = target.questRecord;
	val = qr.get( 8816 );
	inventory = target.inventory;

	if (field.id == 680000000 ) {
		
		// checking : if target has Cathedral Reservation Receipt (initial)
		if (inventory.itemCount( 4031375 )==0 and inventory.itemCount( 4031480 )==0 ) self.say( "I oversee all Cathedral Weddings...if you'd like to get married in the Cathedral, please speak with me as well!"); 
		
		else {						
			if (target.nGender == 0)
				self.say( "I oversee all Cathedral Weddings. There are a few reminders for Grooms that reserved the Cathedral Wedding. You will have to wait or help your Bride getting a blessing from her parents. After that, I'll give her my permission for the wedding so that she can initiate the Wedding by talking to one of my assistants, Nicole. Only your Bride can initiate the Wedding for Cathedral so you need to be patient for this."); 
			else {
				if (val == "end" )		// user already finished the quest 
					self.say( "You have already received the Officiator's Permission.");
				else if (val == "ing"){
				       nItem = inventory.itemCount( 4031373 ); // checkikng : parent bless (complete this Quest)
					   if (nItem > 0) 	{   // user got the parents blessing
						   self.say ("I see a smile on your face...you received your Parent's Blessing, didn't you? Great! Now, take the Officiator's Permission. You'll need to get married in cathedral. See you at the wedding!");
						   if (inventory.itemCount( 4031375 )>0) {
							ret = inventory.exchange( 0, 4031373, -1, 4031374, 1);
							if (ret !=0) {
								qr.set( 8816, "end" );							
								target.incEXP (500, 0);
							}
							else self.say("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later");
						   }
						   else if (inventory.itemCount( 4031480 )>0) {
						    ret = inventory.exchange( 0, 4031373, -1, 4031374, 1);
						    if (ret !=0) {
								qr.set( 8816, "end" );
								target.incEXP (500, 0);
								}
							else self.say("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later");
							}
					   }
					   else  self.say(" You still need your parents blessing, my friend. True Love knows no bounds, head out there and obtain your Parent's Blessing.");

		    	}
				else {	//quest starts
				nRet = self.askYesNo("Ah, there is seldom a sight more beautiful than two people in love. I can see that you want to get married. Have you got your Parent's Blessing yet? It is important that your parents give their blessing for a happy marriage. Do you wish to go visit your parents now?");
					if(nRet!=0) {	// user accepts the quest
						qr.set( 8816, "ing" );
						self.say( "Fantastic. It's always great to see a couple fall in love. Why don't you go speak with Mom and Dad for their blessing? I'm sure they will see that you two are meant to be. While going there, why don't you tell Cody that I said Hello if you have time." );

					}
					// user doesn't accept the quest
					else self.say( "Well, let's not rush things. Come back when you're ready to visit your Parents. " );
				}
			}
		}
	}
	if (field.id == 680000210 ) 	//High priest is in the cathedral
		self.say ( "Humm...");
}   */
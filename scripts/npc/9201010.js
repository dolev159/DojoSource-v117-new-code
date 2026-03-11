/*
	名字:	道拉比斯
	地圖:	結婚禮堂
	描述:	680000110
*/

function start() {
	cm.sendOk("...");
	cm.dispose();
}



/*
//Wedding Asistant Travis
script "waitingChapel" {
  field = self.field;
  if (field.id == 680000100 ) {
    nRet = self.askYesNo( "Salutations! Would you like to get into the Wedding Hall? ");
    if ( nRet == 0 ) self.say( "Ok, please let me know when you're ready to go in." );
	  else {
	   self.say( "Feel free to head inside now. Give my regards to the newlyweds!");
 	   if (field.id == 680000100 ) registerTransferField( 680000110, "" );
	  }
  }
  else if (field.id == 680000110 ) {
	if( target.isWeddingCouple == 1 and target.isInParty == 1 and getCurrentWeddingState == 2){
    		nRet = self.askYesNo( "You both look fantastic! Are you ready to go to the Photo Map? ");
    		if ( nRet == 0 ) self.say( "Ok, please remember that the Photo time will automatically start after the clock stops." );
	  	else {
	   		self.say( "Tubular! Snap some nice shots for the Wedding book!");
	   		set = FieldSet( "Wedding30" );
		     	result = set.enter( target.nCharacterID, 0 );
 		      
			if ( result == 7) self.say ("I apologize, but the Wedding hasn't started yet. When it does, I'll be sure to let you in. ");
 		      	else if ( result == 8) self.say ("Sorry, but without an invitation, I can't let you in.");
 		      	else if ( result == 9) self.say ("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my logbook, please try again later");

	  	}
 		
	}    
	else if (target.isWeddingCouple == 1 and target.isInParty == 1 and getCurrentWeddingState == 1) self.say("You both look fantastic! Please, wait the ceremony to end.");

	else if (target.isWeddingCouple == 0) {
    nRet = self.askYesNo( "Hi! Would you like to leave the Chapel? ");
    if ( nRet == 0 ) self.say( "Ok, please let me know when you're ready to go out." );
	  else {
		self.say( "Ok, I'll show you the way out...");
 		if (field.id == 680000110 ){ 
			set = FieldSet( "Wedding1" );
			registerTransferField( 680000500, "" ); 
		}
		
	  }
	}
  }
  else if (field.id == 680000300 ) 
	self.say("Welcome to Cherished Visage Photo Section! On here, we are taking a picture of you and your guests that will allow you to remember your very own Wedding day forever! The picture will be automatically taken after 1 minute timer runs out. So you need to be ready and try out some new poses before it's taken~ To see the picture that was taken, please visit WWW.NEXON.NET for more details.");
}

*/
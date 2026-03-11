/*
	名字:	芭倫提娜修女
	地圖:	結婚禮堂
	描述:	680000200
*/

function start() {
	cm.sendOk("...");
	cm.dispose();
}



/*

//Wedding Asistant Debbie
script "watingCathedral" {
field = self.field;
if (field.id == 680000200 ) {
	//wating room -> cathedral wedding hall
    nRet = self.askYesNo( "Salutations! Would you like to get into the Wedding Hall? ");
    if ( nRet == 0 ) self.say( "Ok, please let me know when you're ready to go in." );
	  else {
	   // user wants to go inside
	   self.say( "Feel free to head inside now. Give my regards to the newlyweds!  ");
 	   if (field.id == 680000200 ) registerTransferField( 680000210, "" );
	  }
}
else if (field.id == 680000210 ) {
	if( target.isWeddingCouple == 1 and target.isInParty == 1 and getCurrentWeddingState == 2){
			// asking if bride and groom want to move to Photomap
    		nRet = self.askYesNo( "You two both look fantastic! Are you ready to go to the Photo Map? ");
    		// bride and groom doesn't want to move to Photomap
			if ( nRet == 0 ) self.say( "Ok, please remember that the Photo time will automatically start after the clock stops." );
	  	else {
			// bride and groom want to move to Photomap
	   		self.say( "Sounds good, take some good pictures. Off you go!");
	   		set = FieldSet( "Wedding30" );
		     	result = set.enter( target.nCharacterID, 0 );
 		      
			if ( result == 7) self.say ("I apologize, but the Wedding hasn't started yet. When it does, I'll be sure to let you in. ");
 		      	else if ( result == 8) self.say ("Sorry, but without an invitation, I can't let you in.");
 		      	else if ( result == 9) self.say ("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my logbook, please try again later");

	  	}
 		
	}
		// The wedding is not finished yet
	else if (target.isWeddingCouple == 1 and target.isInParty == 1 and getCurrentWeddingState == 1) self.say("You both look fantastic! Please, wait the ceremony to end.");
	else if (target.isWeddingCouple == 0) {
	// for invited people
	nRet = self.askYesNo( "Hi! Would you like to leave the Cathedral? ");
    	  if ( nRet == 0 ) self.say( "Ok, please let me know when you're ready to go out." );
	  else {
	   // user wants to go out
	   self.say( "Ok, I'll show you the way out...");
 	   if (field.id == 680000210 ){ 
	   set = FieldSet( "Wedding2" );
	   registerTransferField( 680000500, "" );
	}
}
	  }
  }
  else if (field.id == 680000300 and target.isWeddingCouple == 0) {
	// for invited people at the photomap
      nRet = self.askYesNo( "Do you want to go back outside?");
      if ( nRet == 0 ) self.say( "Ok, please let me know when you're ready to go!" );
	    else {
	      self.say( "Ok, I'll show you the way out. Have fun out there!");
 	      if (field.id == 680000300 ) registerTransferField( 680000500, "" );
	    }
  }
} */
/*
	名字:	小薇安
	地圖:	結婚禮堂
	描述:	680000200
*/

function start() {
	cm.dispose();
}


/*
//Wedding Party NPC - Robin the Huntress
script "weddingParty" {
  inventory = target.inventory;
  field = self.field;
  if( field.id == 680000300  ) {
  // at the Photo map
    if ( target.isWeddingCouple == 1 ) {
      if ( inventory.itemCount(4031375)==1 or inventory.itemCount(4031376)==1) {
	  //premium ticket user
		self.say( "For your first minute, the wedding photo will be taken automatically. From there, five more minutes will be given to you and your friends to just hang around. When all that is over, your Premium Hunting Event is awaiting you just around the corner! Hang on tight and be ready to fight some monsters before time runs out!" );
      }
	  //normal ticket user
	  else self.say (" Congratulations~ ");
    }
    else self.say( " Let's enjoy the party!~ ");
  }
  else if (field.id == 680000400  ) {
  // at the hunting map
    if ( inventory.itemCount( 4031409 ) < 5 ) self.say(" Hmm, looks like you're not done collecting keys. Come back when you've got five! ");
    else if (inventory.itemCount( 4031409 ) > 4) {
      self.say( " There's only one place I've seen those keys unlock. You're more than worthy having obtained it, head on inside and do your best!");
      ret = inventory.exchange(0, 4031409, -1, 4031409, -1, 4031409, -1, 4031409, -1, 4031409, -1);
	  if( ret == 0) self.say("Oh dear, looks like I can't find that information right now...I'm having a bit of trouble with my database, please try again later!!!");
	  else registerTransferField( 680000401, "" );
      
    }
  }
  else if (field.id == 680000401  ) {
  // at the hunting map
		nRet = self.askYesNo( "Do you want to go back outside?");
		if ( nRet == 0 ) self.say( "Ok, please let me know when you're ready to go!" );
	    else {
	      self.say( "Ok, I'll show you the way out. Have fun out there!");
 	      if (field.id == 680000401 ) registerTransferField( 680000500, "" );
	    }
  }
}
*/
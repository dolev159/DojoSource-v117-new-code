/*
	名字:	卡羅賓
	地圖:	生命之穴入口
	描述:	240040700
*/

function start() {
	if (cm.getPlayer().getBuffSource(Packages.client.MapleBuffStat.MORPH) != 2210003) {
		cm.sendNext("That's far enough, human! No one is allowed beyond this point. Get away from here!");
		cm.dispose();
		return;
		}
		cm.sendNext("Oh, my Brother! Don't worry about human's invasion. I'll protect you all. Come in.");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(240050000), cm.getMap(240050000).getPortal(1));
		cm.dispose();
}


/*
script "hontale_keroben" {
	//函脚 眉农
	morphID = target.getMorphState;
	if ( morphID == 4 ) {
		self.say( "Oh, my Brother! Don't worry about human's invasion. I'll protect you all. Come in." );
		registerTransferField( 240050000, "st00" );
		target.undoMorph;
	} else {
		cHP = target.nHP;
		if ( cHP > 500 ) {
			target.incHP( -500, 0 );
			self.say( "That's far enough, human! No one is allowed beyond this point. Get away from here!" );
			registerTransferField( 240040600, "st00" );
		} else if ( cHP > 1 and cHP <= 500 ) {
			damage = target.nHP - 1;
			target.incHP( -damage, 0 );
			self.say( "That's far enough, human! No one is allowed beyond this point. Get away from here!" );
			registerTransferField( 240040600, "st00" );			
		} else if ( cHP == 1 ) {
			self.say( "That's far enough, human! No one is allowed beyond this point. Get away from here!" );
			registerTransferField( 240040600, "st00" );			
		}
	}
}
*/
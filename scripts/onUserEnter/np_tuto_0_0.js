/*
	名字:	Hidden Street
	地圖:	Space Station Hectare 1
	描述:	552000010
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		ms.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		ms.spawnNPCRequestController(9270083, -250, -120, 1);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 1:
		ms.getNPCDirectionEffect(9270083, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/0", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 4:
		ms.sendNextS("I'm not walking outta here until I clear this mess up!", 3);
		break;
	case 5:
		ms.sendNextPrevS("This whole thing stinks of jealousy! We're the only commoners with a direct line to the king. I guarantee that put a thorn under somebody's seat. Some blasted fool out there wants to put a smudge on the name of every bounty hunter in the galaxy!", 5, 9270083);
		break;
	case 6:
		ms.sendNextPrevS("You think it was an inside job? Someone at the palace?", 3);
		break;
	case 7:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/11", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 9:
		ms.sendNextS("I guess they didn't think too hard about who they picked to run a scheme on... Somebody's gonna pay for ruining my day.", 3);
		break;
	case 10:
		ms.sendNextPrevS("We can figure out who to work on later. Somebody had access to the king and somebody took him down. How many people do you think could get through those defenses besides us?", 5, 9270083);
		break;
	case 11:
		ms.sendNextPrevS("I guarantee that's what everybody's gonna think. No matter how hard we try to convince these jackboots that we were trying to help, they're just gonna see an outsider with a little too much blood on their hands. You have to escape and you have to do it right now.", 5, 9270083);
		break;
	case 12:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 13:
		ms.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange(ms.getPlayer().getGender() < 1 ? "newPirate/pendant_m" : "newPirate/pendant_w", 3));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/9", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 5000));
		break;
	case 14:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 3500));
		break;
	case 15:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 16:
		ms.sendNextS("Did you just get that transmission?! That bounty is ludicrous! We're going to have every hunter from here to Zorg on our tails. We can't waste a second.", 5, 9270083);
		break;
	case 17:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 100));
		break;
	case 18:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/9", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 19:
		ms.sendNextS("It's the guards from the royal palace! They must be buying time untll the rest of the force gets here. We need to be gone before that happens!", 5, 9270083);
		break;
	case 20:
		ms.sendNextPrevS("You're sending those pieces of junk after ME? l thought l had a better reputation than that.", 3);
		break;
	case 21:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 700));
		break;
	case 22:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/3", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 23:
		ms.dispose();
		ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(5081010), 1, 1, -1);
		ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(5081011), 1, 1, -1);
		Packages.server.quest.MapleQuest.getInstance(53245).forceStart(ms.getPlayer(), ms.getNpc(), null);
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420564), new java.awt.Point(400 + (Math.random() * 50), -120));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420564), new java.awt.Point(400 + (Math.random() * 50), -120));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420564), new java.awt.Point(400 + (Math.random() * 50), -120));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/attack_tuto", 4000, 0, -200, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
}
}
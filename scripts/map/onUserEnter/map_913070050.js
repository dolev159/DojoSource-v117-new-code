/*
	名字:	隱藏地圖
	地圖:	雜貨商店後院
	描述:	913070050
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20035)).getStatus() > 0) {
			Packages.server.quest.MapleQuest.getInstance(20035).forceComplete(ms.getPlayer(), ms.getNpc());
			ms.dispose();
			return;
			}
			ms.getPlayer().startMapTimeLimitTask(600, ms.getMap(913070004));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("General Store Yard"));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/4", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 2:
		ms.sendNextS("Huh? Who's that girl?", 3);
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 4000));
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 5:
		ms.sendNextS("Who are you? Are you lost?", 3);
		break;
	case 6:
		ms.sendNextPrevS("I have sought afler you for some time, and now you stand before me. The warrior with the destiny of light.", 5, 1106001);
		break;
	case 7:
		ms.sendNextPrevS("What are you talking about?", 3);
		break;
	case 8:
		ms.sendNextPrevS("Mind your manners, peon! This is the Empress!", 5, 1106003);
		break;
	case 9:
		ms.sendNextPrevS("You're the guy from before! What's going on here? That guy you talked about, Chromile... I found a letter from him in the attic. Is that Limbert's real name or something?", 3);
		break;
	case 10:
		ms.sendNextPrevS("Chromile and Mr. Limbert have no connection, save you. Chromile... is your father.", 5, 1106001);
		break;
	case 11:
		ms.sendNextPrevS("My father left me here when I was little. He abandoned me to this old chicken-keeper.", 3);
		break;
	case 12:
		ms.sendNextPrevS("He did not abandon you. Your father left you here after your mother passed away to save your life. His path was not one you could follow...", 5, 1106001);
		break;
	case 13:
		ms.sendNextPrevS("Save me? He didn't save me. He left me to be a slave in this shack. He didn't even give me a name! And now I find out I've been here waiting for a father that'll never return...", 3);
		break;
	case 14:
		ms.sendNextPrevS("Only the darkest night can produce a brilliant sunrise. Put aside your anger and come with me. You will find the light you seek.", 5, 1106001);
		break;
	case 15:
		ms.sendNextPrevS("Empress, I do not have faith in this boy. We know nothing about him. I don't think he is fit to be the knight of light.", 5, 1106003);
		break;
	case 16:
		ms.sendNextPrevS("Dear Nineheart, I should have known better than to assume you would trust in faith. Go ahead and test him, but be gentle.", 5, 1106001);
		break;
	case 17:
		ms.sendNextPrevS("Wait, what?", 3);
		break;
	case 18:
		ms.getPlayer().getMap().hideNpc(1106001);
		ms.getPlayer().getMap().hideNpc(1106003);
		ms.spawnNPCRequestController(1106005, 200, 50, 0);
		ms.getNPCDirectionEffect(1106005, "Effect/Summon.img/0", 2500, 0, 0);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		Packages.server.quest.MapleQuest.getInstance(20034).forceComplete(ms.getPlayer(), ms.getNpc());
		Packages.server.quest.MapleQuest.getInstance(20035).forceStart(ms.getPlayer(), ms.getNpc(), null);
		var tick = 0;
		schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
		if (tick == 1) {
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
			ms.getEventManager("q20035").startInstance(ms.getPlayer());
			schedule.cancel(true);
			ms.dispose();
			return;
			}
			tick++;
		}, 2500);
}
}
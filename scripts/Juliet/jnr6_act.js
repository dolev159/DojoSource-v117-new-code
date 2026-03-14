/*
	名字:	隱藏地圖
	地圖:	猶利塔的辦公室
	描述:	926110203
*/

function enter(pi) {
	if (pi.getPlayer().getMap().containsNPC(2112010)) {
		pi.removeNpc(pi.getPlayer().getMap().getId(), 2112010);
		for (var i = 0; i < pi.getPlayer().getMap().getCharactersThreadsafe().size(); i++)
		pi.getPlayer().getMap().getCharacterById(pi.getPlayer().getMap().getCharactersThreadsafe().get(i).getId()).getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2112010, 0, "Who is it that's barging into my lab without permission!! My lab report is not for any one of you!!!", "00 00", 0));
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "A mysterious scientist hurriedly left the lab, but not before summoning some monsters."));
		pi.getPlayer().getMap().startMapEffect("Please defeat all the monsters!", 5120022);

	for(var i = 0; i < 20; i++) {
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300143), new java.awt.Point(-500 + (Math.random() * 900), 243));
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300144), new java.awt.Point(-500 + (Math.random() * 900), 243));
		}
		}
		return true;
}
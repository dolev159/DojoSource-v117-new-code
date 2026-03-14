/*
	名字:	菇菇王國
	地圖:	菇菇森林深處
	描述:	106020300
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(2430014)) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(1300014, 0, "It seems as if the barrier could be broken using a Killer Mushroom Spore.", "00 00", 3));
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)).getStatus() == 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)).getCustomData() != 1) {
		pi.startportalScript("investigate1");
		}
		return true;
}

function start() {
	pi.sendNextS("This looks to be a type of 'Mushroom Spore' that has been transformed by magic into a strong defense barrier. It doesn't appear penetrable through physical force. Return to the #b#p1300003##k and report this matter.", 17);
}

function action(mode, type, selection) {
	if (mode > 0)
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)).setCustomData(1);
		pi.getPlayer().updateQuest(pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)), true);
		pi.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/normalEffect/mushroomcastle/chatBalloon1"));
		pi.dispose();
}
/*
	Phantom Quest:	Cash for Levels
	item:	Gaston's EXP Potion
*/

var status = 0;

function start() {
    var level = im.getPlayer().getLevel();
    if (level >= 18) {
        im.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You're already level 18 or higher. This item has no effect."));
        im.dispose();
        return;
    }
    im.sendYesNo("You will receive 618 EXP by using an EXP item. Do you wish to continue?");
}

function action(mode, type, selection) {
    if (mode != 1) {
        im.dispose();
        return;
    }

    var level = im.getPlayer().getLevel();
    if (level >= 18) {
        im.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You're already level 18 or higher."));
        im.dispose();
        return;
    }

    im.gainExp(618);
    im.removeItem(im.getItemId());
    im.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You gained 618 EXP!"));
    im.dispose();
}

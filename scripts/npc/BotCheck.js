var a = 0, b = 0, op = 0, answer = 0;
var fails = 0;

function start() {
    generateQuestion();
    cm.sendGetNumber("Bot Check:\r\nSolve: #b" + a + " " + getOperatorSymbol(op) + " " + b + " = ?#k", 0, -999999, 999999);
}

function action(mode, type, selection) {
    if (mode !== 1) {
        handleFail();
        return;
    }

    if (selection == answer) {
        cm.getClient().getSession().write(Packages.tools.packet.CField.getClock(0)); // remove timer
        Packages.client.anticheat.BotCheckManager.sessions.remove(cm.getPlayer().getId());

        // Notify GMs
        var message = "[BotCheck] " + cm.getPlayer().getName() + " has passed the bot check.";
        var chs = Packages.handling.channel.ChannelServer.getAllInstances();
        for (var i = 0; i < chs.length; i++) {
            var chars = chs[i].getPlayerStorage().getAllCharacters();
            for (var j = 0; j < chars.size(); j++) {
                var player = chars.get(j);
                if (player.isGM()) {
                    player.dropMessage(6, message);
                }
            }
        }

        // Apply buffs
        var SkillFactory = Packages.client.SkillFactory;
        var buffs = [9101000, 9101001, 9101002, 9101003, 9101008, 1005, 2301002];
        for (var i = 0; i < buffs.length; i++) {
            SkillFactory.getSkill(buffs[i]).getEffect(SkillFactory.getSkill(buffs[i]).getMaxLevel()).applyTo(cm.getPlayer());
        }

        cm.sendOk("Correct! Bot check passed.");
        cm.dispose();
    } else {
        handleFail();
    }
}

function handleFail() {
    fails++;
    if (fails >= 3) {
        cm.sendOk("You failed the bot check.");
        cm.getClient().getSession().write(Packages.tools.packet.CField.getClock(0));
        Packages.client.anticheat.BotCheckManager.sessions.remove(cm.getPlayer().getId());

        var cal = java.util.Calendar.getInstance();
        cal.add(java.util.Calendar.HOUR, 2);
        cm.getPlayer().dropMessage(1, "You failed the bot check.");
        Packages.handling.world.World.Broadcast.broadcastMessage(
            Packages.tools.packet.MaplePacketCreator.serverNotice(6,
                "[AutoBan] " + cm.getPlayer().getName() + " has been temporarily banned for failing bot check."));
        cm.getPlayer().tempban("Auto-tempban (botcheck fail)", cal, 1, false);
        cm.getClient().getSession().close();
        cm.dispose();
    } else {
        generateQuestion();
        cm.sendGetNumber("Incorrect. Try again.\r\n(" + (3 - fails) + " tries left)\r\n#b" + a + " " + getOperatorSymbol(op) + " " + b + " = ?#k", 0, -999999, 999999);
    }
}

function generateQuestion() {
    a = Math.floor(Math.random() * 50) + 1;
    b = Math.floor(Math.random() * 50) + 1;
    op = Math.floor(Math.random() * 4);

    if (op === 1 && a < b) {
        var temp = a;
        a = b;
        b = temp;
    }

    switch (op) {
        case 0: answer = a + b; break;
        case 1: answer = a - b; break;
        case 2: answer = a * b; break;
        case 3:
            b = Math.floor(Math.random() * 9) + 1;
            a = b * Math.floor(Math.random() * 10);
            answer = a / b;
            break;
    }
}

function getOperatorSymbol(op) {
    switch (op) {
        case 0: return "+";
        case 1: return "-";
        case 2: return "*";
        case 3: return "/";
    }
    return "?";
}
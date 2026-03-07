var status = -1;
var sel = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        var selStr = "Where would you like to go?\r\n#b";
        var options = [
            ["Monster Park", 951000000],
            ["Party Quest Lobby", 910002000],
            ["Nett's Pyramid", 926010000],
            ["Mu Lung Dojo", 925020000],
            ["Monster Carnival", 980000000]
        ];
        
        for (var i = 0; i < options.length; i++) {
            selStr += "#L" + i + "#" + options[i][0] + "#l\r\n";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var destinations = [
            951000000, // Monster Park
            910002000, // PQ Lobby
            926010000, // Nett's Pyramid
            925020000, // Dojo
            980000000  // Carnival
        ];
        if (selection >= 0 && selection < destinations.length) {
            cm.saveReturnLocation("MULUNG_DOJO"); // Usually used for transport NPCs
            cm.warp(destinations[selection]);
        }
        cm.dispose();
    }
}
/*
    Name: 潛入作戰 (Infiltration)
    Map: 大廳 (Large Hall)
    ID: 25000
    Nexus Omni v117 Standard
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 0 && status == 4) {
        qm.sendNext("The window of opportunity will not remain open forever.");
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        qm.sendNext("All preparations complete. The #m150000000# is anchored directly above the Knight's Chamber and it does not appear that we have been spotted from below.");
    } else if (status == 1) {
        qm.sendNextPrev("You will need to remain wary. The security in #m130000000# is currently on high alert. I suppose having this many of Maple World's leaders in one place warrants the rather excessive defense strategy they've adopted.");
    } else if (status == 2) {
        qm.sendNextPrev("Still, they are only guards. It should not prove too difficult for a seasoned thief like yourself to slip past them unnoticed. Keep a close watch on their eyelines and you will be fine.");
    } else if (status == 3) {
        qm.sendNextPrev("The Lumiere will remain here until you return. Do not concern yourself with the pursuit. We'll keep the engine running.");
    } else if (status == 4) {
        qm.sendAcceptDecline("It is time for you to make your decision. Are you ready to infiltrate #m130000000#?");
    } else if (status == 5) {
        qm.sendNext("I wish you luck.");
    } else if (status == 6) {
        qm.forceStartQuest();
        qm.dispose();
    }
}
/*
    Portal Name: KerningPQ_stage2
    Associated Map: 910340200
    Function: Handles the rope puzzle (Stage 2) of Kerning PQ.
    
    Architect: Nexus Omni
    Date: March 7, 2026
*/

function enter(pi) {
    var eim = pi.getPlayer().getEventInstance();
    if (eim != null && eim.getName().startsWith("KerningPQ")) {
        var portalName = pi.getPortal().getName();
        
        // Ensure portal names are numeric strings "0", "1", "2", "3"
        // The attemptStage2Pass function is defined in the event manager script
        var em = eim.getEventManager();
        em.getIvoke("attemptStage2Pass", eim, pi.getPlayer(), portalName);
        
        // We return false because we are not actually "entering" a portal to another map.
        // The event manager handles the map change on success/failure.
        return false; 
    } else {
        pi.playerMessage(5, "This portal is not active.");
        return false;
    }
}

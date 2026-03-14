/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation. You may not use, modify
or distribute this program under any other version of the
GNU Affero General Public License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package scripting;

import client.MapleClient;
import java.util.HashMap;
import java.util.Map;
import javax.script.Invocable;
import server.MaplePortal;
import tools.FileoutputUtil;

public class PortalScriptManager extends AbstractScriptManager {

    private static final PortalScriptManager instance = new PortalScriptManager();
    private final Map<String, PortalScript> scripts = new HashMap<String, PortalScript>();

    public final static PortalScriptManager getInstance() {
        return instance;
    }

    private final PortalScript getPortalScript(final String scriptName) {
        if (scripts.containsKey(scriptName)) {
            return scripts.get(scriptName);
        }

        final Invocable iv = getInvocable("portal/" + scriptName + ".js", null);
        if (iv == null) {
            return null;
        }

        final PortalScript script = iv.getInterface(PortalScript.class);
        scripts.put(scriptName, script);
        return script;
    }

    public final void executePortalScript(final MaplePortal portal, final MapleClient c) {
        final String scriptName = portal.getScriptName();
        final Invocable iv = getInvocable("portal/" + scriptName + ".js", c);

        if (iv != null) {
            try {
                if (hasMethod(iv, "enter")) {
                    iv.invokeFunction("enter", new PortalPlayerInteraction(c, portal));
                } else {
                    PortalScript script = iv.getInterface(PortalScript.class);
                    if (script != null) {
                        script.enter(new PortalPlayerInteraction(c, portal));
                    } else {
                        System.err.println("Unhandled portal script " + scriptName + " (no enter function) on map " + c.getPlayer().getMapId());
                        forceTeleport(portal, c);
                    }
                }
            } catch (Exception e) {
                System.err.println("Error entering Portalscript: " + scriptName + " : " + e);
                FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error entering Portalscript: " + scriptName + " : " + e);
                forceTeleport(portal, c);
            }
        } else {
            System.out.println("Unhandled portal script " + scriptName + " on map " + c.getPlayer().getMapId());
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Unhandled portal script " + scriptName + " on map " + c.getPlayer().getMapId());
            forceTeleport(portal, c);
        }
    }

    private void forceTeleport(final MaplePortal portal, final MapleClient c) {
        try {
            final int targetMap = portal.getTargetMapId();
            if (targetMap != 999999999 && targetMap != -1) {
                final handling.channel.ChannelServer cserv = handling.channel.ChannelServer.getInstance(c.getChannel());
                final server.maps.MapleMap to = cserv.getMapFactory().getMap(targetMap);
                if (to != null) {
                    c.getPlayer().changeMapPortal(to, to.getPortal(portal.getTarget()) == null ? to.getPortal(0) : to.getPortal(portal.getTarget()));
                }
            }
        } catch (Exception e) {
            // Ultimate fallback
        }
    }

    public final void clearScripts() {
        scripts.clear();
    }
}
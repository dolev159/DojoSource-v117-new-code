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
import constants.WorldConstants;
import java.util.Map;
import java.util.WeakHashMap;
import java.util.concurrent.locks.Lock;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import server.quest.MapleQuest;
import tools.FileoutputUtil;

public class NPCScriptManager extends AbstractScriptManager {

    private final Map<MapleClient, NPCConversationManager> cms = new WeakHashMap<MapleClient, NPCConversationManager>();
    private static final NPCScriptManager instance = new NPCScriptManager();

    public static final NPCScriptManager getInstance() {
        return instance;
    }

    public final boolean hasScript(final MapleClient c, final int npc, String filename) {
        Invocable iv = getInvocable("npc/world" + (c.getPlayer() != null ? c.getPlayer().getWorld() : WorldConstants.defaultserver) + "/" + npc + ".js", c, true);
        if (filename != null) {
            iv = getInvocable("npc/world" + (c.getPlayer() != null ? c.getPlayer().getWorld() : WorldConstants.defaultserver) + "/" + filename + ".js", c, true);
        }
        if (iv == null) {
            return false;
        }
        return true;
    }

    public final void start(final MapleClient c, final int npc) {
        start(c, npc, 0, null);
    }

    public final void start(final MapleClient c, final int npc, String filename) {
        start(c, npc, 0, filename);
    }

    public final void start(MapleClient c, int npc, int npcObjectid, String filename) {
        final Lock lock = c.getNPCLock();
        lock.lock();
        try {
            if (!cms.containsKey(c) && c.canClickNPC()) {
                String scriptPath = (filename != null) ? "npc/" + filename + ".js" : "npc/" + npc + ".js";
                Invocable iv = getInvocable(scriptPath, c, true);

                if (iv == null) {
                    iv = getInvocable("npc/default/" + (filename != null ? filename : npc) + ".js", c, true);
                    if (iv == null) {
                        iv = getInvocable("npc/notcoded.js", c, true);
                        if (iv == null) {
                            dispose(c);
                            return;
                        }
                    }
                }

                final ScriptEngine scriptengine = (ScriptEngine) iv;
                final NPCConversationManager cm = new NPCConversationManager(c, npc, -1, npcObjectid, -1, iv);
                cms.put(c, cm);
                scriptengine.put("cm", cm);

                c.getPlayer().setConversation(1);
                c.setClickedNPC();
                
                try {
                    if (hasMethod(iv, "start")) {
                        iv.invokeFunction("start");
                    } else if (hasMethod(iv, "action")) {
                        iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                    } else {
                        System.err.println("NPC " + npc + " has no start() or action() function.");
                        dispose(c);
                    }
                } catch (NoSuchMethodException nsme) {
                    iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                }
            }
        } catch (final Exception e) {
            System.err.println("Error executing NPC script, NPC ID : " + npc + "." + e);
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing NPC script, NPC ID : " + npc + "." + e);
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public final void action(final MapleClient c, final byte mode, final byte type, final int selection) {
        if (mode != -1) {
            final NPCConversationManager cm = cms.get(c);
            if (cm == null || cm.getLastMsg() > -1) {
                return;
            }
            final Lock lock = c.getNPCLock();
            lock.lock();
            try {
                if (cm.pendingDisposal) {
                    dispose(c);
                } else {
                    c.setClickedNPC();
                    if (hasMethod(cm.getIv(), "action")) {
                        cm.getIv().invokeFunction("action", mode, type, selection);
                    } else {
                        dispose(c);
                    }
                }
            } catch (final Exception e) {
                System.err.println("Error executing NPC script. NPC ID : " + cm.getNpc() + ":" + e);
                dispose(c);
                FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing NPC script, NPC ID : " + cm.getNpc() + "." + e);
            } finally {
                lock.unlock();
            }
        }
    }

    public final void startQuest(final MapleClient c, final int npc, final int quest) {
        startQuest(c, npc, -1, quest);
    }

    public final void startQuest(final MapleClient c, final int npc, final int npcObjectid, final int quest) {
        if (!MapleQuest.getInstance(quest).canStart(c.getPlayer(), null)) {
            return;
        }
        final Lock lock = c.getNPCLock();
        lock.lock();
        try {
            if (!cms.containsKey(c) && c.canClickNPC()) {
                final Invocable iv = getInvocable("quest/" + quest + ".js", c, true);
                if (iv == null) {
                    MapleQuest.getInstance(quest).start(c.getPlayer(), npc);
                    dispose(c);
                    return;
                }
                final ScriptEngine scriptengine = (ScriptEngine) iv;
                final NPCConversationManager cm = new NPCConversationManager(c, npc, quest, npcObjectid, 0, iv);
                cms.put(c, cm);
                scriptengine.put("qm", cm);

                c.getPlayer().setConversation(1);
                c.setClickedNPC();
                
                try {
                    if (hasMethod(iv, "start")) {
                        iv.invokeFunction("start", (byte) 1, (byte) 0, 0);
                    } else if (hasMethod(iv, "action")) {
                        iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                    } else {
                        MapleQuest.getInstance(quest).start(c.getPlayer(), npc);
                        dispose(c);
                    }
                } catch (NoSuchMethodException nsme) {
                    iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                }
            }
        } catch (final Exception e) {
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing Quest script. (" + quest + ")..NPCID: " + npc + ":" + e);
            try {
                MapleQuest.getInstance(quest).start(c.getPlayer(), npc);
            } catch (Exception e2) {
                // Binary fallback failed, already logged to file in outer catch? 
                // Actually the outer catch logs 'e', not 'e2'.
                FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Critical failure: Binary fallback for quest " + quest + " also failed. " + e2);
            }
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public final void startQuest(final MapleClient c, final byte mode, final byte type, final int selection) {
        final Lock lock = c.getNPCLock();
        final NPCConversationManager cm = cms.get(c);
        if (cm == null || cm.getLastMsg() > -1) {
            return;
        }
        lock.lock();
        try {
            if (cm.pendingDisposal) {
                dispose(c);
            } else {
                c.setClickedNPC();
                try {
                    if (hasMethod(cm.getIv(), "start")) {
                        cm.getIv().invokeFunction("start", mode, type, selection);
                    } else {
                        cm.getIv().invokeFunction("action", mode, type, selection);
                    }
                } catch (NoSuchMethodException nsme) {
                    cm.getIv().invokeFunction("action", mode, type, selection);
                }
            }
        } catch (Exception e) {
            System.err.println("Error executing Quest script. (" + cm.getQuest() + ")...NPC: " + cm.getNpc() + ":" + e);
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing Quest script. (" + cm.getQuest() + ")..NPC ID: " + cm.getNpc() + ":" + e);
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public final void endQuest(final MapleClient c, final int npc, final int quest, final boolean customEnd) {
        endQuest(c, npc, -1, quest, customEnd);
    }

    public final void endQuest(final MapleClient c, final int npc, final int npcObjectid, final int quest, final boolean customEnd) {
        if (!customEnd && !MapleQuest.getInstance(quest).canComplete(c.getPlayer(), null)) {
            return;
        }
        final Lock lock = c.getNPCLock();
        lock.lock();
        try {
            if (!cms.containsKey(c) && c.canClickNPC()) {
                final Invocable iv = getInvocable("quest/" + quest + ".js", c, true);
                if (iv == null) {
                    MapleQuest.getInstance(quest).complete(c.getPlayer(), npc);
                    dispose(c);
                    return;
                }
                final ScriptEngine scriptengine = (ScriptEngine) iv;
                final NPCConversationManager cm = new NPCConversationManager(c, npc, quest, npcObjectid, 1, iv);
                cms.put(c, cm);
                scriptengine.put("qm", cm);

                c.getPlayer().setConversation(1);
                c.setClickedNPC();
                try {
                    if (hasMethod(iv, "end")) {
                        iv.invokeFunction("end", (byte) 1, (byte) 0, 0);
                    } else if (hasMethod(iv, "action")) {
                        iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                    } else {
                        MapleQuest.getInstance(quest).complete(c.getPlayer(), npc);
                        dispose(c);
                    }
                } catch (NoSuchMethodException nsme) {
                    iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                }
            }
        } catch (Exception e) {
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing Quest script. (" + quest + ")..NPC ID: " + npc + ":" + e);
            try {
                MapleQuest.getInstance(quest).complete(c.getPlayer(), npc);
            } catch (Exception e2) {
                FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Critical failure: Binary fallback (complete) for quest " + quest + " also failed. " + e2);
            }
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public final void endQuest(final MapleClient c, final byte mode, final byte type, final int selection) {
        final Lock lock = c.getNPCLock();
        final NPCConversationManager cm = cms.get(c);
        if (cm == null || cm.getLastMsg() > -1) {
            return;
        }
        lock.lock();
        try {
            if (cm.pendingDisposal) {
                dispose(c);
            } else {
                c.setClickedNPC();
                try {
                    if (hasMethod(cm.getIv(), "end")) {
                        cm.getIv().invokeFunction("end", mode, type, selection);
                    } else {
                        cm.getIv().invokeFunction("action", mode, type, selection);
                    }
                } catch (NoSuchMethodException nsme) {
                    cm.getIv().invokeFunction("action", mode, type, selection);
                }
            }
        } catch (Exception e) {
            System.err.println("Error executing Quest script. (" + cm.getQuest() + ")...NPC: " + cm.getNpc() + ":" + e);
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing Quest script. (" + cm.getQuest() + ")..NPC ID: " + cm.getNpc() + ":" + e);
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public final void startItemScript(final MapleClient c, final int npc, final String script, final int itemid) {
        final Lock lock = c.getNPCLock();
        lock.lock();
        try {
            if (!cms.containsKey(c) && c.canClickNPC()) {
                final Invocable iv = getInvocable("item/" + script + ".js", c, true);
                if (iv == null) {
                    System.out.println("New scripted item : " + itemid);
                    dispose(c);
                    return;
                }
                final ScriptEngine scriptengine = (ScriptEngine) iv;
                final NPCConversationManager cm = new NPCConversationManager(c, npc, -1, 0, -1, iv);
                cms.put(c, cm);
                scriptengine.put("im", cm);
                c.getPlayer().setConversation(1);
                c.setClickedNPC();
                iv.invokeFunction("use");
            }
        } catch (final Exception e) {
            System.err.println("Error executing Item script, ITEM ID : " + itemid + "." + e);
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing Item script, ITEM ID : " + itemid + "." + e);
            dispose(c);
        } finally {
            lock.unlock();
        }
    }
    
    public final void dispose(final MapleClient c) {
        final NPCConversationManager npccm = cms.get(c);
        if (npccm != null) {
            cms.remove(c);
            if (npccm.getType() == -1) {
                c.removeScriptEngine("scripts/npc/" + npccm.getNpc() + ".js");
                c.removeScriptEngine("scripts/npc/notcoded.js");
            } else {
                // Validation-on-Dispose logic
                if (c.getPlayer() != null && npccm.getQuest() > 0) {
                    MapleQuest quest = MapleQuest.getInstance(npccm.getQuest());
                    if (c.getPlayer().getQuestStatus(npccm.getQuest()) == 1 && quest.canComplete(c.getPlayer(), npccm.getNpc())) {
                        quest.complete(c.getPlayer(), npccm.getNpc());
                    }
                }
                c.removeScriptEngine("scripts/quest/" + npccm.getQuest() + ".js");
            }
        }
        if (c.getPlayer() != null && c.getPlayer().getConversation() == 1) {
            c.getPlayer().setConversation(0);
        }
    }

    public final NPCConversationManager getCM(final MapleClient c) {
        return cms.get(c);
    }


}
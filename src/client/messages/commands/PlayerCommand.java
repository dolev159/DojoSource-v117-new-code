package client.messages.commands;

import client.MapleCharacter;
import client.MapleClient;
import constants.GameConstants;
import constants.ServerConstants.PlayerGMRank;
import handling.channel.ChannelServer;
import handling.world.World;
import scripting.NPCScriptManager;
import tools.FileoutputUtil;
import tools.StringUtil;
import tools.packet.CWvsContext;

/**
 * 1x GMS Like Player Command List
 * Mostly empty, just the essentials required for players to unstuck themselves.
 * @author Antigravity
 */
public class PlayerCommand {

    public static PlayerGMRank getPlayerLevelRequired() {
        return PlayerGMRank.NORMAL;
    }

    public static class dispose extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.removeClickedNPC();
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(CWvsContext.enableActions());
            c.getPlayer().dropMessage(6, "[Notice] You have been disposed and your actions are enabled.");
            return 1;
        }
    }

    public static class help extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(6, ".::::::::::::::::::::::::::::::: Player Commands ::::::::::::::::::::::::::::::::.");
            c.getPlayer().dropMessage(6, "@dispose - Use this if you are stuck talking to an NPC.");
            c.getPlayer().dropMessage(6, "@uptime  - Checks the server uptime.");
            c.getPlayer().dropMessage(6, "@info    - Checks the server information.");
            return 1;
        }
    }
    
    public static class uptime extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(6, "Server has been up for " + StringUtil.getReadableMillis(ChannelServer.serverStartTime, System.currentTimeMillis()));
            return 1;
        }
    }
    
    public static class info extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(5, "Welcome to the Server.");
            c.getPlayer().dropMessage(5, "Rates: 1x EXP / 1x Meso / 1x Drop");
            c.getPlayer().dropMessage(5, "Version: 117.2");
            return 1;
        }
    }
}
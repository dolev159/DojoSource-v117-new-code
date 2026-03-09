package server;

import database.DatabaseConnection;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.World;
import java.lang.management.ManagementFactory;
import java.sql.SQLException;
import javax.management.MBeanServer;
import javax.management.ObjectName;
import server.Timer.BuffTimer;
import server.Timer.CloneTimer;
import server.Timer.EtcTimer;
import server.Timer.EventTimer;
import server.Timer.MapTimer;
import server.Timer.PingTimer;
import server.Timer.WorldTimer;
import server.events.EventInstanceManager;
import tools.packet.CWvsContext;

public class ShutdownServer implements ShutdownServerMBean {

    public static ShutdownServer instance;

    public static void registerMBean() {
        MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
        try {
            instance = new ShutdownServer();
            mBeanServer.registerMBean(instance, new ObjectName("server:type=ShutdownServer"));
        } catch (Exception e) {
            System.out.println("Error registering Shutdown MBean");
            e.printStackTrace();
        }
    }

    public static ShutdownServer getInstance() {
	return instance;
    }

    public int mode = 0;

    public void shutdown() {// Can execute twice
	run();
    }

    @Override
    public void run() {
        if (mode == 0) {
            int ret = 0;
            World.Broadcast.broadcastMessage(CWvsContext.serverNotice(0, "Zipangu World is going to Shutdown soon. Please kindly log off now."));
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                cs.setShutdown();
                cs.setServerMessage("Zipangu World is going to Shutdown soon. Please kindly log off now.");
                ret += cs.closeAllMerchant();
            }
            World.Guild.save();
            World.Alliance.save();
            World.Family.save();
            
            // Gracefully dispose all active event instances
            EventInstanceManager.getInstance().disposeAll();
            
            System.out.println("First Shutdown phase completed. Hired Merchants saved: " + ret);
            mode++;
        } else if (mode == 1) {
            mode++;
            System.out.println("Final Shutdown phase commencing...");
            try {
                World.Broadcast.broadcastMessage(CWvsContext.serverNotice(0, "Zipangu World is shutting down NOW. Saving data..."));
                
                // Shutdown Channel Servers
                for (Integer i : ChannelServer.getAllInstance()) {
                    try {
                        ChannelServer cs = ChannelServer.getInstance(i);
                        if (cs != null) {
                            cs.shutdown();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                
                // Shutdown Login and Cash Shop
                LoginServer.shutdown();
                CashShopServer.shutdown();
                
                // Close DB connections
                DatabaseConnection.closeAll();
                
            } finally {
                WorldTimer.getInstance().stop();
                MapTimer.getInstance().stop();
                BuffTimer.getInstance().stop();
                CloneTimer.getInstance().stop();
                EventTimer.getInstance().stop();
                EtcTimer.getInstance().stop();
                PingTimer.getInstance().stop();
            }
            System.out.println("Shutdown successful. Server will exit in 5 seconds.");
            try {
                Thread.sleep(5000);
            } catch (Exception e) {
                // ignore
            }
            System.exit(0);
        }
    }
}
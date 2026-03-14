package server;

import client.SkillFactory;
import client.inventory.MapleInventoryIdentifier;
import constants.ServerConstants;
import constants.WorldConstants;
import database.DatabaseConnection;
import handling.MapleServerHandler;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.channel.MapleGuildRanking;
import handling.login.LoginInformationProvider;
import handling.login.LoginServer;
import handling.world.World;
import handling.world.family.MapleFamily;
import handling.world.guild.MapleGuild;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import server.Timer.BuffTimer;
import server.Timer.CloneTimer;
import server.Timer.EtcTimer;
import server.Timer.EventTimer;
import server.Timer.MapTimer;
import server.Timer.PingTimer;
import server.Timer.WorldTimer;
import server.events.MapleOxQuizFactory;
import server.life.MapleLifeFactory;
import server.life.MapleMonsterInformationProvider;
import server.life.MobSkillFactory;
import server.life.PlayerNPC;
import server.maps.MapleMapFactory;
import server.quest.MapleQuest;
import tools.MapleAESOFB;
import tools.FileoutputUtil;

public class Start {

    public static final long startTime = System.currentTimeMillis();
    public static final Start instance = new Start();
    public static final AtomicInteger completedLoadingThreads = new AtomicInteger(0);
    private static final String STARTUP_BANNER = "============================================";

    public void run() throws InterruptedException {

        // Set up global uncaught exception handler - catches ALL unhandled errors
        Thread.setDefaultUncaughtExceptionHandler((thread, throwable) -> {
            System.err.println("\n!!! UNCAUGHT EXCEPTION in thread [" + thread.getName() + "] !!!");
            throwable.printStackTrace(System.err);
            FileoutputUtil.logCrash("Thread: " + thread.getName(), throwable);
        });

        FileoutputUtil.logStartup(STARTUP_BANNER);
        FileoutputUtil.logStartup("  DojoSource v117 Server Starting...");
        FileoutputUtil.logStartup(STARTUP_BANNER);

        if (Boolean.parseBoolean(ServerProperties.getProperty("net.sf.odinms.world.admin")) || ServerConstants.Use_Localhost) {
            System.out.println("Maintenance is currently active.");
        }

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("UPDATE accounts SET loggedin = 0")) {
            ps.executeUpdate();
            FileoutputUtil.logStartup("Database connection successful.");
        } catch (SQLException ex) {
            FileoutputUtil.logCrash("Database connection failed", ex);
            throw new RuntimeException("Runtime Exception - Check if the SQL Database is connected.");
        }

        FileoutputUtil.logStartup("Zipangu is Active.");
        System.out.println("Zipangu is Active.");
        World.init();
        handling.world.World.registerAutoSave();
        if (Boolean.parseBoolean(ServerProperties.getProperty("logpackets"))) {
            System.out.println("Logging Packets.");
        }
        System.out.println("Maple Version: " + ServerConstants.MAPLE_VERSION + "." + ServerConstants.MAPLE_PATCH);
        System.out.println("Server Rates: " + WorldConstants.Servers.Scania.getExp() + "/" + WorldConstants.Servers.Scania.getMeso() + "/" + WorldConstants.Servers.Scania.getDrop());

        boolean encryptionfound = false;
        for (MapleAESOFB.EncryptionKey encryptkey : MapleAESOFB.EncryptionKey.values()) {
            if (("V" + ServerConstants.MAPLE_VERSION).equals(encryptkey.name())) {
                System.out.println("System has successfully found the packet encryption.");
                encryptionfound = true;
                break;
            }
        }
        if (!encryptionfound) {
            System.out.println("System could not locate encryption for the current version, so it is using the latest Encryption.");
        }
        System.out.println("Loading Instances...");
        WorldTimer.getInstance().start();
        EtcTimer.getInstance().start();
        MapTimer.getInstance().start();
        CloneTimer.getInstance().start();
        EventTimer.getInstance().start();
        BuffTimer.getInstance().start();
        PingTimer.getInstance().start();
        server.Timer.DatabaseTimer.getInstance().start();
        System.out.println("Initiating Parallel Engine Boot...");
        ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());

        executor.submit(() -> { MapleGuildRanking.getInstance().load(); MapleGuild.loadAll(); });
        executor.submit(() -> MapleFamily.loadAll());
        executor.submit(() -> { MapleLifeFactory.loadQuestCounts(); MapleQuest.initQuests(); });
        executor.submit(() -> { MapleItemInformationProvider.getInstance().runEtc(); MapleItemInformationProvider.getInstance().runItems(); });
        executor.submit(SkillFactory::load);
        executor.submit(MapleLifeFactory::loadAllMonsterStats);
        executor.submit(() -> { MapleMonsterInformationProvider.getInstance().load(); });
        executor.submit(LoginInformationProvider::getInstance);
        executor.submit(RandomRewards::load);
        executor.submit(MapleOxQuizFactory::getInstance);
        executor.submit(MapleCarnivalFactory::getInstance);
        executor.submit(() -> { CharacterCardFactory.getInstance().initialize(); });
        executor.submit(MobSkillFactory::getInstance);
        executor.submit(SpeedRunner::loadSpeedRuns);
        executor.submit(MTSStorage::load);
        executor.submit(MapleInventoryIdentifier::getInstance);
        executor.submit(MapleMapFactory::loadCustomLife);
        executor.submit(() -> { CashItemFactory.getInstance().initialize(); });
        executor.submit(PlayerNPC::loadAll);
        
        executor.shutdown();
        try {
            if (!executor.awaitTermination(5, TimeUnit.MINUTES)) {
                System.err.println("[CRITICAL] Parallel boot timed out after 5 minutes!");
            }
        } catch (InterruptedException e) {
            System.err.println("[CRITICAL] Parallel boot interrupted!");
        }

        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("DELETE FROM `moonlightachievements` where achievementid > 0;")) {
            ps.executeUpdate();
        } catch (SQLException ex) {
            FileoutputUtil.logDatabaseError("DELETE moonlightachievements", ex);
        }

        MapleServerHandler.initiate();
        FileoutputUtil.logStartup("Loading Zipangu Login Server...");
        LoginServer.run_startup_configurations();
        FileoutputUtil.logStartup("Zipangu Login Server is Online!");

        FileoutputUtil.logStartup("Loading Zipangu Channel Server...");
        ChannelServer.startChannel_Main();
        FileoutputUtil.logStartup("Zipangu Channel Server is Online!");

        FileoutputUtil.logStartup("Loading Zipangu Cash Shop Server...");
        CashShopServer.run_startup_configurations();
        FileoutputUtil.logStartup("Zipangu Cash Shop Server is Online!");
        Runtime.getRuntime().addShutdownHook(new Thread(new Shutdown()));
        World.registerRespawn();
        World.registerAutoSave(); // Global Asynchronous Save Task
        System.out.println("Channel Workers (Respawn & Auto-save) registered.");
        ShutdownServer.registerMBean();
        LoginServer.setOn();
        RankingWorker.run();
        long launchTime = (System.currentTimeMillis() - startTime) / 1000;
        FileoutputUtil.logStartup(STARTUP_BANNER);
        FileoutputUtil.logStartup("  Server launched successfully in " + launchTime + " seconds!");
        FileoutputUtil.logStartup(STARTUP_BANNER);
        System.out.println("Zipangu Server has launched successfully in " + launchTime + " Seconds.");
    }

    public static class Shutdown implements Runnable {

        @Override
        public void run() {
            ShutdownServer.getInstance().run();
            ShutdownServer.getInstance().run();
        }
    }

    public static void main(final String[] args) {
        // Redirect system streams to files immediately on startup
        FileoutputUtil.redirectSystemStreams();
        
        try {
            instance.run();
        } catch (Exception e) {
            System.err.println("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.err.println("!! FATAL ERROR - SERVER FAILED TO START !!");
            System.err.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            e.printStackTrace(System.err);
            FileoutputUtil.logCrash("FATAL - Server startup failed", e);
        }
    }
}
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
package database;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import constants.ServerConstants;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.util.Properties;
import java.sql.SQLException;
import tools.FileoutputUtil;

public class DatabaseConnection {

    private static volatile HikariDataSource dataSource;

    static {
        initDataSource();
    }

    /**
     * Initialize the HikariCP connection pool with optimized settings.
     * Called on startup and may be called again if the pool dies (auto-reconnect).
     */
    private static synchronized void initDataSource() {
        try {
            Properties dbProps = new Properties();
            try (FileInputStream fis = new FileInputStream("db.properties")) {
                dbProps.load(fis);
            } catch (IOException e) {
                // Ignore, will use ServerConstants as fallback
            }

            String port = dbProps.getProperty("sql.port", ServerConstants.SQL_PORT);
            String db = dbProps.getProperty("sql.database", ServerConstants.SQL_DATABASE);
            String user = dbProps.getProperty("sql.user", ServerConstants.SQL_USER);
            String pass = dbProps.getProperty("sql.password", ServerConstants.SQL_PASSWORD);

            HikariConfig config = new HikariConfig();

            // Connection URL with essential MySQL flags
            config.setJdbcUrl("jdbc:mysql://localhost:" + port
                    + "/" + db
                    + "?autoReconnect=true"
                    + "&useSSL=false"
                    + "&characterEncoding=UTF-8"
                    + "&useUnicode=true"
                    + "&serverTimezone=UTC"
                    + "&allowPublicKeyRetrieval=true");

            config.setDriverClassName("com.mysql.jdbc.Driver");
            config.setUsername(user);
            config.setPassword(pass);
            config.setPoolName("DojoSource-DB-Pool");

            // =============================================
            // [Phase B] Pool Sizing & Response Tuning
            // =============================================
            // maximumPoolSize: 30 is ideal for 100-500 players, preventing MySQL saturation.
            config.setMaximumPoolSize(30);
            // minimumIdle: Maintains 10 ready-to-use connections for instant response.
            config.setMinimumIdle(10);

            // =============================================
            // [Phase B] Monitoring & Leak Prevention
            // =============================================
            // leakDetectionThreshold: Logs a warning if a thread holds a connection for > 30s.
            // This is the #1 tool to find unclosed Statements/ResultSets.
            config.setLeakDetectionThreshold(30000);
            
            // =============================================
            // Timeouts & Life Cycle
            // =============================================
            config.setConnectionTimeout(10000);
            config.setIdleTimeout(300000);
            config.setMaxLifetime(600000);
            config.setKeepaliveTime(30000);
            config.setConnectionTestQuery("SELECT 1");

            // =============================================
            // Phase B Performance Switches: PreparedStatement Caching
            // =============================================
            config.addDataSourceProperty("cachePrepStmts", "true");
            config.addDataSourceProperty("prepStmtCacheSize", "500");
            config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
            config.addDataSourceProperty("useServerPrepStmts", "true");
            config.addDataSourceProperty("useLocalSessionState", "true");
            config.addDataSourceProperty("rewriteBatchedStatements", "true");
            config.addDataSourceProperty("cacheResultSetMetadata", "true");
            config.addDataSourceProperty("cacheServerConfiguration", "true");

            dataSource = new HikariDataSource(config);

            System.out.println("[DB] [Phase B] HikariCP Pool Optimized. Leak Detection: ON (30s). MaxPoolSize: "
                    + config.getMaximumPoolSize());

        } catch (Exception e) {
            System.err.println("[DB] FATAL: Failed to initialize database connection pool!");
            e.printStackTrace();
            FileoutputUtil.logCrash("DatabaseConnection.initDataSource", e);
            throw new RuntimeException("Cannot start server without database connection.", e);
        }
    }

    /**
     * Get a connection from the pool.
     * If the pool is dead, attempts to reinitialize it once (handles DB restarts).
     */
    public static final Connection getConnection() {
        // Fast path: pool is healthy
        if (dataSource != null && !dataSource.isClosed()) {
            try {
                return dataSource.getConnection();
            } catch (SQLException e) {
                System.err.println("[DB] Error getting connection from pool: " + e.getMessage());
                FileoutputUtil.logDatabaseError("getConnection() - pool may be degraded", e);
            }
        }

        // Slow path: pool is dead or closed, try to reconnect
        System.err.println("[DB] Connection pool appears to be dead. Attempting to reinitialize...");
        try {
            if (dataSource != null && !dataSource.isClosed()) {
                dataSource.close();
            }
        } catch (Exception ignore) {
        }

        try {
            initDataSource();
            Connection conn = dataSource.getConnection();
            System.out.println("[DB] Reconnection to database successful!");
            return conn;
        } catch (Exception e) {
            System.err.println("[DB] FATAL: Could not reconnect to database! Server may be unstable.");
            FileoutputUtil.logCrash("DatabaseConnection.getConnection - reconnect failed", e);
            return null;
        }
    }

    /**
     * Gracefully close the connection pool on server shutdown.
     */
    public static final void closeAll() {
        if (dataSource != null && !dataSource.isClosed()) {
            System.out.println("[DB] Closing database connection pool...");
            dataSource.close();
            System.out.println("[DB] Database connection pool closed.");
        }
    }

    /**
     * Get current pool stats for monitoring/debugging.
     */
    public static final String getPoolStats() {
        if (dataSource == null || dataSource.isClosed()) {
            return "[DB] Pool is closed or not initialized.";
        }
        return "[DB Pool Stats] Pool: " + dataSource.getPoolName()
                + " | MaxSize: " + dataSource.getMaximumPoolSize();
    }

    // JDBC constant declarations
    public static final int CLOSE_CURRENT_RESULT = 1;
    public static final int KEEP_CURRENT_RESULT = 2;
    public static final int CLOSE_ALL_RESULTS = 3;
    public static final int SUCCESS_NO_INFO = -2;
    public static final int EXECUTE_FAILED = -3;
    public static final int RETURN_GENERATED_KEYS = 1;
    public static final int NO_GENERATED_KEYS = 2;
}
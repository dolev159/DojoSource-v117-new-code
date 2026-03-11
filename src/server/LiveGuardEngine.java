package server;

import client.MapleCharacter;
import database.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class LiveGuardEngine {
    private static final LiveGuardEngine instance = new LiveGuardEngine();
    
    // Low priority queue for towns
    private final ExecutorService backgroundPool;
    // High priority queue for boss maps, trading
    private final ExecutorService instantPool;

    public enum SaveType {
        EXP("UPDATE characters SET exp = ? WHERE id = ?"),
        MESO("UPDATE characters SET meso = ? WHERE id = ?"),
        SP("UPDATE characters SET sp = ? WHERE id = ?"),
        ITEM_TRANSACTION(""); // Inventory is usually saved in bulk, handled independently if needed

        public final String sql;
        SaveType(String sql) {
            this.sql = sql;
        }
    }

    private LiveGuardEngine() {
        // AI-Driven Prioritization: separated thread pools
        backgroundPool = new ThreadPoolExecutor(2, 4, 60L, TimeUnit.SECONDS, new LinkedBlockingQueue<>());
        instantPool = Executors.newCachedThreadPool(); // Instant elasticity for high-priority saves
    }

    public static LiveGuardEngine getInstance() {
        return instance;
    }

    public void markDirty(final MapleCharacter chr, final SaveType type, final Object newValue) {
        if (chr == null || type == SaveType.ITEM_TRANSACTION) return; 
        
        final int charId = chr.getId();
        final boolean isHighPriority = isHighRisk(chr);
        
        Runnable saveTask = () -> {
            // Atomic Transaction Shield
            if (type == SaveType.ITEM_TRANSACTION) {
                chr.saveItemsToDB();
                return;
            }

            try (Connection con = DatabaseConnection.getConnection()) {
                con.setAutoCommit(false); // Begin transaction
                executeSave(con, type, charId, newValue);
                con.commit(); // Commit transaction safely
            } catch (SQLException e) {
                System.err.println("[LiveGuardEngine] DB Connection or Save Error: " + e.getMessage());
            }
        };

        if (isHighPriority) {
            instantPool.submit(saveTask);
        } else {
            backgroundPool.submit(saveTask);
        }
    }

    private void executeSave(Connection con, SaveType type, int charId, Object newValue) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement(type.sql)) {
            if (type == SaveType.EXP || type == SaveType.MESO) {
                ps.setInt(1, (Integer) newValue);
            } else if (type == SaveType.SP) {
                ps.setString(1, (String) newValue);
            }
            ps.setInt(2, charId);
            ps.executeUpdate();
        } catch (SQLException e) {
            con.rollback();
            throw e;
        }
    }

    public void shutdown() {
        System.out.println("[LiveGuardEngine] Shutting down pools and flushing pending saves...");
        backgroundPool.shutdown();
        instantPool.shutdown();
        try {
            if (!backgroundPool.awaitTermination(30, TimeUnit.SECONDS)) {
                backgroundPool.shutdownNow();
            }
            if (!instantPool.awaitTermination(30, TimeUnit.SECONDS)) {
                instantPool.shutdownNow();
            }
        } catch (InterruptedException e) {
            backgroundPool.shutdownNow();
            instantPool.shutdownNow();
            Thread.currentThread().interrupt();
        }
        System.out.println("[LiveGuardEngine] Shutdown complete.");
    }

    private boolean isHighRisk(MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) return false;
        // High risk if in a boss map
        if (chr.getMap().isBossMap()) return true;
        // High risk if trading
        if (chr.getTrade() != null) return true;
        return false;
    }
}

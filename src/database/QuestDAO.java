package database;

import client.MapleCharacter;
import client.MapleQuestStatus;
import server.quest.MapleQuest;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map.Entry;

/**
 * Quest Data Access Object (DAO)
 * [Phase B] High Performance & Modern Resource Management
 */
public class QuestDAO {

    public static Map<Integer, String> loadQuestInfo(Connection con, int charId) throws SQLException {
        Map<Integer, String> questInfo = new LinkedHashMap<>();
        String sql = "SELECT * FROM questinfo WHERE characterid = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, charId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    questInfo.put(rs.getInt("quest"), rs.getString("customData"));
                }
            }
        }
        return questInfo;
    }

    public static Map<MapleQuest, MapleQuestStatus> loadQuestStatus(Connection con, MapleCharacter chr) throws SQLException {
        Map<MapleQuest, MapleQuestStatus> quests = new LinkedHashMap<>();
        String sql = "SELECT * FROM queststatus WHERE characterid = ?";
        String mobSql = "SELECT * FROM queststatusmobs WHERE queststatusid = ?";
        
        try (PreparedStatement ps = con.prepareStatement(sql);
             PreparedStatement pse = con.prepareStatement(mobSql)) {
            ps.setInt(1, chr.getId());
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    int questId = rs.getInt("quest");
                    MapleQuest q = MapleQuest.getInstance(questId);
                    if (q == null) {
                        continue;
                    }
                    
                    byte status = rs.getByte("status");
                    MapleQuestStatus mqs = new MapleQuestStatus(q, status);
                    mqs.setCompletionTime(rs.getLong("time") * 1000);
                    mqs.setForfeited(rs.getInt("forfeited"));
                    mqs.setCustomData(rs.getString("customData"));
                    
                    // Load mob kills for this quest
                    pse.setInt(1, rs.getInt("queststatusid"));
                    try (ResultSet rsMobs = pse.executeQuery()) {
                        while (rsMobs.next()) {
                            mqs.setMobKills(rsMobs.getInt("mob"), rsMobs.getInt("count"));
                        }
                    }
                    quests.put(q, mqs);
                }
            }
        }
        return quests;
    }

    public static void saveQuestInfo(Connection con, int charId, Map<Integer, String> questInfo) throws SQLException {
        // Delete existing quest info
        String deleteSql = "DELETE FROM questinfo WHERE characterid = ?";
        try (PreparedStatement ps = con.prepareStatement(deleteSql)) {
            ps.setInt(1, charId);
            ps.executeUpdate();
        }

        // Insert new quest info
        if (questInfo != null && !questInfo.isEmpty()) {
            String insertSql = "INSERT INTO questinfo (`characterid`, `quest`, `customData`) VALUES (?, ?, ?)";
            try (PreparedStatement ps = con.prepareStatement(insertSql)) {
                for (Entry<Integer, String> entry : questInfo.entrySet()) {
                    ps.setInt(1, charId);
                    ps.setInt(2, entry.getKey());
                    ps.setString(3, entry.getValue());
                    ps.addBatch();
                }
                ps.executeBatch();
            }
        }
    }

    public static void saveQuestStatus(Connection con, int charId, Map<MapleQuest, MapleQuestStatus> quests) throws SQLException {
        // Delete existing quest status (cascading delete should handle mobs if foreign keys are set, 
        // but often they aren't in legacy servers, so we handle it)
        // Note: queststatusmobs depends on queststatusid, so we delete queststatus first.
        // If the DB has ON DELETE CASCADE it's easy. If not, we might need to delete mobs first.
        // For safety/legacy compatibility, we'll assume no FK cascade.
        
        // Actually, characterid is not in queststatusmobs usually. It's queststatusid.
        // So we delete where queststatusid IN (select queststatusid from queststatus where characterid = ?)
        String deleteMobsSql = "DELETE FROM queststatusmobs WHERE queststatusid IN (SELECT queststatusid FROM queststatus WHERE characterid = ?)";
        try (PreparedStatement ps = con.prepareStatement(deleteMobsSql)) {
            ps.setInt(1, charId);
            ps.executeUpdate();
        }

        String deleteQuestSql = "DELETE FROM queststatus WHERE characterid = ?";
        try (PreparedStatement ps = con.prepareStatement(deleteQuestSql)) {
            ps.setInt(1, charId);
            ps.executeUpdate();
        }

        if (quests != null && !quests.isEmpty()) {
            String insertQuestSql = "INSERT INTO queststatus (`queststatusid`, `characterid`, `quest`, `status`, `time`, `forfeited`, `customData`) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)";
            String insertMobSql = "INSERT INTO queststatusmobs VALUES (DEFAULT, ?, ?, ?)";
            
            try (PreparedStatement ps = con.prepareStatement(insertQuestSql, Statement.RETURN_GENERATED_KEYS);
                 PreparedStatement pse = con.prepareStatement(insertMobSql)) {
                
                for (MapleQuestStatus q : quests.values()) {
                    ps.setInt(1, charId);
                    ps.setInt(2, q.getQuest().getId());
                    ps.setInt(3, q.getStatus());
                    ps.setInt(4, (int) (q.getCompletionTime() / 1000));
                    ps.setInt(5, q.getForfeited());
                    ps.setString(6, q.getCustomData());
                    ps.executeUpdate();
                    
                    try (ResultSet rs = ps.getGeneratedKeys()) {
                        if (rs.next()) {
                            int generatedId = rs.getInt(1);
                            if (q.hasMobKills()) {
                                for (Entry<Integer, Integer> mob : q.getMobKills().entrySet()) {
                                    pse.setInt(1, generatedId);
                                    pse.setInt(2, mob.getKey());
                                    pse.setInt(3, mob.getValue());
                                    pse.addBatch();
                                }
                            }
                        }
                    }
                }
                pse.executeBatch();
            }
        }
    }
}

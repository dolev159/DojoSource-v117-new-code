package database;

import client.MapleCharacter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import tools.FileoutputUtil;
import tools.Triple;

/**
 * CharacterData Access Object (DAO)
 * [Phase B] High Performance & Modern Resource Management
 * 
 * This class uses Try-with-resources to ensure all database connections, 
 * PreparedStatements, and ResultSets are closed automatically.
 */
public class CharacterDAO {

    /**
     * Retrieves character ID by name.
     */
    public static int getIdByName(Connection con, String name) throws SQLException {
        String sql = "SELECT id FROM characters WHERE name = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, name);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt("id");
                }
            }
        }
        return -1;
    }

    /**
     * Gets character info (Id, AccountId, Gender) by name.
     */
    public static Triple<Integer, Integer, Integer> getInfoByName(Connection con, String name, int world) throws SQLException {
        String sql = "SELECT id, accountid, gender FROM characters WHERE name = ? AND world = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, name);
            ps.setInt(2, world);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Triple<>(rs.getInt("id"), rs.getInt("accountid"), rs.getInt("gender"));
                }
            }
        }
        return null;
    }

    /**
     * Atomic save of character login state.
     */
    public static void updateLoginState(Connection con, int charId, int state) throws SQLException {
        String sql = "UPDATE characters SET loginState = ? WHERE id = ?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, state);
            ps.setInt(2, charId);
            ps.executeUpdate();
        }
    }
}

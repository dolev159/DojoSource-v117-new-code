
package tools;

import database.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DBCheck {
    public static void main(String[] args) {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con
                        .prepareStatement("SELECT id, name FROM accounts ORDER BY id DESC LIMIT 10")) {
            try (ResultSet rs = ps.executeQuery()) {
                System.out.println("--- LATEST 10 ACCOUNTS ---");
                while (rs.next()) {
                    System.out.println("ID: " + rs.getInt("id") + " | Name: " + rs.getString("name"));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

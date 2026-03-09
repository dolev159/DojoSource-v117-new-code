package handling.login.handler;

import client.LoginCrypto;
import database.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AutoRegister {

    private static final int ACCOUNTS_PER_IP = 2;
    public static boolean autoRegister = true;
    public static boolean success = false;

    public static boolean getAccountExists(String login) {
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT name FROM accounts WHERE name = ?")) {
            ps.setString(1, login);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        } catch (SQLException ex) {
            System.out.println(ex);
        }
        return false;
    }

    public static void createAccount(String login, String pwd, String eip) {
        success = false;
        String address = eip;
        if (address.contains("/")) {
            address = address.split("/")[1];
        }
        if (address.contains(":")) {
            address = address.split(":")[0];
        }

        try (Connection con = DatabaseConnection.getConnection()) {
            try (PreparedStatement ipc = con.prepareStatement("SELECT SessionIP FROM accounts WHERE SessionIP = ?")) {
                ipc.setString(1, address);
                try (ResultSet rs = ipc.executeQuery()) {
                    if (rs.first() == false || (rs.last() == true && rs.getRow() < ACCOUNTS_PER_IP)) {
                        try (PreparedStatement ps = con.prepareStatement("INSERT INTO accounts (name, password, email, birthday, macs, SessionIP) VALUES (?, ?, ?, ?, ?, ?)")) {
                            ps.setString(1, login);
                            ps.setString(2, LoginCrypto.hexSha1(pwd));
                            ps.setString(3, "autoregister@mail.com");
                            ps.setString(4, "2008-04-07");
                            ps.setString(5, "00-00-00-00-00-00");
                            ps.setString(6, address);
                            ps.executeUpdate();
                        }
                        success = true;
                    }
                }
            }
        } catch (SQLException ex) {
            System.out.println(ex);
        }
    }
}
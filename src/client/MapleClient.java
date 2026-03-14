package client;

import constants.GameConstants;
import constants.ServerConstants;
import database.DatabaseConnection;
import database.DatabaseException;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.MapleMessengerCharacter;
import handling.world.MapleParty;
import handling.world.MaplePartyCharacter;
import handling.world.PartyOperation;
import handling.world.World;
import handling.world.family.MapleFamilyCharacter;
import handling.world.guild.MapleGuildCharacter;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import javax.script.ScriptEngine;
// import org.apache.mina.common.IoSession;
import io.netty.channel.Channel;
import io.netty.util.AttributeKey;

import server.CharacterCardFactory;
import server.Timer.PingTimer;
import server.maps.MapleMap;
import server.quest.MapleQuest;
import server.shops.IMaplePlayerShop;
import tools.FileoutputUtil;
import tools.MapleAESOFB;
import tools.Pair;
import tools.packet.CField;
import tools.packet.LoginPacket;

public class MapleClient implements Serializable {

    private static final long serialVersionUID = 9179541993413738569L;
    public static final byte LOGIN_NOTLOGGEDIN = 0,
            LOGIN_SERVER_TRANSITION = 1,
            LOGIN_LOGGEDIN = 2,
            CHANGE_CHANNEL = 3;
    public static final int DEFAULT_CHARSLOT = 6;
    public static final AttributeKey<MapleClient> CLIENT_KEY = AttributeKey.valueOf("CLIENT");
    private transient MapleAESOFB send, receive;
    private transient Object session; // Legacy Mina support placeholder if needed
    private transient Channel nettyChannel;

    private MapleCharacter player;
    private int channel = 1, accId = -1, world, birthday;
    private int charslots = DEFAULT_CHARSLOT;
    private boolean loggedIn = false, serverTransition = false;
    private transient Calendar tempban = null;
    private transient String accountName;
    private transient long lastPong = 0, lastPing = 0;
    private int receivedPackets = 0;
    private boolean monitored = false, receiving = true, firstSend = true, firstRecv = true;

    public final boolean isFirstSend() {
        return firstSend;
    }

    public final void setFirstSend(boolean firstSend) {
        this.firstSend = firstSend;
    }

    public final boolean isFirstRecv() {
        return firstRecv;
    }

    public final void setFirstRecv(boolean firstRecv) {
        this.firstRecv = firstRecv;
    }

    private boolean gm;
    private byte greason = 1, gender = -1;
    public transient short loginAttempt = 0;
    private transient List<Integer> allowedChar = new LinkedList<Integer>();
    private transient Set<String> macs = new HashSet<String>();
    private transient Map<String, ScriptEngine> engines = new HashMap<String, ScriptEngine>();
    private transient ScheduledFuture<?> idleTask = null;
    private transient String secondPassword, salt2, tempIP = ""; // To be used only on login
    private final transient Lock mutex = new ReentrantLock(true);
    private final transient Lock npc_mutex = new ReentrantLock();
    private long lastNpcClick = 0;

    private Map<Integer, Pair<Short, Short>> charInfo = new LinkedHashMap<>();

    public MapleClient(MapleAESOFB send, MapleAESOFB receive, Object session) {
        this.send = send;
        this.receive = receive;
        this.session = session;
    }

    public final MapleAESOFB getReceiveCrypto() {
        return receive;
    }

    public final MapleAESOFB getSendCrypto() {
        return send;
    }

    public final MapleClient getSession() {
        return this;
    }

    public final void write(Object packet) {
        if (packet instanceof byte[] byteArray) {
            sendPacket(byteArray);
        }
    }

    public final void setNettyChannel(Channel channel) {
        this.nettyChannel = channel;
    }

    public final Channel getNettyChannel() {
        return nettyChannel;
    }

    public final void sendPacket(byte[] packet) {
        if (nettyChannel != null && nettyChannel.isActive()) {
            nettyChannel.writeAndFlush(packet);
        } else if (session != null) {
            // For transition: We can't call .write() on Object without reflection
            // But since we want to abandon Mina, we should focus on nettyChannel.
            // If session is still used, it will need a proper cast or reflection.
        }
    }

    public final void disconnect() {
        disconnect(false, false);
    }

    public final void close() {
        disconnect();
    }

    public final String getRemoteAddress() {
        if (nettyChannel != null) {
            return nettyChannel.remoteAddress().toString();
        }
        return "0.0.0.0";
    }

    public final String getSessionIPAddress() {
        if (nettyChannel != null) {
            String addr = nettyChannel.remoteAddress().toString();
            if (addr.startsWith("/")) {
                addr = addr.substring(1);
            }
            if (addr.contains(":")) {
                addr = addr.split(":")[0];
            }
            return addr;
        }
        return "127.0.0.1";
    }

    public final boolean isLocalhost() {
        String ip = getSessionIPAddress();
        return ip.equals("127.0.0.1") || ip.equals("localhost") || ip.equals("0:0:0:0:0:0:0:1") || ip.startsWith("192.168.") || ip.startsWith("10.");
    }

    public final Object getHandler() {
        return null; // Stub for legacy command support
    }

    public final boolean isConnected() {
        return nettyChannel != null && nettyChannel.isActive();
    }

    public final boolean isClosing() {
        return nettyChannel != null && !nettyChannel.isOpen();
    }

    public final Object getAttribute(String key) {
        return null; // Stub for legacy session attributes
    }

    public final Lock getLock() {
        return mutex;
    }

    public final Lock getNPCLock() {
        return npc_mutex;
    }

    public MapleCharacter getPlayer() {
        return player;
    }

    public void setPlayer(MapleCharacter player) {
        this.player = player;
    }

    public void createdChar(final int id) {
        allowedChar.add(id);
    }

    public final boolean login_Auth(final int id) {
        return allowedChar.contains(id);
    }

    public final List<MapleCharacter> loadCharacters(final int serverId) {
        long start = System.currentTimeMillis();
        final List<MapleCharacter> chars = new LinkedList<>();

        final Map<Integer, CardData> cardss = CharacterCardFactory.getInstance().loadCharacterCards(accId, serverId);
        List<CharNameAndId> internalChars = loadCharactersInternal(serverId);
        
        for (final CharNameAndId cni : internalChars) {
            // OPTIMIZATION: Use loadCharList for selection lobby instead of full loadCharFromDB
            final MapleCharacter chr = MapleCharacter.loadCharList(cni.id, this);
            chars.add(chr);
            charInfo.put(chr.getId(), new Pair<>(chr.getLevel(), chr.getJob())); 
            if (!login_Auth(chr.getId())) {
                allowedChar.add(chr.getId());
            }
        }
        System.out.println("[DEBUG] Total optimized loadCharacters took " + (System.currentTimeMillis() - start) + "ms");
        return chars;
    }

    public void charLoginState(int charLoginNewState) {
        if (player == null) {
            return;
        }
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("UPDATE characters SET loginState = ? WHERE id = ?")) {
            ps.setInt(1, charLoginNewState);
            ps.setInt(2, player.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public final void updateCharacterCards(final Map<Integer, Integer> cids) {
        if (charInfo.isEmpty()) { // No characters
            return;
        }
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("DELETE FROM `character_cards` WHERE `accid` = ?")) {
            ps.setInt(1, accId);
            ps.executeUpdate();

            try (PreparedStatement psu = con.prepareStatement(
                    "INSERT INTO `character_cards` (accid, worldid, characterid, position) VALUES (?, ?, ?, ?)")) {
                for (final Entry<Integer, Integer> ii : cids.entrySet()) {
                    final Pair<Short, Short> info = charInfo.get(ii.getValue());
                    if (info == null || ii.getValue() == 0
                            || !CharacterCardFactory.getInstance().canHaveCard(info.getLeft(), info.getRight())) {
                        continue;
                    }
                    psu.setInt(1, accId);
                    psu.setInt(2, world);
                    psu.setInt(3, ii.getValue());
                    psu.setInt(4, ii.getKey());
                    psu.executeUpdate();
                }
            }
        } catch (SQLException sqlE) {
            System.out.println("Failed to update character cards. Reason: " + sqlE.toString());
        }
    }

    public boolean canMakeCharacter(int serverId) {
        return loadCharactersSize(serverId) < getCharacterSlots();
    }

    public List<String> loadCharacterNames(int serverId) {
        List<String> chars = new LinkedList<String>();
        for (CharNameAndId cni : loadCharactersInternal(serverId)) {
            chars.add(cni.name);
        }
        return chars;
    }

    private List<CharNameAndId> loadCharactersInternal(int serverId) {
        List<CharNameAndId> chars = new LinkedList<>();
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con
                        .prepareStatement("SELECT id, name, gm FROM characters WHERE accountid = ? AND world = ?")) {
            ps.setInt(1, accId);
            ps.setInt(2, serverId);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    chars.add(new CharNameAndId(rs.getString("name"), rs.getInt("id")));
                    LoginServer.getLoginAuth(rs.getInt("id"));
                }
            }
        } catch (SQLException e) {
            System.err.println("Error loading characters internal");
            e.printStackTrace();
        }
        return chars;
    }

    private int loadCharactersSize(int serverId) {
        int chars = 0;
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con
                        .prepareStatement("SELECT count(*) FROM characters WHERE accountid = ? AND world = ?")) {
            ps.setInt(1, accId);
            ps.setInt(2, serverId);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    chars = rs.getInt(1);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error loading characters size");
            e.printStackTrace();
        }
        return chars;
    }

    public boolean isLoggedIn() {
        return loggedIn && accId >= 0;
    }

    private Calendar getTempBanCalendar(ResultSet rs) throws SQLException {
        Calendar lTempban = Calendar.getInstance();
        if (rs.getLong("tempban") == 0) { // Basically if timestamp in db is 0000-00-00
            lTempban.setTimeInMillis(0);
            return lTempban;
        }
        Calendar today = Calendar.getInstance();
        java.sql.Timestamp tempbanTimestamp = rs.getTimestamp("tempban");
        if (tempbanTimestamp == null) {
            lTempban.setTimeInMillis(0);
            return lTempban;
        }
        lTempban.setTimeInMillis(tempbanTimestamp.getTime());
        if (today.getTimeInMillis() < lTempban.getTimeInMillis()) {
            return lTempban;
        }

        lTempban.setTimeInMillis(0);
        return lTempban;
    }

    public Calendar getTempBanCalendar() {
        return tempban;
    }

    public byte getBanReason() {
        return greason;
    }

    public String showBanReason(/* byte a, */String AccountID, boolean permban) {
        // switch (a) {
        // case 1:
        // return "Your account " + AccountID + " has been blocked for hacking or
        // illegal use of third-party programs." + (permban ? "\r\n\r\nThis ban will
        // never be lifted." : "");
        // case 2:
        // return "Your account " + AccountID + " has been blocked for using macro /
        // auto-keyboard." + (permban ? "\r\n\r\nThis ban will never be lifted." : "");
        // case 3:
        // return "Your account " + AccountID + " has been blocked for illicit promotion
        // and advertising." + (permban ? "\r\n\r\nThis ban will never be lifted." :
        // "");
        // case 4:
        // return "Your account " + AccountID + " has been blocked for harassment.";
        // case 5:
        // return "Your account " + AccountID + " has been blocked for using profane
        // language." + (permban ? "\r\n\r\nThis ban will never be lifted." : "");
        // case 6:
        // return "Your account " + AccountID + " has been blocked for scamming." +
        // (permban ? "\r\n\r\nThis ban will never be lifted." : "");
        // case 7:
        // return "Your account " + AccountID + " has been blocked for misconduct." +
        // (permban ? "\r\n\r\nThis ban will never be lifted." : "");
        // case 8:
        // return "Your account " + AccountID + " has been blocked for illegal cash
        // transaction." + (permban ? "\r\n\r\nThis ban will never be lifted." : "");
        // case 9:
        // return "Your account " + AccountID + " has been blocked for illegal
        // charging/funding. Please contact customer support for further details." +
        // (permban ? "\r\n\r\nThis ban will never be lifted." : "");
        // case 10:
        // return "Your account " + AccountID + " has been blocked for temporary
        // request. Please contact customer support for further details." + (permban ?
        // "\r\n\r\nThis ban will never be lifted." : "");
        // case 11:
        // return "Your account " + AccountID + " has been blocked for impersonating
        // GM." + (permban ? "\r\n\r\nThis ban will never be lifted." : "");
        // case 12:
        // return "Your account " + AccountID + " has been blocked for using illegal
        // programs or violating the game policy." + (permban ? "\r\n\r\nThis ban will
        // never be lifted." : "");
        // case 13:
        // return "Your account " + AccountID + " has been blocked for one of cursing,
        // scamming, or illegal trading via Megaphones." + (permban ? "\r\n\r\nThis ban
        // will never be lifted." : "");
        // case 16:
        // case 17:
        // case 18:
        // return "게임 내에서 사행성 행위를 진행, 조장, 홍보, 지원, 보조하는 등 사행성 관련 일체의 행위로 접속 중지된 아이디입니다.";
        // case 19:
        // case 20:
        // case 21:
        // return "게임 내 버그를 사용하거나 악용하는 등 운영원칙에 위배되는 행위로 접속 중지된 아이디입니다.";
        // }
        return "Zipangu has blocked your account " + AccountID + " for the following reason: "
                + getTrueBanReason(AccountID) + (permban ? "\r\n\r\nThis ban will never be lifted." : ""); // Default
                                                                                                           // reason
    }

    private boolean message;

    public boolean messageOn() {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT message FROM accounts WHERE id = ?")) {
            ps.setInt(1, this.getAccID());
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    message = rs.getInt("message") != 0;
                }
            }
        } catch (Exception e) {
            System.out.println("message error");
        }
        return message;
    }

    public void setMessageToggle(int x) {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("UPDATE accounts SET message = ? WHERE id = ?")) {
            ps.setInt(1, x);
            ps.setInt(2, getAccID());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public String getTrueBanReason(String name) {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT banreason FROM accounts WHERE name = ?")) {
            ps.setString(1, name);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getString(1);
                }
            }
        } catch (SQLException ex) {
            System.err.println("Error getting ban reason: " + ex);
        }
        return null;
    }

    public boolean hasBannedIP() {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con
                        .prepareStatement("SELECT COUNT(*) FROM ipbans WHERE ? LIKE CONCAT(ip, '%')")) {
            ps.setString(1, getSessionIPAddress());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) > 0;
                }
            }
        } catch (SQLException ex) {
            System.err.println("Error checking ip bans" + ex);
        }
        return false;
    }

    public boolean hasBannedMac() {
        if (macs.isEmpty()) {
            return false;
        }
        StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM macbans WHERE mac IN (");
        for (int i = 0; i < macs.size(); i++) {
            sql.append("?");
            if (i != macs.size() - 1) {
                sql.append(", ");
            }
        }
        sql.append(")");
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement(sql.toString())) {
            int i = 0;
            for (String mac : macs) {
                i++;
                ps.setString(i, mac);
            }
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) > 0;
                }
            }
        } catch (SQLException ex) {
            System.err.println("Error checking mac bans" + ex);
        }
        return false;
    }

    private void loadMacsIfNescessary() throws SQLException {
        if (macs.isEmpty()) {
            try (Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps = con.prepareStatement("SELECT macs FROM accounts WHERE id = ?")) {
                ps.setInt(1, accId);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        if (rs.getString("macs") != null) {
                            String[] macData = rs.getString("macs").split(", ");
                            for (String mac : macData) {
                                if (!mac.equals("")) {
                                    macs.add(mac);
                                }
                            }
                        }
                    } else {
                        throw new RuntimeException("No valid account associated with this client.");
                    }
                }
            }
        }
    }

    public void banMacs() {
        try {
            loadMacsIfNescessary();
            if (this.macs.size() > 0) {
                String[] macBans = new String[this.macs.size()];
                int z = 0;
                for (String mac : this.macs) {
                    macBans[z] = mac;
                    z++;
                }
                banMacs(macBans);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static final void banMacs(String[] macs) {
        try (Connection con = DatabaseConnection.getConnection()) {
            List<String> filtered = new LinkedList<>();
            try (PreparedStatement ps = con.prepareStatement("SELECT filter FROM macfilters");
                    ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    filtered.add(rs.getString("filter"));
                }
            }

            try (PreparedStatement ps = con.prepareStatement("INSERT INTO macbans (mac) VALUES (?)")) {
                for (String mac : macs) {
                    boolean matched = false;
                    for (String filter : filtered) {
                        if (mac.matches(filter)) {
                            matched = true;
                            break;
                        }
                    }
                    if (!matched) {
                        ps.setString(1, mac);
                        try {
                            ps.executeUpdate();
                        } catch (SQLException e) {
                            // Can fail because of UNIQUE key, we dont care
                        }
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Error banning MACs" + e);
        }
    }

    /**
     * Returns 0 on success, a state to be used for
     * {@link CField#getLoginFailed(int)} otherwise.
     *
     * @param success
     * @return The state of the login.
     */
    public int finishLogin() {
        if (getAccID() <= 0) {
            return 1;
        }
        final String ip = getSessionIPAddress();
        // Atomic SQL update: only set to loggedin if it's currently 0 or it's the same IP (re-login/ghost session)
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement(
                        "UPDATE accounts SET loggedin = ?, SessionIP = ?, lastlogin = CURRENT_TIMESTAMP() WHERE id = ? AND (loggedin <= 0 OR SessionIP = ?)")) {
            ps.setInt(1, LOGIN_LOGGEDIN);
            ps.setString(2, ip);
            ps.setInt(3, getAccID());
            ps.setString(4, ip);
            
            if (ps.executeUpdate() > 0) {
                loggedIn = true;
                return 0;
            }
        } catch (SQLException e) {
            System.err.println("SQL ERROR IN finishLogin: " + e.getMessage());
        }
        return 7; // Already logged in or database error
    }

    public void clearInformation() {
        accountName = null;
        accId = -1;
        secondPassword = null;
        salt2 = null;
        gm = false;
        loggedIn = false;
        greason = (byte) 1;
        tempban = null;
        gender = (byte) -1;
        charInfo.clear();
    }

    public int login(String login, String pwd, boolean ipMacBanned) {
        this.clearInformation();
        int loginok = 5;
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?")) {
            ps.setString(1, login);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    final int banned = rs.getInt("banned");
                    final String passhash = rs.getString("password");
                    final String salt = rs.getString("salt");
                    final String oldSession = rs.getString("SessionIP");

                    accountName = login;
                    accId = rs.getInt("id");
                    System.out.println("[DEBUG] Login successful for: " + login + " | Account ID: " + accId);
                    secondPassword = rs.getString("2ndpassword");
                    salt2 = rs.getString("salt2");
                    gm = rs.getInt("gm") > 0;
                    greason = rs.getByte("greason");
                    tempban = getTempBanCalendar(rs);
                    gender = rs.getByte("gender");

                    if (secondPassword != null && salt2 != null) {
                        secondPassword = LoginCrypto.rand_r(secondPassword);
                    }

                    if (banned > 0 && !gm) {
                        loginok = 3;
                    } else {
                        if (banned == -1) {
                            unban();
                        }
                        byte loginstate = getLoginState();
                        if (loginstate > MapleClient.LOGIN_NOTLOGGEDIN) { // already loggedin
                            if (getSessionIPAddress().equals(oldSession)) {
                                updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN, getSessionIPAddress());
                                System.out.println("[DEBUG] Ghost session detected for same IP. Force clearing state for account: " + accId);
                            } else {
                                loggedIn = false;
                                loginok = 7;
                            }
                        }
                        
                        if (loginok == 5) { // No error yet, proceed to password check
                            if (pwd.equalsIgnoreCase("fixme")) {
                                try (PreparedStatement ps2 = con
                                        .prepareStatement("UPDATE accounts SET loggedin = 0 WHERE name = ?")) {
                                    ps2.setString(1, login);
                                    ps2.executeUpdate();
                                } catch (SQLException se) {}
                            }
                            boolean updatePasswordHash = false;
                            // Check if the passwords are correct here. :B
                            if (passhash == null || passhash.isEmpty()) {
                                // Match by sessionIP
                                if (oldSession != null && !oldSession.isEmpty()) {
                                    loggedIn = getSessionIPAddress().equals(oldSession);
                                    loginok = loggedIn ? 0 : 4;
                                    updatePasswordHash = loggedIn;
                                } else {
                                    loginok = 4;
                                    loggedIn = false;
                                }
                            } else if (LoginCryptoLegacy.isLegacyPassword(passhash)
                                    && LoginCryptoLegacy.checkPassword(pwd, passhash)) {
                                // Check if a password upgrade is needed.
                                loginok = 0;
                                updatePasswordHash = true;
                            } else if (salt == null && LoginCrypto.checkSha1Hash(passhash, pwd)) {
                                loginok = 0;
                                updatePasswordHash = true;
                            } else if (LoginCrypto.checkSaltedSha512Hash(passhash, pwd, salt)) {
                                loginok = 0;
                            } else {
                                loggedIn = false;
                                loginok = 4;
                            }
                            if (updatePasswordHash) {
                                try (PreparedStatement pss = con.prepareStatement(
                                        "UPDATE `accounts` SET `password` = ?, `salt` = ? WHERE id = ?")) {
                                    final String newSalt = LoginCrypto.makeSalt();
                                    pss.setString(1, LoginCrypto.makeSaltedSha512Hash(pwd, newSalt));
                                    pss.setString(2, newSalt);
                                    pss.setInt(3, accId);
                                    pss.executeUpdate();
                                }
                            }
                        }
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("ERROR" + e);
        }
        return loginok;
    }

    public boolean CheckSecondPassword(String in) {
        boolean allow = false;
        boolean updatePasswordHash = false;

        // Check if the passwords are correct here. :B
        if (LoginCryptoLegacy.isLegacyPassword(secondPassword) && LoginCryptoLegacy.checkPassword(in, secondPassword)) {
            // Check if a password upgrade is needed.
            allow = true;
            updatePasswordHash = true;
        } else if (salt2 == null && LoginCrypto.checkSha1Hash(secondPassword, in)) {
            allow = true;
            updatePasswordHash = true;
        } else if (LoginCrypto.checkSaltedSha512Hash(secondPassword, in, salt2)) {
            allow = true;
        }
        if (updatePasswordHash) {
            try (Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps = con
                            .prepareStatement("UPDATE `accounts` SET `2ndpassword` = ?, `salt2` = ? WHERE id = ?")) {
                final String newSalt = LoginCrypto.makeSalt();
                ps.setString(1, LoginCrypto.rand_s(LoginCrypto.makeSaltedSha512Hash(in, newSalt)));
                ps.setString(2, newSalt);
                ps.setInt(3, accId);
                ps.executeUpdate();
            } catch (SQLException e) {
                System.err.println("SQL ERROR IN PIC/TRANSFER (CheckSecondPassword): " + e.getMessage());
                e.printStackTrace();
                return false;
            }
        }
        return allow;
    }

    private void unban() {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con
                        .prepareStatement("UPDATE accounts SET banned = 0, banreason = '' WHERE id = ?")) {
            ps.setInt(1, accId);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error while unbanning" + e);
        }
    }

    public static final byte unban(String charname) {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT accountid from characters where name = ?")) {
            ps.setString(1, charname);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    return -1;
                }
                final int accid = rs.getInt(1);
                try (PreparedStatement ps2 = con
                        .prepareStatement("UPDATE accounts SET banned = 0, banreason = '' WHERE id = ?")) {
                    ps2.setInt(1, accid);
                    ps2.executeUpdate();
                }
            }
        } catch (SQLException e) {
            System.err.println("Error while unbanning" + e);
            return -2;
        }
        return 0;
    }

    public void updateMacs(String macData) {
        for (String mac : macData.split(", ")) {
            macs.add(mac);
        }
        StringBuilder newMacData = new StringBuilder();
        Iterator<String> iter = macs.iterator();
        while (iter.hasNext()) {
            newMacData.append(iter.next());
            if (iter.hasNext()) {
                newMacData.append(", ");
            }
        }
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("UPDATE accounts SET macs = ? WHERE id = ?")) {
            ps.setString(1, newMacData.toString());
            ps.setInt(2, accId);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error saving MACs" + e);
        }
    }

    public void setAccID(int id) {
        this.accId = id;
    }

    public int getAccID() {
        return this.accId;
    }

    public final void updateLoginState(final int newstate, final String SessionID) {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement(
                        "UPDATE accounts SET loggedin = ?, SessionIP = ?, lastlogin = CURRENT_TIMESTAMP() WHERE id = ?")) {
            ps.setInt(1, newstate);
            ps.setString(2, SessionID);
            ps.setInt(3, getAccID());
            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("SQL ERROR IN updateLoginState: " + e.getMessage());
        }
        if (newstate == MapleClient.LOGIN_NOTLOGGEDIN) {
            loggedIn = false;
            serverTransition = false;
        } else {
            serverTransition = (newstate == MapleClient.LOGIN_SERVER_TRANSITION
                    || newstate == MapleClient.CHANGE_CHANNEL);
            loggedIn = !serverTransition;
        }
    }

    public final void updateSecondPassword() {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con
                        .prepareStatement("UPDATE `accounts` SET `2ndpassword` = ?, `salt2` = ? WHERE id = ?")) {
            final String newSalt = LoginCrypto.makeSalt();
            ps.setString(1, LoginCrypto.rand_s(LoginCrypto.makeSaltedSha512Hash(secondPassword, newSalt)));
            ps.setString(2, newSalt);
            ps.setInt(3, accId);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("SQL ERROR IN PIC/TRANSFER (updateSecondPassword): " + e.getMessage());
            e.printStackTrace();
        }
    }

    public final byte getLoginState() { // TODO: Hide?
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement(
                        "SELECT loggedin, lastlogin, banned, `birthday` + 0 AS `bday` FROM accounts WHERE id = ?")) {
            ps.setInt(1, getAccID());
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next() || rs.getInt("banned") > 0) {
                    disconnect();
                    throw new DatabaseException("Account doesn't exist or is banned");
                }
                birthday = rs.getInt("bday");
                byte state = rs.getByte("loggedin");

                if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL) {
                    if (rs.getTimestamp("lastlogin").getTime() + 5000 < System.currentTimeMillis()) { // Connecting to
                                                                                                       // chanserver
                                                                                                       // timeout
                        state = MapleClient.LOGIN_NOTLOGGEDIN;
                        updateLoginState(state, getSessionIPAddress());
                    }
                }
                if (state == MapleClient.LOGIN_LOGGEDIN) {
                    loggedIn = true;
                } else {
                    loggedIn = false;
                }
                return state;
            }
        } catch (SQLException e) {
            loggedIn = false;
            throw new DatabaseException("Error getting login state", e);
        }
    }

    public final boolean checkBirthDate(final int date) {
        return birthday == date;
    }

    public final void removalTask(boolean shutdown) {
        try {
            player.cancelAllBuffs_();
            player.cancelAllDebuffs();
            if (player.getMarriageId() > 0) {
                final MapleQuestStatus stat1 = player.getQuestNoAdd(MapleQuest.getInstance(160001));
                final MapleQuestStatus stat2 = player.getQuestNoAdd(MapleQuest.getInstance(160002));
                if (stat1 != null && stat1.getCustomData() != null
                        && (stat1.getCustomData().equals("2_") || stat1.getCustomData().equals("2"))) {
                    // dc in process of marriage
                    if (stat2 != null && stat2.getCustomData() != null) {
                        stat2.setCustomData("0");
                    }
                    stat1.setCustomData("3");
                }
            }
            if (player.getMapId() == GameConstants.JAIL) {
                final MapleQuestStatus stat1 = player.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_TIME));
                final MapleQuestStatus stat2 = player.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_QUEST));
                if (stat1.getCustomData() == null) {
                    stat1.setCustomData(String.valueOf(System.currentTimeMillis()));
                } else if (stat2.getCustomData() == null) {
                    stat2.setCustomData("0"); // Seconds of jail
                } else { // Previous seconds - elapsed seconds
                    int seconds = Integer.parseInt(stat2.getCustomData())
                            - (int) ((System.currentTimeMillis() - Long.parseLong(stat1.getCustomData())) / 1000);
                    if (seconds < 0) {
                        seconds = 0;
                    }
                    stat2.setCustomData(String.valueOf(seconds));
                }
            }
            player.changeRemoval(true);
            if (player.getEventInstance() != null) {
                player.getEventInstance().playerDisconnected(player, player.getId());
            }
            final IMaplePlayerShop shop = player.getPlayerShop();
            if (shop != null) {
                shop.removeVisitor(player);
                if (shop.isOwner(player)) {
                    if (shop.getShopType() == 1 && shop.isAvailable() && !shutdown) {
                        shop.setOpen(true);
                    } else {
                        shop.closeShop(true, !shutdown);
                    }
                }
            }
            player.setMessenger(null);
            if (player.getMap() != null) {
                if (shutdown || (getChannelServer() != null && getChannelServer().isShutdown())) {
                    int questID = -1;
                    switch (player.getMapId()) {
                        case 240060200: // HT
                            questID = 160100;
                            break;
                        case 240060201: // ChaosHT
                            questID = 160103;
                            break;
                        case 280030000: // Zakum
                            questID = 160101;
                            break;
                        case 280030001: // ChaosZakum
                            questID = 160102;
                            break;
                        case 270050100: // PB
                            questID = 160101;
                            break;
                        case 105100300: // Balrog
                        case 105100400: // Balrog
                            questID = 160106;
                            break;
                        case 211070000: // Von Leon
                        case 211070100: // Von Leon
                        case 211070101: // Von Leon
                        case 211070110: // Von Leon
                            questID = 160107;
                            break;
                        case 551030200: // Scartar
                            questID = 160108;
                            break;
                        case 271040100: // Cygnus
                            questID = 160109;
                            break;
                        case 262030000:
                        case 262031300: // Hilla
                            questID = 160110;
                            break;
                        case 272030400:
                            questID = 160111;
                            break;
                    }
                    if (questID > 0) {
                        player.getQuestNAdd(MapleQuest.getInstance(questID)).setCustomData("0"); // Reset the time.
                    }
                } else if (player.isAlive()) {
                    switch (player.getMapId()) {
                        case 541010100: // Latanica
                        case 541020800: // Krexel
                        case 220080001: // Pap
                            player.getMap().addDisconnected(player.getId());
                            break;
                    }
                }
                player.getMap().removePlayer(player);
            }
        } catch (final Throwable e) {
            FileoutputUtil.outputFileError(FileoutputUtil.Acc_Stuck, e);
        }
    }

    public final void disconnect(final boolean RemoveInChannelServer, final boolean fromCS) {
        disconnect(RemoveInChannelServer, fromCS, false);
    }

    public final void disconnect(final boolean RemoveInChannelServer, final boolean fromCS, final boolean shutdown) {
        if (player != null) {
            MapleMap map = player.getMap();
            final MapleParty party = player.getParty();
            final boolean clone = player.isClone();
            final String namez = player.getName();
            final int idz = player.getId(),
                    messengerid = player.getMessenger() == null ? 0 : player.getMessenger().getId(),
                    gid = player.getGuildId(), fid = player.getFamilyId();
            final BuddyList bl = player.getBuddylist();
            final MaplePartyCharacter chrp = new MaplePartyCharacter(player);
            final MapleMessengerCharacter chrm = new MapleMessengerCharacter(player);
            final MapleGuildCharacter chrg = player.getMGC();
            final MapleFamilyCharacter chrf = player.getMFC();
            charLoginState(0); // set column 'loginState' as 0 which is offline.
            removalTask(shutdown);
            LoginServer.getLoginAuth(player.getId());
            player.saveToDB(true, fromCS);
            if (shutdown) {
                player = null;
                receiving = false;
                return;
            }

            if (!fromCS) {
                final ChannelServer ch = ChannelServer.getInstance(map == null ? channel : map.getChannel());
                final int chz = World.Find.findChannel(idz);
                if (chz < -1) {
                    disconnect(RemoveInChannelServer, true);// U lie
                    return;
                }
                try {
                    if (chz == -1 || ch == null || clone || ch.isShutdown()) {
                        player = null;
                        return;// No idea
                    }
                    if (messengerid > 0) {
                        World.Messenger.leaveMessenger(messengerid, chrm);
                    }
                    if (party != null) {
                        chrp.setOnline(false);
                        World.Party.updateParty(party.getId(), PartyOperation.LOG_ONOFF, chrp);
                        if (map != null && party.getLeader().getId() == idz) {
                            MaplePartyCharacter lchr = null;
                            for (MaplePartyCharacter pchr : party.getMembers()) {
                                if (pchr != null && map.getCharacterById(pchr.getId()) != null
                                        && (lchr == null || lchr.getLevel() < pchr.getLevel())) {
                                    lchr = pchr;
                                }
                            }
                            if (lchr != null) {
                                World.Party.updateParty(party.getId(), PartyOperation.CHANGE_LEADER_DC, lchr);
                            }
                        }
                    }
                    if (bl != null) {
                        if (!serverTransition) {
                            World.Buddy.loggedOff(namez, idz, channel, bl.getBuddyIds());
                        } else { // Change channel
                            World.Buddy.loggedOn(namez, idz, channel, bl.getBuddyIds());
                        }
                    }
                    if (gid > 0 && chrg != null) {
                        World.Guild.setGuildMemberOnline(chrg, false, -1);
                    }
                    if (fid > 0 && chrf != null) {
                        World.Family.setFamilyMemberOnline(chrf, false, -1);
                    }
                } catch (final Exception e) {
                    e.printStackTrace();
                    FileoutputUtil.outputFileError(FileoutputUtil.Acc_Stuck, e);
                    System.err.println(getLogMessage(this, "ERROR") + e);
                } finally {
                    if (RemoveInChannelServer && ch != null) {
                        ch.removePlayer(idz, namez);
                    }
                    player = null;
                }
            } else {
                final int ch = World.Find.findChannel(idz);
                if (ch > 0) {
                    disconnect(RemoveInChannelServer, false);// U lie
                    return;
                }
                try {
                    if (party != null) {
                        chrp.setOnline(false);
                        World.Party.updateParty(party.getId(), PartyOperation.LOG_ONOFF, chrp);
                    }
                    if (!serverTransition) {
                        World.Buddy.loggedOff(namez, idz, channel, bl.getBuddyIds());
                    } else { // Change channel
                        World.Buddy.loggedOn(namez, idz, channel, bl.getBuddyIds());
                    }
                    if (gid > 0 && chrg != null) {
                        World.Guild.setGuildMemberOnline(chrg, false, -1);
                    }
                    if (fid > 0 && chrf != null) {
                        World.Family.setFamilyMemberOnline(chrf, false, -1);
                    }
                    if (player != null) {
                        player.setMessenger(null);
                    }
                } catch (final Exception e) {
                    e.printStackTrace();
                    FileoutputUtil.outputFileError(FileoutputUtil.Acc_Stuck, e);
                    System.err.println(getLogMessage(this, "ERROR") + e);
                } finally {
                    if (RemoveInChannelServer && ch > 0) {
                        CashShopServer.getPlayerStorage().deregisterPlayer(idz, namez);
                    }
                    player = null;
                }
            }
        }
        if (!serverTransition && isLoggedIn()) {
            updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN, getSessionIPAddress());
        }
        System.out.println("DEBUG: Connection closed for AccountID: " + accId);
        engines.clear();
        clearInformation();
    }


    public final boolean CheckIPAddress() {
        if (this.accId < 0) {
            return false;
        }
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT SessionIP, banned FROM accounts WHERE id = ?")) {
            ps.setInt(1, this.accId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    final String sessionIP = rs.getString("SessionIP");
                    if (sessionIP != null) {
                        if (!getSessionIPAddress().equals(sessionIP.split(":")[0])) {
                            return false;
                        }
                    }
                    if (rs.getInt("banned") > 0) {
                        return false;
                    }
                }
            }
            return true;
        } catch (final SQLException e) {
            System.out.println("Failed in checking IP address for client.");
        }
        return true;
    }

    public final void DebugMessage(final StringBuilder sb) {
        // sb.append(getSession().getRemoteAddress());
        sb.append(" Connected: ");
        sb.append(getSession().isConnected());
        sb.append(" Closing: ");
        sb.append(getSession().isClosing());
        sb.append(" ClientKeySet: ");
        sb.append(getSession().getAttribute("CLIENT") != null);
        sb.append(" loggedin: ");
        sb.append(isLoggedIn());
        sb.append(" has char: ");
        sb.append(getPlayer() != null);
    }

    public final int getChannel() {
        return channel;
    }

    public final ChannelServer getChannelServer() {
        return ChannelServer.getInstance(channel);
    }

    public final int deleteCharacter(final int cid) {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement(
                        "SELECT guildid, guildrank, familyid, name FROM characters WHERE id = ? AND accountid = ?")) {
            ps.setInt(1, cid);
            ps.setInt(2, accId);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    return 9;
                }
                if (rs.getInt("guildid") > 0) { // Is in a guild when deleted
                    if (rs.getInt("guildrank") == 1) { // Can't delete when leader
                        return 22;
                    }
                    World.Guild.deleteGuildCharacter(rs.getInt("guildid"), cid);
                }
                if (rs.getInt("familyid") > 0 && World.Family.getFamily(rs.getInt("familyid")) != null) {
                    World.Family.getFamily(rs.getInt("familyid")).leaveFamily(cid);
                }
            }

            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM characters WHERE id = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM hiredmerch WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM mts_cart WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM mts_items WHERE characterid = ?", cid);
            // MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM cheatlog WHERE
            // characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM mountdata WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM inventoryitems WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM famelog WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM famelog WHERE characterid_to = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM dueypackages WHERE RecieverId = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM wishlist WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM buddies WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM buddies WHERE buddyid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM keymap WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM trocklocations WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM regrocklocations WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM hyperrocklocations WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM savedlocations WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM skills WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM familiars WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM mountdata WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM skillmacros WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM trocklocations WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM queststatus WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM inventoryslot WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM extendedSlots WHERE characterid = ?", cid);
            return 0;
        } catch (Exception e) {
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
            e.printStackTrace();
        }
        return 10;
    }

    public final byte getGender() {
        return gender;
    }

    public final void setGender(final byte gender) {
        this.gender = gender;
    }

    public final String getSecondPassword() {
        return secondPassword;
    }

    public final void setSecondPassword(final String secondPassword) {
        this.secondPassword = secondPassword;
    }

    public final String getAccountName() {
        return accountName;
    }

    public final void setAccountName(final String accountName) {
        this.accountName = accountName;
    }

    public final void setChannel(final int channel) {
        this.channel = channel;
    }

    public final int getWorld() {
        return world;
    }

    public final void setWorld(final int world) {
        this.world = world;
    }

    public final int getLatency() {
        return (int) (lastPong - lastPing);
    }

    public final long getLastPong() {
        return lastPong;
    }

    public final long getLastPing() {
        return lastPing;
    }

    public final void pongReceived() {
        lastPong = System.currentTimeMillis();
    }

    public final void sendPing() {
        lastPing = System.currentTimeMillis();
        write(LoginPacket.getPing());

        PingTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                try {
                    if (getLatency() < 0) {
                        disconnect(true, false);
                        if (isConnected()) {
                            close();
                        }
                    }
                } catch (final NullPointerException e) {
                    // Client already gone
                }
            }
        }, 60000); // Note: Idletime gets added to this too
    }

    public static final String getLogMessage(final MapleClient cfor, final String message) {
        return getLogMessage(cfor, message, new Object[0]);
    }

    public static final String getLogMessage(final MapleCharacter cfor, final String message) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message);
    }

    public static final String getLogMessage(final MapleCharacter cfor, final String message, final Object... parms) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message, parms);
    }

    public static final String getLogMessage(final MapleClient cfor, final String message, final Object... parms) {
        final StringBuilder builder = new StringBuilder();
        if (cfor != null) {
            if (cfor.getPlayer() != null) {
                builder.append("<");
                builder.append(MapleCharacterUtil.makeMapleReadable(cfor.getPlayer().getName()));
                builder.append(" (CID: ");
                builder.append(cfor.getPlayer().getId());
                builder.append(")> ");
            }
            if (cfor.getAccountName() != null) {
                builder.append("(Account: ");
                builder.append(cfor.getAccountName());
                builder.append(") ");
            }
        }
        builder.append(message);
        int start;
        for (final Object parm : parms) {
            start = builder.indexOf("{}");
            builder.replace(start, start + 2, parm.toString());
        }
        return builder.toString();
    }

    public static final int findAccIdForCharacterName(String charName) {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?")) {
            ps.setString(1, charName);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt("accountid");
                }
            }
        } catch (final SQLException e) {
            System.err.println("findAccIdForCharacterName SQL error");
        }
        return -1;
    }

    public final Set<String> getMacs() {
        return Collections.unmodifiableSet(macs);
    }

    public final boolean isGm() {
        return gm;
    }

    public final void setScriptEngine(final String name, final ScriptEngine e) {
        engines.put(name, e);
    }

    public final ScriptEngine getScriptEngine(final String name) {
        return engines.get(name);
    }

    public final void removeScriptEngine(final String name) {
        engines.remove(name);
    }

    public final ScheduledFuture<?> getIdleTask() {
        return idleTask;
    }

    public final void setIdleTask(final ScheduledFuture<?> idleTask) {
        this.idleTask = idleTask;
    }

    protected static final class CharNameAndId {

        public final String name;
        public final int id;

        public CharNameAndId(final String name, final int id) {
            super();
            this.name = name;
            this.id = id;
        }
    }

    public int getCharacterSlots() {
        if (isGm()) {
            return 15;
        }
        if (charslots != DEFAULT_CHARSLOT) {
            return charslots; // Save a sql
        }
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con
                        .prepareStatement("SELECT charslots FROM character_slots WHERE accid = ? AND worldid = ?")) {
            ps.setInt(1, accId);
            ps.setInt(2, world);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    charslots = rs.getInt("charslots");
                } else {
                    try (PreparedStatement psu = con.prepareStatement(
                            "INSERT INTO character_slots (accid, worldid, charslots) VALUES (?, ?, ?)")) {
                        psu.setInt(1, accId);
                        psu.setInt(2, world);
                        psu.setInt(3, charslots);
                        psu.executeUpdate();
                    }
                }
            }
        } catch (SQLException sqlE) {
            sqlE.printStackTrace();
        }

        return charslots;
    }

    public boolean gainCharacterSlot() {
        if (getCharacterSlots() >= 15) {
            return false;
        }
        charslots++;

        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con
                        .prepareStatement("UPDATE character_slots SET charslots = ? WHERE worldid = ? AND accid = ?")) {
            ps.setInt(1, charslots);
            ps.setInt(2, world);
            ps.setInt(3, accId);
            ps.executeUpdate();
        } catch (SQLException sqlE) {
            sqlE.printStackTrace();
            return false;
        }
        return true;
    }

    public static final byte unbanIPMacs(String charname) {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT accountid from characters where name = ?")) {
            ps.setString(1, charname);

            int accid = -1;
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    accid = rs.getInt(1);
                }
            }
            if (accid == -1) {
                return -1;
            }

            String sessionIP = null;
            String macs = null;
            try (PreparedStatement ps2 = con.prepareStatement("SELECT SessionIP, macs FROM accounts WHERE id = ?")) {
                ps2.setInt(1, accid);
                try (ResultSet rs = ps2.executeQuery()) {
                    if (rs.next()) {
                        sessionIP = rs.getString("SessionIP");
                        macs = rs.getString("macs");
                    }
                }
            }

            if (sessionIP == null && macs == null) {
                return -1;
            }

            byte ret = 0;
            if (sessionIP != null) {
                try (PreparedStatement psa = con.prepareStatement("DELETE FROM ipbans WHERE ip like ?")) {
                    psa.setString(1, sessionIP);
                    psa.execute();
                    ret++;
                }
            }
            if (macs != null) {
                String[] macz = macs.split(", ");
                for (String mac : macz) {
                    if (!mac.equals("")) {
                        try (PreparedStatement psa = con.prepareStatement("DELETE FROM macbans WHERE mac = ?")) {
                            psa.setString(1, mac);
                            psa.execute();
                        }
                    }
                }
                ret++;
            }
            return ret;
        } catch (SQLException e) {
            System.err.println("Error while unbanning" + e);
            return -2;
        }
    }

    public static final byte unHellban(String charname) {
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT accountid from characters where name = ?")) {
            ps.setString(1, charname);

            int accid = -1;
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    accid = rs.getInt(1);
                }
            }
            if (accid == -1) {
                return -1;
            }

            String sessionIP = null;
            String email = null;
            try (PreparedStatement ps2 = con.prepareStatement("SELECT SessionIP, email FROM accounts WHERE id = ?")) {
                ps2.setInt(1, accid);
                try (ResultSet rs = ps2.executeQuery()) {
                    if (rs.next()) {
                        sessionIP = rs.getString("SessionIP");
                        email = rs.getString("email");
                    }
                }
            }

            if (email == null) {
                return -1;
            }

            try (PreparedStatement ps3 = con
                    .prepareStatement("UPDATE accounts SET banned = 0, banreason = '' WHERE email = ?"
                            + (sessionIP == null ? "" : " OR SessionIP = ?"))) {
                ps3.setString(1, email);
                if (sessionIP != null) {
                    ps3.setString(2, sessionIP);
                }
                ps3.executeUpdate();
            }
            return 0;
        } catch (SQLException e) {
            System.err.println("Error while unbanning" + e);
            return -2;
        }
    }

    public boolean isMonitored() {
        return monitored;
    }

    public void setMonitored(boolean m) {
        this.monitored = m;
    }

    public boolean isReceiving() {
        return receiving;
    }

    public void setReceiving(boolean m) {
        this.receiving = m;
    }

    public boolean canClickNPC() {
        return lastNpcClick + 500 < System.currentTimeMillis();
    }

    public void setClickedNPC() {
        lastNpcClick = System.currentTimeMillis();
    }

    public void removeClickedNPC() {
        lastNpcClick = 0;
    }

    public final Timestamp getCreated() { // TODO: Hide?
        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT createdat FROM accounts WHERE id = ?")) {
            ps.setInt(1, getAccID());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getTimestamp("createdat");
                }
            }
        } catch (SQLException e) {
            throw new DatabaseException("error getting create", e);
        }
        return null;
    }

    public String getTempIP() {
        return tempIP;
    }

    public void setTempIP(String s) {
        this.tempIP = s;
    }

    public int getReceivedPackets() {
        return receivedPackets;
    }

    public void incrementReceivedPackets() {
        this.receivedPackets++;
    }


    public static int getPacketLength(int packetHeader) {
        int packetLength = ((packetHeader >>> 16) ^ (packetHeader & 0xFFFF));
        packetLength = ((packetLength << 8) & 0xFF00) | ((packetLength >>> 8) & 0xFF);
        return packetLength;
    }
}
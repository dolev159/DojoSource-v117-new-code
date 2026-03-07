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
package handling.login;

import constants.GameConstants;
import constants.WorldConstants.Servers;
import constants.WorldConstants.TespiaServers;
import handling.MapleServerHandler;
import handling.netty.NettyServerAcceptor;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;
import server.ServerProperties;
import tools.Triple;

public class LoginServer {

    public static final int PORT = 8484;
    private static InetSocketAddress InetSocketadd;
    private static NettyServerAcceptor acceptor;
    // Thread-safe: multiple channels write/read concurrently
    private static final Map<Integer, Integer> load = new ConcurrentHashMap<>();
    private static volatile String serverName, eventMessage;
    private static volatile byte flag;
    private static volatile int maxCharacters, userLimit;
    private static volatile boolean finishedShutdown = true, adminOnly = false;

    // AtomicInteger: usersOn is incremented/decremented from multiple threads
    private static final AtomicInteger usersOn = new AtomicInteger(0);

    // ConcurrentHashMap: loginAuth and loginIPAuth are accessed from multiple login threads
    private static final Map<Integer, Triple<String, String, Integer>> loginAuth = new ConcurrentHashMap<>();
    private static final Map<String, Boolean> loginIPAuth = new ConcurrentHashMap<>();

    public static void putLoginAuth(int chrid, String ip, String tempIP, int channel) {
        loginAuth.put(chrid, new Triple<>(ip, tempIP, channel));
        loginIPAuth.put(ip, Boolean.TRUE);
    }

    public static Triple<String, String, Integer> getLoginAuth(int chrid) {
        return loginAuth.remove(chrid);
    }

    public static boolean containsIPAuth(String ip) {
        return loginIPAuth.containsKey(ip);
    }

    public static void removeIPAuth(String ip) {
        loginIPAuth.remove(ip);
    }

    public static void addIPAuth(String ip) {
        loginIPAuth.put(ip, Boolean.TRUE);
    }

    public static final void addChannel(final int channel) {
        load.put(channel, 0);
    }

    public static final void removeChannel(final int channel) {
        load.remove(channel);
    }

    public static final void run_startup_configurations() {
        userLimit = Integer.parseInt(ServerProperties.getProperty("userlimit"));
        serverName = ServerProperties.getProperty("serverName");
        eventMessage = ServerProperties.getProperty("eventMessage");
        flag = Byte.parseByte(ServerProperties.getProperty("flag"));
        adminOnly = Boolean.parseBoolean(ServerProperties.getProperty("admin", "false"));
        maxCharacters = Integer.parseInt(ServerProperties.getProperty("maxCharacters"));

        acceptor = new NettyServerAcceptor(PORT);
        acceptor.run();
    }

    public static final void shutdown() {
        if (finishedShutdown) {
            return;
        }
        System.out.println("Shutting down login...");
        if (acceptor != null) {
            acceptor.close();
        }
        finishedShutdown = true;
    }

    public static final String getServerName() {
        return serverName;
    }

    public static final String getTrueServerName() {
        return serverName.substring(0, serverName.length() - (GameConstants.GMS ? 2 : 3));
    }

    public static final String getEventMessage() {
        return eventMessage;
    }

    public static final byte getFlag(int world) {
        return Servers.getById(world).getFlag();
    }

    public static final byte getTespiaFlag(String world) {
        return TespiaServers.getById(world).getFlag();
    }

    public static final int getMaxCharacters() {
        return maxCharacters;
    }

    public static final Map<Integer, Integer> getLoad() {
        return load;
    }

    public static void setLoad(final Map<Integer, Integer> load_, final int usersOn_) {
        // Update load atomically: copy new values into the concurrent map
        load.clear();
        load.putAll(load_);
        usersOn.set(usersOn_);
    }

    public static final String getEventMessage(int world) { // TODO: Finish this
        switch (world) {
            case 0:
                return null;
        }
        return null;
    }

    public static final void setFlag(final byte newflag) {
        flag = newflag;
    }

    public static final int getUserLimit() {
        return userLimit;
    }

    public static final int getUsersOn() {
        return usersOn.get();
    }

    public static final void setUserLimit(final int newLimit) {
        userLimit = newLimit;
    }

    public static final int getNumberOfSessions() {
        return 0; // Netty session count not implemented here yet
    }

    public static final boolean isAdminOnly() {
        return adminOnly;
    }

    public static final boolean isShutdown() {
        return finishedShutdown;
    }

    public static final void setOn() {
        finishedShutdown = false;
    }
    
}
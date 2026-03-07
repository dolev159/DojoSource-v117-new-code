package tools;

import java.net.SocketAddress;

/**
 * Represents a mock version of a networking session to use a MapleClient instance
 * without an active connection (fakechar, etc).
 */
public class MockIOSession {

    public void updateTrafficMask() {
    }

    public Object getConfig() {
        return null;
    }

    public Object getFilterChain() {
        return null;
    }

    public Object getHandler() {
        return null;
    }

    public SocketAddress getLocalAddress() {
        return null;
    }

    public SocketAddress getRemoteAddress() {
        return null;
    }

    public Object getService() {
        return null;
    }

    public SocketAddress getServiceAddress() {
        return null;
    }

    public Object getServiceConfig() {
        return null;
    }

    public Object getTransportType() {
        return null;
    }

    public Object close() {
        return null;
    }

    protected void close0() {
    }

    public Object write(Object message, SocketAddress remoteAddress) {
        return null;
    }

    public Object write(Object message) {
        return null;
    }

    protected void write0(Object writeRequest) {
    }
}
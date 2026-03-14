package provider.wz;

import java.util.concurrent.atomic.AtomicInteger;

public abstract class WzInputStream {
    protected int hash;
    protected byte[] key; // If null, no XOR is applied
    protected WzHeader header;
    protected ThreadLocal<AtomicInteger> position = ThreadLocal.withInitial(() -> new AtomicInteger(0));

    public void setHash(int h) { this.hash = h; }
    public void setHeader(WzHeader h) { this.header = h; }
    public WzHeader getHeader() { return header; }
    public void setKey(byte[] k) { this.key = k; }
    public int getPosition() { return position.get().get(); }
    public void seek(int pos) { position.get().set(pos); }
    public void skip(int inc) { position.get().addAndGet(inc); }
    public byte[] getKey() { return key; }

    public abstract int read();
    public abstract byte readByte();
    public abstract byte[] read(int length);

    public short readShort() { return (short) (read() | (read() << 8)); }
    public int readInteger() { return read() | (read() << 8) | (read() << 16) | (read() << 24); }
    public long readLong() {
        return (long) read() | ((long) read() << 8) | ((long) read() << 16) | ((long) read() << 24) |
               ((long) read() << 32) | ((long) read() << 40) | ((long) read() << 48) | ((long) read() << 56);
    }
    public float readFloat() { return Float.intBitsToFloat(readInteger()); }
    public double readDouble() { return Double.longBitsToDouble(readLong()); }

    public int readCompressedInteger() {
        byte b = readByte();
        if (b == -128) return readInteger();
        return b;
    }

    public long readCompressedLong() {
        byte b = readByte();
        if (b == -128) return readLong();
        return b;
    }

    public String readString() {
        byte b = readByte();
        if (b == 0x00) return "";
        int len;
        if (b > 0) {
            len = (b == 0x7F) ? readInteger() : b;
            return decryptUnicode(read(len * 2));
        } else {
            len = (b == -128) ? readInteger() : -b;
            return decryptAscii(read(len));
        }
    }

    private String decryptAscii(byte[] data) {
        if (key == null) return new String(data);
        byte a = (byte) 0xAA;
        for (int i = 0; i < data.length; i++) {
            data[i] = (byte) (data[i] ^ a ^ key[i]);
            a++;
        }
        return new String(data);
    }

    private String decryptUnicode(byte[] data) {
        if (key == null) return new String(data);
        char[] ret = new char[data.length / 2];
        int xor = 0xAAAA;
        for (int i = 0; i < data.length; i++) {
            data[i] ^= key[i];
        }
        for (int i = 0; i < ret.length; i++) {
            int val = (data[i * 2] & 0xFF) | ((data[i * 2 + 1] & 0xFF) << 8);
            ret[i] = (char) (val ^ xor);
            xor++;
        }
        return new String(ret);
    }

    public int readOffset() {
        int pos = getPosition();
        int off = pos - header.FILE_START;
        off = ~off;
        off *= hash;
        off -= 0x2AA;
        off = WzTool.rotateLeft(off, (byte) (off & 0x1F));
        off ^= readInteger();
        off += header.FILE_START * 2;
        return off & 0xFFFFFFFF;
    }

    public String readStringBlock(int offset) {
        int t = read();
        switch (t) {
            case 0x00:
            case 0x73: return readString();
            case 0x01:
            case 0x1B: return readString(offset + readInteger());
            default: return "";
        }
    }

    public String readString(int pos) {
        int cur = getPosition();
        seek(pos);
        String s = readString();
        seek(cur);
        return s;
    }

    public String readNullTerminatedString() {
        StringBuilder sb = new StringBuilder();
        byte b;
        while ((b = (byte) read()) != 0) {
            sb.append((char) b);
        }
        return sb.toString();
    }
}

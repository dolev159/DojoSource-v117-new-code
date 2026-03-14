package provider.wz;

public final class BitTool {
    private BitTool() {}

    public static int rotateLeft(int x, byte n) {
        return (x << n) | (x >>> (32 - n));
    }

    public static short toInt16(byte[] in) {
        return (short) ((in[1] << 8) | (in[0] & 0xFF));
    }

    public static int toInt32(byte[] in) {
        return ((in[3] & 0xFF) << 24) | ((in[2] & 0xFF) << 16) | ((in[1] & 0xFF) << 8) | (in[0] & 0xFF);
    }
}

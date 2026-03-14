package provider.wz;

public final class WzTool {

    private static final AES aes = new AES();
    private static final byte[] AES_KEY = new byte[]{
        (byte) 0x13, 0x00, 0x00, 0x00,
        (byte) 0x08, 0x00, 0x00, 0x00,
        (byte) 0x06, 0x00, 0x00, 0x00,
        (byte) 0xB4, 0x00, 0x00, 0x00,
        (byte) 0x1B, 0x00, 0x00, 0x00,
        (byte) 0x0F, 0x00, 0x00, 0x00,
        (byte) 0x33, 0x00, 0x00, 0x00,
        (byte) 0x52, 0x00, 0x00, 0x00
    };

    private WzTool() {
    }

    public static byte[] getIvByVersion(WzVersion v) {
        switch (v) {
            case GMS:
                return new byte[]{
                    0x4D, 0x23, (byte) 0xC7, 0x2B,
                    0x4D, 0x23, (byte) 0xC7, 0x2B,
                    0x4D, 0x23, (byte) 0xC7, 0x2B,
                    0x4D, 0x23, (byte) 0xC7, 0x2B
                };
            default:
                return new byte[16];
        }
    }

    public static int rotateLeft(int x, byte n) {
        return (x << n) | (x >>> (32 - n));
    }

    public static byte[] generateKey(WzVersion v) {
        byte[] iv = getIvByVersion(v);
        byte[] ret = new byte[0xFFFF];
        aes.setKey(AES_KEY);
        for (int i = 0; i < (0xFFFF / 16); i++) {
            iv = aes.encrypt(iv);
            System.arraycopy(iv, 0, ret, (i * 16), 16);
        }
        iv = aes.encrypt(iv);
        System.arraycopy(iv, 0, ret, 65520, 15);
        return ret;
    }

    public static int getHash(int version) {
        int hash = 0;
        String versionStr = String.valueOf(version);
        for (int i = 0; i < versionStr.length(); i++) {
            hash = (32 * hash) + (int) versionStr.charAt(i) + 1;
        }
        return hash;
    }
}

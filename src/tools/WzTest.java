package tools;

import provider.wz.*;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class WzTest {
    public static void main(String[] args) throws Exception {
        String wzPath = "C:/Nexon/MapleStory/Quest.wz";
        WzMappedInputStream in = new WzMappedInputStream(Paths.get(wzPath).toFile());
        
        in.read(4); in.readLong();
        int fileStart = in.readInteger();
        in.readNullTerminatedString();
        in.setHeader(WzHeader.getDefault());
        in.getHeader().FILE_START = fileStart;

        Map<String, byte[]> ivs = new HashMap<>();
        ivs.put("None", null);
        ivs.put("GMS", new byte[]{0x4D, 0x23, (byte) 0xC7, 0x2B, 0x4D, 0x23, (byte) 0xC7, 0x2B, 0x4D, 0x23, (byte) 0xC7, 0x2B, 0x4D, 0x23, (byte) 0xC7, 0x2B});
        ivs.put("EMS", new byte[]{(byte) 0xB9, 0x7D, 0x63, (byte) 0xE9, (byte) 0xB9, 0x7D, 0x63, (byte) 0xE9, (byte) 0xB9, 0x7D, 0x63, (byte) 0xE9, (byte) 0xB9, 0x7D, 0x63, (byte) 0xE9});
        byte[] oldGms = new byte[16]; oldGms[0] = 0x4B; ivs.put("OldGMS", oldGms);

        for (Map.Entry<String, byte[]> entry : ivs.entrySet()) {
            String ivName = entry.getKey();
            byte[] iv = entry.getValue();
            System.out.println("Testing IV: " + ivName);
            in.setKey(iv == null ? null : generateKey(iv));

            for (int h = 0; h < 65536; h++) {
                in.setHash(h);
                in.seek(fileStart + 2);
                try {
                    int count = in.readCompressedInteger();
                    if (count > 0 && count < 100) {
                        byte type = in.readByte();
                        if (type == 3 || type == 4) {
                            String name = in.readString();
                            if (name.length() > 3 && name.endsWith(".img") && name.matches("[A-Za-z0-9.]+")) {
                                System.out.println("FOUND COMBINATION!");
                                System.out.println("IV: " + ivName + ", Hash: " + h);
                                System.out.println("Node: " + name + " (Type: " + type + ")");
                                return;
                            }
                        }
                    }
                } catch (Exception e) {}
                if (h > 0 && h % 20000 == 0) System.out.println("  Tested " + h + " hashes...");
            }
        }
        System.out.println("FAILED.");
    }

    private static final byte[] AES_KEY = new byte[]{
        (byte) 0x13, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, (byte) 0xB4, 0x00, 0x00, 0x00,
        (byte) 0x1B, 0x00, 0x00, 0x00, 0x0F, 0x00, 0x00, 0x00, 0x33, 0x00, 0x00, 0x00, 0x52, 0x00, 0x00, 0x00
    };
    private static final AES aes = new AES();
    static { aes.setKey(AES_KEY); }

    public static byte[] generateKey(byte[] iv) {
        byte[] ret = new byte[0xFFFF];
        byte[] civ = iv.clone();
        for (int i = 0; i < (0xFFFF / 16); i++) {
            civ = aes.encrypt(civ);
            System.arraycopy(civ, 0, ret, (i * 16), 16);
        }
        civ = aes.encrypt(civ);
        System.arraycopy(civ, 0, ret, 65520, 15);
        return ret;
    }
}

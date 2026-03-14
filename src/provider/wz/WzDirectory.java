package provider.wz;

import java.util.LinkedHashMap;
import java.util.Map;

public final class WzDirectory extends WzObject {
    private String name;
    private int offset;
    private int size;
    private int checksum;
    private Map<String, WzObject> children = new LinkedHashMap<>();
    private boolean parsed = false;

    public WzDirectory(String name, int offset, int size, int checksum) {
        this.name = name;
        this.offset = offset;
        this.size = size;
        this.checksum = checksum;
    }

    @Override
    public String getName() { return name; }

    @Override
    public Map<String, WzObject> getChildren() {
        return children;
    }

    @Override
    public void parse(WzInputStream in) {
        if (parsed) return;
        parsed = true;
        try {
            in.seek(offset);
            int count = in.readCompressedInteger();
            // System.out.println("Directory " + name + " has " + count + " children.");
            for (int i = 0; i < count; i++) {
                byte type = in.readByte();
                String n = null;
                int rem = -1;
                if (type == 1) {
                    in.readInteger(); in.readShort(); in.readInteger();
                    continue;
                } else if (type == 2) {
                    int stringOffset = in.readInteger();
                    rem = in.getPosition();
                    in.seek(in.getHeader().FILE_START + stringOffset);
                    in.readByte();
                    n = in.readString();
                    in.seek(rem);
                } else if (type == 3 || type == 4) {
                    n = in.readString();
                } else {
                    continue;
                }
                int fSize = in.readCompressedInteger();
                int fChecksum = in.readCompressedInteger();
                int fOffset = in.readOffset();
                if (type == 3) {
                    WzImage img = new WzImage(n, fOffset, fSize, fChecksum);
                    img.setParent(this);
                    img.setStoredInput(in);
                    addChild(img);
                } else if (type == 4) {
                    WzDirectory dir = new WzDirectory(n, fOffset, fSize, fChecksum);
                    dir.setParent(this);
                    addChild(dir);
                }
            }
        } catch (Exception e) {
            System.out.println("Error parsing directory " + name + ": " + e.getMessage());
        }
    }

    @Override
    public void addChild(WzObject o) {
        children.put(o.getName(), o);
    }
}

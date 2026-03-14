package provider.wz;

import java.util.LinkedHashMap;
import java.util.Map;

public final class WzImage extends WzObject {
    private String name;
    private int offset;
    private int size;
    private int checksum;
    private Map<String, WzObject> children = new LinkedHashMap<>();
    private WzInputStream storedInput;

    public WzImage(String name, int offset, int size, int checksum) {
        this.name = name;
        this.offset = offset;
        this.size = size;
        this.checksum = checksum;
    }

    @Override
    public String getName() { return name; }

    @Override
    public Map<String, WzObject> getChildren() {
        System.out.println("getChildren() called for " + name + ", storedInput exists: " + (storedInput != null));
        if (children.isEmpty() && storedInput != null) {
            parse(storedInput);
        }
        return children;
    }

    public void setStoredInput(WzInputStream in) {
        this.storedInput = in;
    }

    @Override
    public void parse(WzInputStream in) {
        in.seek(offset);
        byte b = in.readByte();
        System.out.println("Parsing image " + name + " at " + offset + ", type byte: " + String.format("%02X", b));
        if (b == 0x73) {
            String extendedHeader = in.readString();
            System.out.println("Image header: " + extendedHeader);
            in.skip(2); // Skip 00 00
            WzProperty.parse(in, offset, this);
            System.out.println("Parsed " + children.size() + " children for " + name);
        }
    }

    @Override
    public void addChild(WzObject o) {
        children.put(o.getName(), o);
    }
}

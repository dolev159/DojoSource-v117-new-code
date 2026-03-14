package provider.wz;

import java.awt.Point;
import java.util.LinkedHashMap;
import java.util.Map;

@SuppressWarnings({"rawtypes", "unchecked"})
public class WzProperty<E> extends WzObject {

    public enum Type {
        NULL, UNSIGNED_SHORT, COMPRESSED_INTEGER, COMPRESSED_LONG, BYTE_FLOAT, DOUBLE, STRING, SUB_PROPERTY, CANVAS, VECTOR, CONVEX, SOUND, UOL, EXTENDED;
    }

    private E value;
    private Type pType;
    private String name;
    private int blocksize;
    private int offset;
    private Map<String, WzObject> children;

    public WzProperty(String n, E val, Type p) {
        this(n, val, p, false);
    }

    public WzProperty(String n, E val, Type p, boolean contain) {
        name = n;
        value = val;
        pType = p;
        if (contain) {
            children = new LinkedHashMap<>();
        }
    }

    public int getBlocksize() { return blocksize; }
    public void setBlocksize(int sz) { blocksize = sz; }
    public int getOffset() { return offset; }
    public void setOffset(int offset) { this.offset = offset; }
    public E getValue() { return value; }
    public void setValue(E val) { value = val; }

    public int getIntValue() {
        if (value instanceof Integer) return (Integer) value;
        if (value instanceof String || value == null) return (value == null || "".equals(value)) ? 0 : Integer.parseInt((String) value);
        if (value instanceof Short) return (Short) value;
        if (value instanceof Long) return (int) (long) (Long) value;
        if (value instanceof Float) return (int) (float) (Float) value;
        return 0;
    }

    public long getLongValue() {
        if (value instanceof Long) return (Long) value;
        if (value instanceof Integer) return (Integer) value;
        return 0;
    }

    @Override
    public String getName() { return name; }

    @Override
    public Map<String, WzObject> getChildren() {
        return children != null ? children : new LinkedHashMap<>();
    }

    @Override
    public void addChild(WzObject o) {
        if (children != null) {
            o.setParent(this);
            children.put(o.getName(), o);
        }
    }

    @Override
    public void parse(WzInputStream in) {
        // Body is parsed via static parse method usually
    }

    public static void parse(WzInputStream in, int offset, WzObject parent) {
        int count = in.readCompressedInteger();
        for (int i = 0; i < count; i++) {
            String name = in.readStringBlock(offset);
            int t = in.read();
            switch (t) {
                case 0x00: parent.addChild(new WzProperty(name, null, Type.NULL)); break;
                case 0x02:
                case 0x0B: parent.addChild(new WzProperty(name, in.readShort(), Type.UNSIGNED_SHORT)); break;
                case 0x03: parent.addChild(new WzProperty(name, in.readCompressedInteger(), Type.COMPRESSED_INTEGER)); break;
                case 0x04:
                    int s = in.read();
                    if (s == 0x00) parent.addChild(new WzProperty(name, 0.0F, Type.BYTE_FLOAT));
                    else if (s == 0x80) parent.addChild(new WzProperty(name, in.readFloat(), Type.BYTE_FLOAT));
                    break;
                case 0x05: parent.addChild(new WzProperty(name, in.readDouble(), Type.DOUBLE)); break;
                case 0x08: parent.addChild(new WzProperty(name, in.readStringBlock(offset), Type.STRING)); break;
                case 0x09:
                    int bsize = in.readInteger();
                    int eob = bsize + in.getPosition();
                    WzProperty extended = parseExtended(in, name, offset);
                    if (extended != null) {
                        extended.setBlocksize(bsize);
                        parent.addChild(extended);
                    }
                    in.seek(eob);
                    break;
                case 0x14: parent.addChild(new WzProperty(name, in.readCompressedLong(), Type.COMPRESSED_LONG)); break;
            }
        }
    }

    private static WzProperty parseExtended(WzInputStream in, String name, int offset) {
        String iname = in.readStringBlock(offset);
        WzProperty child = null;
        if (!iname.isEmpty()) {
            switch (iname.charAt(0)) {
                case 'P':
                    child = new WzProperty(name, null, Type.SUB_PROPERTY, true);
                    in.skip(2);
                    parse(in, offset, child);
                    break;
                case 'C':
                    WzProperty canvas = new WzProperty(name, null, Type.CANVAS, true);
                    in.skip(1);
                    if (in.read() == 1) {
                        in.skip(2);
                        parse(in, offset, canvas);
                    }
                    in.readCompressedInteger(); in.readCompressedInteger(); in.readCompressedInteger(); in.readByte(); in.skip(4);
                    int len = in.readInteger(); in.skip(len);
                    child = canvas;
                    break;
                case 'S':
                    if (iname.startsWith("Shape2D#Vector2D")) {
                        Point vector = new Point();
                        vector.x = in.readCompressedInteger();
                        vector.y = in.readCompressedInteger();
                        child = new WzProperty(name, vector, Type.VECTOR);
                    } else {
                        child = new WzProperty(name, null, Type.SOUND);
                    }
                    break;
                case 'U':
                    in.skip(1);
                    int ut = in.read();
                    String link = null;
                    if (ut == 0x00) link = in.readString();
                    else if (ut == 0x01) link = in.readString(offset + in.readInteger());
                    if (link != null) child = new WzProperty(name, link, Type.UOL);
                    break;
            }
        }
        return child;
    }
}

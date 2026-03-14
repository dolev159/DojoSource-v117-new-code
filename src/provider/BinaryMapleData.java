package provider;

import java.awt.Point;
import java.io.DataInput;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class BinaryMapleData extends MapleData {
    private final String name;
    private final MapleDataType type;
    private final Object data;
    private final List<MapleData> children;
    private MapleDataEntity parent;

    public BinaryMapleData(DataInput in, MapleDataEntity parent) throws IOException {
        this.name = in.readUTF();
        this.type = MapleDataType.values()[in.readByte()];
        this.parent = parent;

        switch (type) {
            case INT:
                this.data = in.readInt();
                this.children = null;
                break;
            case SHORT:
                this.data = (short) in.readShort();
                this.children = null;
                break;
            case FLOAT:
                this.data = in.readFloat();
                this.children = null;
                break;
            case DOUBLE:
                this.data = in.readDouble();
                this.children = null;
                break;
            case LONG:
                this.data = in.readLong();
                this.children = null;
                break;
            case STRING:
            case UOL:
                this.data = in.readUTF();
                this.children = null;
                break;
            case VECTOR:
                this.data = new Point(in.readInt(), in.readInt());
                this.children = null;
                break;
            case CANVAS:
                this.data = new MapleCanvas(in.readInt(), in.readInt(), null);
                this.children = null;
                break;
            case PROPERTY:
            case CONVEX:
                int size = in.readInt();
                this.children = new ArrayList<>(size);
                for (int i = 0; i < size; i++) {
                    this.children.add(new BinaryMapleData(in, this));
                }
                this.data = null;
                break;
            default:
                this.data = null;
                this.children = null;
                break;
        }
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public MapleDataType getType() {
        return type;
    }

    @Override
    public Object getData() {
        return data;
    }

    @Override
    public List<MapleData> getChildren() {
        return children != null ? children : new ArrayList<>();
    }

    @Override
    public MapleData getChildByPath(String path) {
        if (path.isEmpty()) return this;
        String[] segments = path.split("/");
        if (segments[0].equals("..")) {
            MapleDataEntity p = getParent();
            if (p instanceof MapleData) {
                String nextPath = path.contains("/") ? path.substring(path.indexOf("/") + 1) : "";
                return ((MapleData) p).getChildByPath(nextPath);
            }
            return null;
        }

        MapleData current = this;
        for (String segment : segments) {
            boolean found = false;
            if (current.getChildren() != null) {
                for (MapleData child : current.getChildren()) {
                    if (child.getName().equals(segment)) {
                        current = child;
                        found = true;
                        break;
                    }
                }
            }
            if (!found) return null;
        }
        return current;
    }

    @Override
    public MapleDataEntity getParent() {
        return parent;
    }

    @Override
    public Iterator<MapleData> iterator() {
        return getChildren().iterator();
    }
}

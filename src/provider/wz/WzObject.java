package provider.wz;

import java.util.Iterator;
import java.util.Map;

public abstract class WzObject implements Comparable<WzObject>, Iterable<WzObject> {
    protected WzObject parent;

    public abstract String getName();
    public abstract Map<String, WzObject> getChildren();
    public abstract void parse(WzInputStream in);
    public abstract void addChild(WzObject o);

    public void setParent(WzObject parent) { this.parent = parent; }
    public WzObject getParent() { return parent; }

    public WzObject getChild(String name) {
        WzObject child = getChildren().get(name);
        if (child == null) {
            for (Map.Entry<String, WzObject> entry : getChildren().entrySet()) {
                if (entry.getKey().equalsIgnoreCase(name)) {
                    return entry.getValue();
                }
            }
        }
        return child;
    }

    @Override
    public Iterator<WzObject> iterator() {
        return getChildren().values().iterator();
    }

    @Override
    public int compareTo(WzObject o) {
        return getName().compareTo(o.getName());
    }
}

package provider.wz;

@SuppressWarnings("rawtypes")
public class WzPropertyTool {
    public static <T> T getProperty(WzProperty<?> prop, String name, T def) {
        WzObject child = prop.getChild(name);
        if (child instanceof WzProperty) {
            Object val = ((WzProperty) child).getValue();
            if (val != null) {
                if (def instanceof String) return (T) val.toString();
                if (def instanceof Integer) return (T) (Integer) ((WzProperty) child).getIntValue();
                if (def instanceof Long) return (T) (Long) ((WzProperty) child).getLongValue();
                return (T) val;
            }
        }
        return def;
    }
}

package provider.wz;

public class WzHeader {
    public String IDENT;
    public int FILE_SIZE;
    public int FILE_START;
    public String COPYRIGHT;

    public static WzHeader getDefault() {
        WzHeader h = new WzHeader();
        h.IDENT = "PKG1";
        h.FILE_SIZE = 0;
        h.FILE_START = 60;
        h.COPYRIGHT = "Package file v1.0 Copyright 2002 Wizet, ZMS";
        return h;
    }
}

/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation. You may not use, modify
or distribute this program under any other version of the
GNU Affero General Public License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package provider;

import java.io.File;

public class MapleDataProviderFactory {

    private final static String wzPath = System.getProperty("net.sf.odinms.wzpath");
    private final static String resPath = System.getProperty("net.sf.odinms.res_path", "resources");
    private static WzBinaryProvider binaryProvider;

    public static synchronized WzBinaryProvider getBinaryProvider() {
        if (binaryProvider == null) {
            binaryProvider = new WzBinaryProvider(new File(resPath));
        }
        return binaryProvider;
    }

    private static MapleDataProvider getWZ(Object in) {
        if (in instanceof File) {
            File file = (File) in;
            String name = file.getName();
            if (name.endsWith(".wz")) {
                name = name.substring(0, name.length() - 3);
            }
            File binFile = new File(resPath, name + ".bin");
            if (binFile.exists()) {
                return new BinaryDataProvider(binFile);
            }
            return new WzXMLDataProvider(file);
        }
        throw new IllegalArgumentException("Invalid data input: " + in);
    }

    public static MapleDataProvider getDataProvider(Object in) {
        if (in instanceof String) {
            String name = (String) in;
            File binFile = new File(resPath, name + ".bin");
            if (binFile.exists()) {
                return new BinaryDataProvider(binFile);
            }
            return getWZ(new File(wzPath, name));
        }
        return getWZ(in);
    }

    public static File fileInWZPath(String filename) {
        return new File(wzPath, filename);
    }
}
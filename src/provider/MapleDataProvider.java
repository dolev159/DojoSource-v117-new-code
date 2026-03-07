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
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.nio.file.Paths;

public class MapleDataProvider {
    private File root;
    private MapleDataDirectoryEntry rootForNavigation;
    private final ConcurrentMap<String, java.lang.ref.SoftReference<MapleData>> cache = new ConcurrentHashMap<>();

    public MapleDataProvider(File fileIn) {
        root = fileIn;
        rootForNavigation = new MapleDataDirectoryEntry(fileIn.getName(), 0, 0, null);
        fillMapleDataEntitys(root, rootForNavigation);
    }

    private void fillMapleDataEntitys(File lroot, MapleDataDirectoryEntry wzdir) {
        for (File file : lroot.listFiles()) {
            String fileName = file.getName();

            if (file.isDirectory() && !fileName.endsWith(".img")) {
                MapleDataDirectoryEntry newDir = new MapleDataDirectoryEntry(fileName, 0, 0, wzdir);
                wzdir.addDirectory(newDir);
                fillMapleDataEntitys(file, newDir);

            } else if (fileName.endsWith(".xml")) { // Get the real size here?
                wzdir.addFile(new MapleDataFileEntry(fileName.substring(0, fileName.length() - 4), 0, 0, wzdir));
            }
        }
    }

    public MapleData getData(String path) {
        java.lang.ref.SoftReference<MapleData> ref = cache.get(path);
        if (ref != null) {
            MapleData data = ref.get();
            if (data != null) {
                return data;
            }
        }
        File dataFile = new File(root, path + ".xml");
        File imageDataDir = new File(root, path);
        
        if (!dataFile.exists()) {
             throw new RuntimeException("Datafile " + path + " does not exist in " + root.getAbsolutePath());
        }

        try (MappedInputStream mis = new MappedInputStream(Paths.get(dataFile.getAbsoluteFile().toURI()))) {
             final MapleData domMapleData = new MapleData(mis, imageDataDir.getParentFile());
             cache.put(path, new java.lang.ref.SoftReference<>(domMapleData));
             return domMapleData;
        } catch (IOException e) {
            throw new RuntimeException("Error loading data from " + path, e);
        }
    }

    public MapleDataDirectoryEntry getRoot() {
        return rootForNavigation;
    }
}
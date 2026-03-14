package provider;

import java.io.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class BinaryDataProvider implements MapleDataProvider {
    private final File file;
    private final Map<String, Entry> entries = new HashMap<>();
    private final ConcurrentMap<String, java.lang.ref.SoftReference<MapleData>> cache = new ConcurrentHashMap<>();
    private MapleDataDirectoryEntry rootForNavigation;

    public BinaryDataProvider(File file) {
        this.file = file;
        this.rootForNavigation = new MapleDataDirectoryEntry(file.getName().replace(".bin", ""), 0, 0, null);
        loadEntries();
    }

    private void loadEntries() {
        if (!file.exists()) return;
        try (RandomAccessFile raf = new RandomAccessFile(file, "r")) {
            raf.seek(4);
            long metaOffset = raf.readLong();
            raf.seek(metaOffset);
            int size = raf.readInt();
            for (int i = 0; i < size; i++) {
                String path = raf.readUTF();
                long offset = raf.readLong();
                int length = raf.readInt();
                entries.put(path, new Entry(offset, length));
                
                // Build navigation tree
                String[] segments = path.split("/");
                MapleDataDirectoryEntry current = rootForNavigation;
                for (int s = 0; s < segments.length - 1; s++) {
                    MapleDataEntry entry = current.getEntry(segments[s]);
                    MapleDataDirectoryEntry next = (entry instanceof MapleDataDirectoryEntry) ? (MapleDataDirectoryEntry) entry : null;
                    if (next == null) {
                        next = new MapleDataDirectoryEntry(segments[s], 0, 0, current);
                        current.addDirectory(next);
                    }
                    current = next;
                }
                current.addFile(new MapleDataFileEntry(segments[segments.length - 1], 0, 0, current));
            }
        } catch (IOException e) {
            System.err.println("Failed to load binary data provider from " + file.getName());
            e.printStackTrace();
        }
    }

    @Override
    public MapleData getData(String path) {
        java.lang.ref.SoftReference<MapleData> ref = cache.get(path);
        if (ref != null) {
            MapleData data = ref.get();
            if (data != null) return data;
        }

        Entry entry = entries.get(path);
        if (entry == null) return null;

        try (RandomAccessFile raf = new RandomAccessFile(file, "r")) {
            raf.seek(entry.offset);
            byte[] dataBytes = new byte[entry.length];
            raf.readFully(dataBytes);
            try (DataInputStream dis = new DataInputStream(new ByteArrayInputStream(dataBytes))) {
                MapleData data = new BinaryMapleData(dis, null);
                cache.put(path, new java.lang.ref.SoftReference<>(data));
                return data;
            }
        } catch (IOException e) {
            throw new RuntimeException("Error loading binary data for " + path, e);
        }
    }

    @Override
    public MapleDataDirectoryEntry getRoot() {
        return rootForNavigation;
    }

    private static class Entry {
        long offset;
        int length;
        Entry(long offset, int length) {
            this.offset = offset;
            this.length = length;
        }
    }
}

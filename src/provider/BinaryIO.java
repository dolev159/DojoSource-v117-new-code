package provider;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.Map;
import java.util.TreeMap;

public class BinaryIO {
    public static final String READ_MODE = "r";

    public static void writeOffsetTable(Map<Integer, Integer> offsets, RandomAccessFile raf) throws IOException {
        long currentPos = raf.getFilePointer();
        raf.seek(0);
        raf.writeInt(offsets.size());
        for (Map.Entry<Integer, Integer> entry : new TreeMap<>(offsets).entrySet()) {
            raf.writeInt(entry.getKey());
            raf.writeInt(entry.getValue());
        }
        raf.seek(currentPos);
    }

    public static void loadOffsets(Map<Integer, Integer> offsets, String filePath) {
        try (RandomAccessFile raf = new RandomAccessFile(filePath, READ_MODE)) {
            int size = raf.readInt();
            for (int i = 0; i < size; i++) {
                offsets.put(raf.readInt(), raf.readInt());
            }
        } catch (IOException e) {
            // Ignore if file doesn't exist yet
        }
    }
}

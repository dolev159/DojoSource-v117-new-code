package provider.wz;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.channels.FileChannel;

public class WzMappedInputStream extends WzInputStream {
    private ByteBuffer buffer;

    public WzMappedInputStream(File file) throws IOException {
        try (RandomAccessFile raf = new RandomAccessFile(file, "r")) {
            FileChannel channel = raf.getChannel();
            buffer = channel.map(FileChannel.MapMode.READ_ONLY, 0, channel.size());
            buffer.order(ByteOrder.LITTLE_ENDIAN);
        }
    }

    @Override
    public int read() {
        int pos = getPosition();
        if (pos >= buffer.limit()) return -1;
        int val = buffer.get(pos) & 0xFF;
        skip(1);
        return val;
    }

    @Override
    public byte readByte() {
        int pos = getPosition();
        if (pos >= buffer.limit()) return 0;
        byte val = buffer.get(pos);
        skip(1);
        return val;
    }

    @Override
    public byte[] read(int length) {
        int pos = getPosition();
        byte[] b = new byte[length];
        buffer.position(pos);
        buffer.get(b);
        skip(length);
        return b;
    }
}

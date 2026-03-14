package provider;

import java.io.IOException;
import java.io.RandomAccessFile;

public interface DatSerializable {
    void write(RandomAccessFile dos) throws IOException;
    DatSerializable load(RandomAccessFile dis) throws IOException;
}

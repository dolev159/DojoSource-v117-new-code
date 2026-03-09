package tools;

import java.io.PrintStream;
import java.io.OutputStream;
import java.io.IOException;

/**
 * TeedPrintStream - Redirects output to two separate streams (e.g. Console and File).
 */
public class TeedPrintStream extends PrintStream {
    private final PrintStream second;

    public TeedPrintStream(OutputStream main, PrintStream second) {
        super(main);
        this.second = second;
    }

    @Override
    public void write(int b) {
        super.write(b);
        second.write(b);
    }

    @Override
    public void write(byte[] buf, int off, int len) {
        super.write(buf, off, len);
        second.write(buf, off, len);
    }

    @Override
    public void flush() {
        super.flush();
        second.flush();
    }

    @Override
    public void close() {
        super.close();
        second.close();
    }
}

package com.furnaghan.tfl.service.util;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;

public class TrimingInputStream extends FilterInputStream {

    private boolean started;
    private int count;

    public TrimingInputStream(InputStream in) {
        super(in);

        started = false;
        count = 0;
    }

    public int getCount() {
        return count;
    }

    @Override
    public int read() throws IOException {
        final int value = super.read();
        if (started) {
            return value;
        }

        if (value == ' ' || value == '\n' || value == '\r') {
            count++;
            return read();
        }

        started = true;
        return value;
    }

    @Override
    public int read(byte[] b) throws IOException {
        return read(b, 0, b.length);
    }

    @Override
    public int read(byte[] b, int off, int len) throws IOException {
        if (b == null) {
            throw new NullPointerException();
        } else if (off < 0 || len < 0 || len > b.length - off) {
            throw new IndexOutOfBoundsException();
        } else if (len == 0) {
            return 0;
        }

        int c = read();
        if (c == -1) {
            return -1;
        }
        b[off] = (byte)c;

        int i = 1;
        try {
            for (; i < len ; i++) {
                c = read();
                if (c == -1) {
                    break;
                }
                b[off + i] = (byte)c;
            }
        } catch (IOException ee) {
        }
        return i;
    }
}

package com.furnaghan.tfl.service.util.io;

import java.io.IOException;
import java.io.InputStream;

public class TrimingInputStream extends InputStream {

    private final InputStream delegate;

    private boolean started;

    public TrimingInputStream(InputStream delegate) {
        this.delegate = delegate;

        started = false;
    }

    @Override
    public int read() throws IOException {
        final int value = delegate.read();
        if (!started) {
            if (value == ' ' || value == '\n' || value == '\r') {
                return read();
            }

            started = true;
        }

        return value;
    }

    @Override
    public int available() throws IOException {
        return delegate.available();
    }

    @Override
    public void close() throws IOException {
        delegate.close();
    }
}

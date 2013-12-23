package com.furnaghan.tfl.service.util.csv;

import com.googlecode.jcsv.reader.CSVEntryFilter;

public class NotNullEntryFilter<T> implements CSVEntryFilter<T> {
    @Override
    public boolean match(T entry) {
        return entry != null;
    }
}

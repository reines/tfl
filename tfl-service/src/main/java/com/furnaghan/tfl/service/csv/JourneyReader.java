package com.furnaghan.tfl.service.csv;

import com.furnaghan.tfl.service.finder.RouteFinder;
import com.furnaghan.tfl.service.model.Journey;
import com.furnaghan.tfl.service.util.csv.NotNullEntryFilter;
import com.furnaghan.tfl.service.util.io.TrimingInputStream;
import com.googlecode.jcsv.CSVStrategy;
import com.googlecode.jcsv.reader.CSVReader;
import com.googlecode.jcsv.reader.internal.CSVReaderBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

public class JourneyReader implements AutoCloseable {

    private static final CSVStrategy TFL_CSV_STRATEGY = new CSVStrategy(',', '"', '#', true, true);

    private final CSVReader<Journey> csvReader;

    public JourneyReader(InputStream in, RouteFinder routeFinder) throws IOException {
        csvReader = new CSVReaderBuilder<Journey>(new InputStreamReader(new TrimingInputStream(in)))
                .strategy(TFL_CSV_STRATEGY)
                .entryParser(new JourneyEntryParser(routeFinder))
                .entryFilter(new NotNullEntryFilter<Journey>())
                .build();
    }

    public List<Journey> readAll() throws IOException {
        return csvReader.readAll();
    }

    @Override
    public void close() throws IOException {
        csvReader.close();
    }
}

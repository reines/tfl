package com.furnaghan.tfl.service.csv;

import com.furnaghan.tfl.service.model.Journey;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

public class JourneyReaderTest {

    private JourneyReader reader;

    @Before
    public void setUp() throws IOException {
        reader = new JourneyReader(JourneyReaderTest.class.getResourceAsStream("/journeys.csv"));
    }

    @Test
    public void test() throws IOException {
        final List<Journey> journeys = reader.readAll();
        for (Journey journey : journeys) {
            System.err.println(journey);
        }
    }
}

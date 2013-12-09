package com.furnaghan.tfl.service.model;

import org.joda.time.DateTime;

public class Destination {

    private final DateTime time;
    private final String station;

    public Destination(DateTime time, String station) {
        this.time = time;
        this.station = station;
    }

    public DateTime getTime() {
        return time;
    }

    public String getStation() {
        return station;
    }
}

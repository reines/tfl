package com.furnaghan.tfl.service.model;

import org.joda.time.DateTime;

public class Destination {

    private final DateTime time;
    private final Station station;

    public Destination(DateTime time, Station station) {
        this.time = time;
        this.station = station;
    }

    public DateTime getTime() {
        return time;
    }

    public Station getStation() {
        return station;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Destination that = (Destination) o;

        if (station != null ? !station.equals(that.station) : that.station != null) return false;
        if (time != null ? !time.equals(that.time) : that.time != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = time != null ? time.hashCode() : 0;
        result = 31 * result + (station != null ? station.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Destination{" +
                "time=" + time +
                ", station='" + station + '\'' +
                '}';
    }
}

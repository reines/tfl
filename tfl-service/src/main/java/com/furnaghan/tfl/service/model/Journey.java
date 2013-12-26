package com.furnaghan.tfl.service.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.furnaghan.tfl.service.path.Path;
import org.joda.money.Money;
import org.joda.time.DateTime;

public class Journey implements Comparable<Journey> {

    private final DateTime start;
    private final DateTime end;
    private final Path<Station> path;
    private final Money charge;
    private final String note;

    @JsonCreator
    public Journey(
            @JsonProperty("start") DateTime start,
            @JsonProperty("end") DateTime end,
            @JsonProperty("path") Path<Station> path,
            @JsonProperty("charge") Money charge,
            @JsonProperty("note") String note) {
        this.start = start;
        this.end = end;
        this.path = path;
        this.charge = charge;
        this.note = note;
    }

    public DateTime getStart() {
        return start;
    }

    public DateTime getEnd() {
        return end;
    }

    public Path<Station> getPath() {
        return path;
    }

    public Money getCharge() {
        return charge;
    }

    public String getNote() {
        return note;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Journey journey = (Journey) o;

        if (charge != null ? !charge.equals(journey.charge) : journey.charge != null) return false;
        if (end != null ? !end.equals(journey.end) : journey.end != null) return false;
        if (note != null ? !note.equals(journey.note) : journey.note != null) return false;
        if (path != null ? !path.equals(journey.path) : journey.path != null) return false;
        if (start != null ? !start.equals(journey.start) : journey.start != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = start != null ? start.hashCode() : 0;
        result = 31 * result + (end != null ? end.hashCode() : 0);
        result = 31 * result + (path != null ? path.hashCode() : 0);
        result = 31 * result + (charge != null ? charge.hashCode() : 0);
        result = 31 * result + (note != null ? note.hashCode() : 0);
        return result;
    }

    @Override
    public int compareTo(Journey o) {
        return start.compareTo(o.start);
    }

    @Override
    public String toString() {
        return "Journey{" +
                "start=" + start +
                ", end=" + end +
                ", charge=" + charge +
                ", note='" + note + '\'' +
                '}';
    }
}

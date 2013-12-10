package com.furnaghan.tfl.service.model;

import org.joda.money.Money;

public class Journey {

    private final Destination start;
    private final Destination end;
    private final Money charge;
    private final String note;

    public Journey(Destination start, Destination end, Money charge, String note) {
        this.start = start;
        this.end = end;
        this.charge = charge;
        this.note = note;
    }

    public Destination getStart() {
        return start;
    }

    public Destination getEnd() {
        return end;
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
        if (start != null ? !start.equals(journey.start) : journey.start != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = start != null ? start.hashCode() : 0;
        result = 31 * result + (end != null ? end.hashCode() : 0);
        result = 31 * result + (charge != null ? charge.hashCode() : 0);
        result = 31 * result + (note != null ? note.hashCode() : 0);
        return result;
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

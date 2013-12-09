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
}

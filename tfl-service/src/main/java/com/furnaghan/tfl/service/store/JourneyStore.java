package com.furnaghan.tfl.service.store;

import com.furnaghan.tfl.service.model.Journey;

import java.util.Collection;
import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class JourneyStore {

    public static JourneyStore load() {
        return new JourneyStore();
    }

    private final SortedSet<Journey> journeys;

    private JourneyStore() {
        journeys = new TreeSet<Journey>();
    }

    public boolean addAll(Collection<Journey> journeys) {
        return this.journeys.addAll(journeys);
    }

    public SortedSet<Journey> list() {
        return Collections.unmodifiableSortedSet(journeys);
    }
}

package com.furnaghan.tfl.service.store;

import com.furnaghan.tfl.service.model.Journey;
import com.google.common.collect.SortedSetMultimap;
import com.google.common.collect.TreeMultimap;

import java.util.Collection;
import java.util.Collections;
import java.util.SortedSet;

public class JourneyStore {

    public static JourneyStore load() {
        return new JourneyStore();
    }

    private final SortedSetMultimap<Long, Journey> journeys;

    private JourneyStore() {
        journeys = TreeMultimap.create();
    }

    public boolean addAll(long key, Collection<Journey> values) {
        return journeys.putAll(key, values);
    }

    public SortedSet<Journey> list(long key) {
        return Collections.unmodifiableSortedSet(journeys.get(key));
    }
}

package com.furnaghan.tfl.service.finder;

import com.furnaghan.tfl.service.model.Station;
import com.furnaghan.tfl.service.store.ConnectionStore;
import com.furnaghan.tfl.service.util.path.Graph;
import com.google.common.collect.ImmutableSet;

import java.util.Collection;

public class RouteGraph implements Graph<Station> {

    private static final float LINE_CHANGE_PENALTY = 100F;
    private static final float STATION_STOP_PENALTY = 20F;

    private final ConnectionStore connectionStore;

    public RouteGraph(ConnectionStore connectionStore) {
        this.connectionStore = connectionStore;
    }

    @Override
    public Collection<Station> getNeighbours(Station node) {
        final ImmutableSet.Builder<Station> neighbours = ImmutableSet.builder();

        for (Station station : connectionStore.getStations(node.getName())) {
            neighbours.addAll(connectionStore.getConnectedStations(station));
        }

        return neighbours.build();
    }

    @Override
    public float distanceBetween(Station current, Station option) {
        return costEstimate(current, option) + STATION_STOP_PENALTY;
    }

    @Override
    public float costEstimate(Station option, Station goal) {
        float cost = option.distanceTo(goal);

        // Changing lines is expensive!
        if (!option.isOnLine(goal.getLine())) {
            cost += LINE_CHANGE_PENALTY;
        }

        return cost;
    }
}

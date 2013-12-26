package com.furnaghan.tfl.service.finder;

import com.furnaghan.tfl.service.model.Station;
import com.furnaghan.tfl.service.path.Graph;
import com.furnaghan.tfl.service.store.ConnectionStore;
import com.google.common.collect.ImmutableSet;

import java.util.Collection;

public class RouteGraph implements Graph<Station> {

    private static final float DEFAULT_LINE_CHANGE_PENALTY = 100F;
    private static final float DEFAULT_STATION_STOP_PENALTY = 20F;

    private final ConnectionStore connectionStore;
    private final float lineChangePenalty;
    private final float stationStopPenalty;

    public RouteGraph(ConnectionStore connectionStore) {
        this (connectionStore, DEFAULT_LINE_CHANGE_PENALTY, DEFAULT_STATION_STOP_PENALTY);
    }

    public RouteGraph(ConnectionStore connectionStore, float lineChangePenalty, float stationStopPenalty) {
        this.connectionStore = connectionStore;
        this.lineChangePenalty = lineChangePenalty;
        this.stationStopPenalty = stationStopPenalty;
    }

    @Override
    public Collection<Station> getNeighbours(Station node) {
        final ImmutableSet.Builder<Station> neighbours = ImmutableSet.builder();

        for (Station station : connectionStore.getStations(node.getName())) {
            neighbours.addAll(connectionStore.getConnectedStations(station));
        }

        return neighbours.build();
    }

    // Always 1 hop
    @Override
    public float distanceBetween(Station current, Station option) {
        float cost = costEstimate(current, option);

        // Take in to account the line multiplier
        cost /= current.getLine().getMultiplier(); // TODO: current or option?

        // Going through a station costs
        cost += stationStopPenalty;

        // Changing lines is expensive!
        if (!option.isOnLine(current.getLine())) {
            cost += lineChangePenalty;
        }

        return cost;
    }

    // Can be multiple hops
    @Override
    public float costEstimate(Station option, Station goal) {
        return option.distanceTo(goal);
    }
}

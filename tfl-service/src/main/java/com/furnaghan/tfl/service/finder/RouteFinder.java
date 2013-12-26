package com.furnaghan.tfl.service.finder;

import com.furnaghan.tfl.service.model.Station;
import com.furnaghan.tfl.service.store.ConnectionStore;
import com.furnaghan.tfl.service.path.Path;
import com.furnaghan.tfl.service.path.astar.AStarPathFinder;
import com.google.common.base.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

public class RouteFinder {

    private static final Logger LOG = LoggerFactory.getLogger(RouteFinder.class);

    private final ConnectionStore connectionStore;
    private final RouteGraph routeGraph;

    public RouteFinder(ConnectionStore connectionStore) {
        this.connectionStore = connectionStore;

        routeGraph = new RouteGraph(connectionStore);
    }

    public Optional<Path<Station>> findPath(String startName, String endName) {
        final Set<Station> startStations = connectionStore.getStations(startName);
        if (startStations.isEmpty()) {
            LOG.trace("Couldn't find any start stations for {}", startName);
            return Optional.absent();
        }

        final Set<Station> endStations = connectionStore.getStations(endName);
        if (endStations.isEmpty()) {
            LOG.trace("Couldn't find any end stations for {}", endName);
            return Optional.absent();
        }

        float bestScore = Float.MAX_VALUE;
        Path<Station> bestPath = null;

        for (Station start : startStations) {
            for (Station end : endStations) {
                final AStarPathFinder<Station> pathFinder = new AStarPathFinder<Station>(start, end, routeGraph);
                final Optional<Path<Station>> path = pathFinder.call();
                if (!path.isPresent()) {
                    continue;
                }

                final float score = path.get().getScore();
                if (score < bestScore) {
                    bestScore = score;
                    bestPath = path.get();
                }

                LOG.trace("Found path from {} to {} with score {}: {}", startName, endName, score, path.get());
            }
        }

        if (bestPath == null) {
            LOG.trace("Couldn't find path from {} to {}", startName, endName);
            return Optional.absent();
        }

        LOG.trace("Chose best path (score = {}) from {} to {}: {}", bestScore, bestPath.getStart(), bestPath.getEnd(), bestPath);
        return Optional.of(bestPath);
    }
}

package com.furnaghan.tfl.service.path.astar;

import com.furnaghan.tfl.service.path.Graph;
import com.furnaghan.tfl.service.path.Path;
import com.google.common.base.Optional;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;

import java.util.*;
import java.util.concurrent.Callable;

public class AStarPathFinder<T> implements Callable<Optional<Path<T>>> {

    private static final int OPEN_SET_INITIAL_CAPACITY = 11;

    private final T goal;
    private final Graph<T> graph;

    private final Set<T> closedSet;
    private final PriorityQueue<T> openSet;
    private final Map<T, T> cameFromMap;
    private final Map<T, Float> gScoreMap;
    private final Map<T, Float> fScoreMap;

    public AStarPathFinder(T start, T goal, Graph<T> graph) {
        this.goal = goal;
        this.graph = graph;

        closedSet = Sets.newHashSet();

        openSet = new PriorityQueue<T>(OPEN_SET_INITIAL_CAPACITY, new Comparator<T>() {
            @Override
            public int compare(T o1, T o2) {
                final float score1 = Optional.fromNullable(fScoreMap.get(o1)).or(0F);
                final float score2 = Optional.fromNullable(fScoreMap.get(o2)).or(0F);

                return Float.compare(score1, score2);
            }
        });
        openSet.add(start);

        cameFromMap = Maps.newHashMap();

        gScoreMap = Maps.newHashMap();
        gScoreMap.put(start, 0F);

        fScoreMap = Maps.newHashMap();
        fScoreMap.put(start, graph.costEstimate(start, goal));
    }

    private Path<T> reconstructPath(T current) {
        final LinkedList<T> path = Lists.newLinkedList();

        // path starts at the goal, get the final score
        final float gScore = Optional.fromNullable(gScoreMap.get(current)).or(0F);
        path.push(current);

        // traverse it backwards until we no longer came from anywhere (i.e the start)
        while (cameFromMap.containsKey(current)) {
            current = cameFromMap.get(current);
            path.push(current);
        }

        return new Path<T>(path, gScore);
    }

    @Override
    public Optional<Path<T>> call() {
        if (!closedSet.isEmpty()) {
            throw new IllegalStateException("Attempted to re-call " + this.getClass().getSimpleName());
        }

        while (!openSet.isEmpty()) {
            final T current = openSet.poll();

            // If we've found the goal
            if (goal.equals(current)) {
                return Optional.of(reconstructPath(goal));
            }

            closedSet.add(current);

            // The score for getting from the start to this node
            final float gScoreCurrent = Optional.fromNullable(gScoreMap.get(current)).or(0F);

            final Collection<T> neighbours = graph.getNeighbours(current);
            for (T neighbour : neighbours) {
                // The score for getting to this neighbour
                final float gScore = gScoreCurrent + graph.distanceBetween(current, neighbour);
                // The score for getting from the start to the finish via this neighbour
                final float fScore = gScore + graph.costEstimate(neighbour, goal);

                final float fScoreOld = Optional.fromNullable(fScoreMap.get(neighbour)).or(0F);

                // If we've already tried this, and this isn't a cheaper alternative, skip it
                if (closedSet.contains(neighbour) && fScore >= fScoreOld) {
                    continue;
                }

                if (!openSet.contains(neighbour) || fScore < fScoreOld) {
                    cameFromMap.put(neighbour, current);
                    gScoreMap.put(neighbour, gScore);
                    fScoreMap.put(neighbour, fScore);
                    openSet.add(neighbour);
                }
            }
        }

        return Optional.absent();
    }
}

package com.furnaghan.tfl.service.path;

import java.util.Collection;

public interface Graph<T> {

    public Collection<T> getNeighbours(T node);
    public float distanceBetween(T current, T option);
    public float costEstimate(T option, T goal);
}

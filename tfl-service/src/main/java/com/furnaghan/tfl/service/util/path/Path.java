package com.furnaghan.tfl.service.util.path;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class Path<T> {

    private final LinkedList<T> stops;
    private final float score;

    @JsonCreator
    public Path(
            @JsonProperty("stops") LinkedList<T> stops,
            @JsonProperty("score") float score) {
        this.stops = stops;
        this.score = score;
    }

    @JsonIgnore
    public T getStart() {
        return stops.getFirst();
    }

    @JsonIgnore
    public T getEnd() {
        return stops.getLast();
    }

    public List<T> getStops() {
        return Collections.unmodifiableList(stops);
    }

    public float getScore() {
        return score;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Path path = (Path) o;

        if (Float.compare(path.score, score) != 0) return false;
        if (stops != null ? !stops.equals(path.stops) : path.stops != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = stops != null ? stops.hashCode() : 0;
        result = 31 * result + (score != +0.0f ? Float.floatToIntBits(score) : 0);
        return result;
    }

    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();

        for (T point : stops) {
            builder.append(point);
            builder.append(", ");
        }

        final int length = builder.length();
        builder.delete(length - 2, length);

        return builder.toString();
    }
}

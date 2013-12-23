package com.furnaghan.tfl.service.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Station {

    private final String name;
    private final Line line;
    private final float x;
    private final float y;

    @JsonCreator
    public Station(
            @JsonProperty("name") String name,
            @JsonProperty("line") Line line,
            @JsonProperty("x") float x,
            @JsonProperty("y") float y) {
        this.name = name;
        this.line = line;
        this.x = x;
        this.y = y;
    }

    public String getName() {
        return name;
    }

    public Line getLine() {
        return line;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Station station = (Station) o;

        if (line != null ? !line.equals(station.line) : station.line != null) return false;
        if (name != null ? !name.equals(station.name) : station.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (line != null ? line.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Station{" +
                "name='" + name + '\'' +
                ", line=" + line +
                ", x=" + x +
                ", y=" + y +
                '}';
    }
}

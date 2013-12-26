package com.furnaghan.tfl.service.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Line {

    private final String name;
    private final String colour;
    private final float multiplier;

    @JsonCreator
    public Line(
            @JsonProperty("name") String name,
            @JsonProperty("colour") String colour,
            @JsonProperty("multiplier") float multiplier) {
        this.name = name;
        this.colour = colour;
        this.multiplier = multiplier;
    }

    public String getName() {
        return name;
    }

    public String getColour() {
        return colour;
    }

    public float getMultiplier() {
        return multiplier;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Line line = (Line) o;

        if (name != null ? !name.equals(line.name) : line.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }

    @Override
    public String toString() {
        return name;
    }
}

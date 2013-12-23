package com.furnaghan.tfl.service.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Line {

    private final String name;
    private final String colour;

    @JsonCreator
    public Line(
            @JsonProperty("name") String name,
            @JsonProperty("colour") String colour) {
        this.name = name;
        this.colour = colour;
    }

    public String getName() {
        return name;
    }

    public String getColour() {
        return colour;
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
        return "Line{" +
                "name='" + name + '\'' +
                ", colour='" + colour + '\'' +
                '}';
    }
}

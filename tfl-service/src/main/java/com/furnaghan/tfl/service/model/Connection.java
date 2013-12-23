package com.furnaghan.tfl.service.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Connection {

    private final Station stationA;
    private final Station stationB;

    @JsonCreator
    public Connection(
            @JsonProperty("stationA") Station stationA,
            @JsonProperty("stationB") Station stationB) {
        this.stationA = stationA;
        this.stationB = stationB;
    }

    public Station getStationA() {
        return stationA;
    }

    public Station getStationB() {
        return stationB;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Connection that = (Connection) o;

        if (stationA != null ? !stationA.equals(that.stationA) : that.stationA != null) return false;
        if (stationB != null ? !stationB.equals(that.stationB) : that.stationB != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = stationA != null ? stationA.hashCode() : 0;
        result = 31 * result + (stationB != null ? stationB.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Connection{" +
                "stationA=" + stationA +
                ", stationB=" + stationB +
                '}';
    }
}

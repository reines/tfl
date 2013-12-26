package com.furnaghan.tfl.service.store;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.furnaghan.tfl.service.model.Connection;
import com.furnaghan.tfl.service.model.Station;
import com.google.common.collect.LinkedHashMultimap;
import com.google.common.collect.LinkedListMultimap;
import com.google.common.collect.SetMultimap;
import com.yammer.dropwizard.json.ObjectMapperFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.Set;

public class ConnectionStore {

    private static final ObjectMapper JSON = new ObjectMapperFactory().build();
    private static final TypeReference<?> CONNECTION_LIST_TYPE = new TypeReference<LinkedListMultimap<String, Connection>>() {};

    public static ConnectionStore load(InputStream in) throws IOException {
        final LinkedListMultimap<String, Connection> connections = JSON.readValue(in, CONNECTION_LIST_TYPE);
        return new ConnectionStore(connections);
    }

    private final SetMultimap<Station, Station> stationConnections;
    private final SetMultimap<String, Station> stations;

    private ConnectionStore(LinkedListMultimap<String, Connection> connections) {
        stationConnections = LinkedHashMultimap.create();
        stations = LinkedHashMultimap.create();

        extractStations(connections);
    }

    private void extractStations(LinkedListMultimap<String, Connection> connections) {
        stations.clear();

        for (Connection connection : connections.values()) {
            handleStation(connection.getStationA());
            handleStation(connection.getStationB());

            // TODO: Not all connections are bi-directional, are they?
            handleConnection(connection.getStationA(), connection.getStationB());
            handleConnection(connection.getStationB(), connection.getStationA());
        }
    }

    private void handleConnection(Station stationA, Station stationB) {
        stationConnections.put(stationA, stationB);
    }

    private void handleStation(Station station) {
        if (!stations.containsValue(station)) {
            stations.put(station.getName(), station);
        }
    }

    public Set<Station> getStations(String name) {
        return Collections.unmodifiableSet(stations.get(name));
    }

    public Set<Station> getConnectedStations(Station source) {
        return Collections.unmodifiableSet(stationConnections.get(source));
    }
}

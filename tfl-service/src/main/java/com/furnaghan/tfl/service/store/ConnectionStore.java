package com.furnaghan.tfl.service.store;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.furnaghan.tfl.service.model.Connection;
import com.furnaghan.tfl.service.model.Station;
import com.google.common.base.Optional;
import com.google.common.collect.*;
import com.yammer.dropwizard.json.ObjectMapperFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;

public class ConnectionStore {

    private static final ObjectMapper JSON = new ObjectMapperFactory().build();
    private static final TypeReference<?> CONNECTION_LIST_TYPE = new TypeReference<LinkedListMultimap<String, Connection>>() {};

    public static ConnectionStore load(InputStream in) throws IOException {
        final LinkedListMultimap<String, Connection> connections = JSON.readValue(in, CONNECTION_LIST_TYPE);
        return new ConnectionStore(connections);
    }

    private final LinkedListMultimap<String, Connection> connections;
    private final SetMultimap<String, Station> stations;

    private ConnectionStore(LinkedListMultimap<String, Connection> connections) {
        this.connections = connections;

        stations = LinkedHashMultimap.create();
        extractStations();
    }

    private synchronized void extractStations() {
        stations.clear();

        for (Connection connection : connections.values()) {
            handleStation(connection.getStationA());
            handleStation(connection.getStationB());
        }
    }

    private synchronized void handleStation(Station station) {
        if (!stations.containsValue(station)) {
            stations.put(station.getName(), station);
        }
    }

    public Optional<Station> getStation(String name) {
        final Collection<Station> results = stations.get(name);
        if (results.isEmpty()) {
            return Optional.absent();
        }

        // TODO: Choose the right station
        return Optional.fromNullable(results.iterator().next());
    }
}

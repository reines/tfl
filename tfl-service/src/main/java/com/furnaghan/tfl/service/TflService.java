package com.furnaghan.tfl.service;

import com.furnaghan.tfl.service.config.ServiceConfiguration;
import com.furnaghan.tfl.service.store.ConnectionStore;
import com.furnaghan.tfl.service.store.JourneyStore;
import com.furnaghan.tfl.service.resources.JourneyResource;
import com.yammer.dropwizard.Service;
import com.yammer.dropwizard.config.Bootstrap;
import com.yammer.dropwizard.config.Environment;

import java.io.IOException;
import java.io.InputStream;
import java.util.zip.GZIPInputStream;

public class TflService extends Service<ServiceConfiguration> {

    public static void main(String[] args) throws Exception {
        new TflService().run(args);
    }

    @Override
    public void initialize(Bootstrap<ServiceConfiguration> bootstrap) {
        bootstrap.setName("tfl");
    }

    private ConnectionStore loadConnectionStore() throws IOException {
        try (final InputStream in = new GZIPInputStream(TflService.class.getResourceAsStream("/connections.json.gz"))) {
            return ConnectionStore.load(in);
        }
    }

    private JourneyStore loadJourneyStore() {
        return JourneyStore.load();
    }

    @Override
    public void run(ServiceConfiguration configuration, Environment environment) throws Exception {
        final ConnectionStore connectionStore = loadConnectionStore();
        final JourneyStore journeyStore = loadJourneyStore();

        final JourneyResource journeyResource = new JourneyResource(connectionStore, journeyStore);
        environment.addResource(journeyResource);

        // TODO: Remove this once we have persistence
        journeyResource.injest(TflService.class.getResourceAsStream("/journeys.csv"));
    }
}

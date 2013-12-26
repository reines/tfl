package com.furnaghan.tfl.service;

import com.furnaghan.tfl.service.auth.Principal;
import com.furnaghan.tfl.service.auth.TokenAuthProvider;
import com.furnaghan.tfl.service.auth.TokenAuthenticator;
import com.furnaghan.tfl.service.config.ServiceConfiguration;
import com.furnaghan.tfl.service.finder.RouteFinder;
import com.furnaghan.tfl.service.resources.JourneyResource;
import com.furnaghan.tfl.service.store.ConnectionStore;
import com.furnaghan.tfl.service.store.JourneyStore;
import com.yammer.dropwizard.Service;
import com.yammer.dropwizard.assets.AssetsBundle;
import com.yammer.dropwizard.config.Bootstrap;
import com.yammer.dropwizard.config.Environment;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class TflService extends Service<ServiceConfiguration> {

    public static void main(String[] args) throws Exception {
        new TflService().run(args);
    }

    @Override
    public void initialize(Bootstrap<ServiceConfiguration> bootstrap) {
        bootstrap.setName("tfl");
        bootstrap.addBundle(new AssetsBundle("/assets", "/", "index.html"));
    }

    private ConnectionStore loadConnectionStore() throws IOException {
        try (final InputStream in = TflService.class.getResourceAsStream("/assets/connections.json")) {
            return ConnectionStore.load(in);
        }
    }

    @Override
    public void run(ServiceConfiguration configuration, Environment environment) throws Exception {
        final ConnectionStore connectionStore = loadConnectionStore();
        final RouteFinder routeFinder = new RouteFinder(connectionStore);

        final JourneyStore journeyStore = JourneyStore.load();

        final TokenAuthenticator authenticator = new TokenAuthenticator();
        environment.addProvider(new TokenAuthProvider<Principal>(authenticator));

        final JourneyResource journeyResource = new JourneyResource(journeyStore, routeFinder);
        environment.addResource(journeyResource);

        // TODO: Remove this once we have persistence
        journeyResource.ingest(new Principal(1L), new FileInputStream("data/191013-081213.csv"));
    }
}

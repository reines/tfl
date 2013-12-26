package com.furnaghan.tfl.service.resources;

import com.furnaghan.tfl.service.auth.Principal;
import com.furnaghan.tfl.service.csv.JourneyReader;
import com.furnaghan.tfl.service.finder.RouteFinder;
import com.furnaghan.tfl.service.model.Journey;
import com.furnaghan.tfl.service.store.JourneyStore;
import com.yammer.dropwizard.auth.Auth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;

@Path("/journey")
public class JourneyResource {

    private static final Logger LOG = LoggerFactory.getLogger(JourneyResource.class);

    private final JourneyStore journeyStore;
    private final RouteFinder routeFinder;

    public JourneyResource(JourneyStore journeyStore, RouteFinder routeFinder) {
        this.journeyStore = journeyStore;
        this.routeFinder = routeFinder;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Journey> list(@Auth Principal principal) {
        return journeyStore.list(principal.getId());
    }

    @POST
    public void ingest(@Auth Principal principal, InputStream in) {
        try (final JourneyReader reader = new JourneyReader(in, routeFinder)) {
            journeyStore.addAll(principal.getId(), reader.readAll());
        }
        catch (IOException e) {
            LOG.warn("Failed to ingest csv", e);
            throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
        }
    }
}

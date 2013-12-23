package com.furnaghan.tfl.service.resources;

import com.furnaghan.tfl.service.csv.JourneyReader;
import com.furnaghan.tfl.service.store.ConnectionStore;
import com.furnaghan.tfl.service.store.JourneyStore;
import com.furnaghan.tfl.service.model.Journey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;

@Path("/api/journey")
public class JourneyResource {

    private static final Logger LOG = LoggerFactory.getLogger(JourneyResource.class);

    private final ConnectionStore connectionStore;
    private final JourneyStore journeyStore;

    public JourneyResource(ConnectionStore connectionStore, JourneyStore journeyStore) {
        this.connectionStore = connectionStore;
        this.journeyStore = journeyStore;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Journey> list() {
        return journeyStore.list();
    }

    @POST
    @Consumes("text/csv")
    public void injest(InputStream in) {
        try (final JourneyReader reader = new JourneyReader(in, connectionStore)) {
            journeyStore.addAll(reader.readAll());
        }
        catch (IOException e) {
            LOG.warn("Failed to injest csv", e);
            throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
        }
    }
}

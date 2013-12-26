package com.furnaghan.tfl.service.auth;

import com.google.common.base.Optional;
import com.google.common.base.Strings;
import com.sun.jersey.api.core.HttpContext;
import com.sun.jersey.server.impl.inject.AbstractHttpContextInjectable;
import com.yammer.dropwizard.auth.AuthenticationException;
import com.yammer.dropwizard.auth.Authenticator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

public class TokenAuthInjectable<T> extends AbstractHttpContextInjectable<T> {

    private static final Logger LOG = LoggerFactory.getLogger(TokenAuthInjectable.class);

    private final Authenticator<String, T> authenticator;

    public TokenAuthInjectable(Authenticator<String, T> authenticator) {
        this.authenticator = authenticator;
    }

    private Optional<T> getAuthenticateResult(String header) throws AuthenticationException {
        if (!Strings.isNullOrEmpty(header) && header.startsWith(TokenAuthProvider.SCHEMA)) {
            final String token = header.replace(TokenAuthProvider.SCHEMA, "").trim();
            return authenticator.authenticate(token);
        }

        return Optional.absent();
    }

    @Override
    public T getValue(HttpContext c) {
        final String header = c.getRequest().getHeaderValue(HttpHeaders.AUTHORIZATION);

        try {
            final Optional<T> result = this.getAuthenticateResult(header);
            if (result.isPresent()) {
                return result.get();
            }
        }
        catch (IllegalArgumentException e) {
            LOG.debug("Error decoding credentials", e);
            throw new WebApplicationException(e, Response.Status.BAD_REQUEST);
        }
        catch (AuthenticationException e) {
            LOG.warn("Error authenticating credentials", e);
            throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
        }

        throw new WebApplicationException(Response.Status.UNAUTHORIZED);
    }
}

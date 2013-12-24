package com.furnaghan.tfl.service.auth;

import com.google.common.base.Optional;
import com.yammer.dropwizard.auth.AuthenticationException;
import com.yammer.dropwizard.auth.Authenticator;

public class TokenAuthenticator implements Authenticator<String, Principal> {

    @Override
    public Optional<Principal> authenticate(String token) throws AuthenticationException {
        // TODO: translate token to ID
        return Optional.of(new Principal(1L));
    }
}

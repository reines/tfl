package com.furnaghan.tfl.service.auth;

import com.sun.jersey.api.model.Parameter;
import com.sun.jersey.core.spi.component.ComponentContext;
import com.sun.jersey.core.spi.component.ComponentScope;
import com.sun.jersey.spi.inject.Injectable;
import com.sun.jersey.spi.inject.InjectableProvider;
import com.yammer.dropwizard.auth.Auth;
import com.yammer.dropwizard.auth.Authenticator;

public class TokenAuthProvider<T> implements InjectableProvider<Auth, Parameter> {

    public static final String SCHEMA = "Token";

    private final Authenticator<String, T> authenticator;

    public TokenAuthProvider(Authenticator<String, T> authenticator) {
        this.authenticator = authenticator;
    }

    @Override
    public Injectable<?> getInjectable(ComponentContext ic, Auth a, Parameter c) {
        return new TokenAuthInjectable<T>(authenticator);
    }

    @Override
    public ComponentScope getScope() {
        return ComponentScope.PerRequest;
    }
}

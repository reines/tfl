package com.furnaghan.tfl.service.auth;

public class Principal {

    private final long id;

    public Principal(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }
}

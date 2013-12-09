package com.furnaghan.tfl.service;

import com.furnaghan.tfl.service.config.ServiceConfiguration;
import com.yammer.dropwizard.Service;
import com.yammer.dropwizard.config.Bootstrap;
import com.yammer.dropwizard.config.Environment;

public class TflService extends Service<ServiceConfiguration> {

    public static void main(String[] args) throws Exception {
        new TflService().run(args);
    }

    @Override
    public void initialize(Bootstrap<ServiceConfiguration> bootstrap) {
        bootstrap.setName("tfl");
    }

    @Override
    public void run(ServiceConfiguration configuration, Environment environment) throws Exception {

    }
}

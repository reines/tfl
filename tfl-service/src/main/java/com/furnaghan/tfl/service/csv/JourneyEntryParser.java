package com.furnaghan.tfl.service.csv;

import com.furnaghan.tfl.service.finder.RouteFinder;
import com.furnaghan.tfl.service.model.Journey;
import com.furnaghan.tfl.service.model.Station;
import com.furnaghan.tfl.service.util.path.Path;
import com.google.common.base.Optional;
import com.googlecode.jcsv.reader.CSVEntryParser;
import org.joda.money.CurrencyUnit;
import org.joda.money.Money;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JourneyEntryParser implements CSVEntryParser<Journey> {

    private static final int FIELD_DATE = 0;
    private static final int FIELD_START_TIME = 1;
    private static final int FIELD_END_TIME = 2;
    private static final int FIELD_ACTION = 3;
    private static final int FIELD_CHARGE = 4;
    private static final int FIELD_CREDIT = 5;
    private static final int FIELD_BALANCE = 6;
    private static final int FIELD_NOTE = 7;

    private static final Pattern ACTION_PATTERN = Pattern.compile("^(.+?)(?: \\[.+\\])? to (.+?)(?: \\[.+\\])?$");
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormat.forPattern("dd-MMM-yyyy HH:mm");
    private static final CurrencyUnit CURRENCY = CurrencyUnit.GBP;

    private static final Logger LOG = LoggerFactory.getLogger(JourneyEntryParser.class);

    private final RouteFinder routeFinder;

    private static DateTime parseDateTime(String date, String time) {
        return DateTime.parse(String.format("%s %s", date, time), DATE_FORMATTER);
    }

    private static Money parseMoney(String price) {
        return Money.parse(String.format("%s %s", CURRENCY, price));
    }

    public JourneyEntryParser(RouteFinder routeFinder) {
        this.routeFinder = routeFinder;
    }

    @Override
    public Journey parseEntry(String... data) {
        final Matcher matcher = ACTION_PATTERN.matcher(data[FIELD_ACTION]);
        if (!matcher.find()) {
            LOG.trace("Unable to match journey: {}", data[FIELD_ACTION]);
            return null;
        }

        final String startName = matcher.group(1);
        final String endName = matcher.group(2);

        final DateTime startTime = parseDateTime(data[FIELD_DATE], data[FIELD_START_TIME]);

        DateTime endTime = parseDateTime(data[FIELD_DATE], data[FIELD_END_TIME]);
        // If the end times before the start then presumably we went past midnight so increase the date
        if (endTime.isBefore(startTime)) {
            endTime = endTime.plusDays(1);
        }

        final Money charge = parseMoney(data[FIELD_CHARGE]);
        final String note = data[FIELD_NOTE];

        final Optional<Path<Station>> path = routeFinder.findPath(startName, endName);
        if (!path.isPresent()) {
            LOG.warn("Unable to find route from {} to {}", startName, endName);
            return null;
        }

        return new Journey(startTime, endTime, path.get(), charge, note);
    }
}

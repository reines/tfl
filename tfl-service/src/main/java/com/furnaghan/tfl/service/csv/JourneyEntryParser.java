package com.furnaghan.tfl.service.csv;

import com.furnaghan.tfl.service.model.Destination;
import com.furnaghan.tfl.service.model.Journey;
import com.furnaghan.tfl.service.model.Station;
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

    private static DateTime parseDateTime(String date, String time) {
        return DateTime.parse(String.format("%s %s", date, time), DATE_FORMATTER);
    }

    private static Money parseMoney(String price) {
        return Money.parse(String.format("%s %s", CURRENCY, price));
    }

    @Override
    public Journey parseEntry(String... data) {
        final Matcher matcher = ACTION_PATTERN.matcher(data[FIELD_ACTION]);
        if (!matcher.find()) {
            LOG.debug("Unable to match journey: {}", data[FIELD_ACTION]);
            return null;
        }

        final Station startStation = new Station(matcher.group(1));
        final DateTime startTime = parseDateTime(data[FIELD_DATE], data[FIELD_START_TIME]);

        // Read the end time, and if it's before the start then presumably we went past midnight so increase the date
        final Station endStation = new Station(matcher.group(2));
        DateTime endTime = parseDateTime(data[FIELD_DATE], data[FIELD_END_TIME]);
        if (endTime.isBefore(startTime)) {
            endTime = endTime.plusDays(1);
        }

        final Destination start = new Destination(startTime, startStation);
        final Destination end = new Destination(endTime, endStation);

        final Money charge = parseMoney(data[FIELD_CHARGE]);
        final String note = data[FIELD_NOTE];

        return new Journey(start, end, charge, note);
    }
}

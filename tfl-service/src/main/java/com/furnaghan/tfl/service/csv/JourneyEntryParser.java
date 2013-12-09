package com.furnaghan.tfl.service.csv;

import com.furnaghan.tfl.service.model.Destination;
import com.furnaghan.tfl.service.model.Journey;
import com.googlecode.jcsv.reader.CSVEntryParser;
import org.joda.money.CurrencyUnit;
import org.joda.money.Money;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class JourneyEntryParser implements CSVEntryParser<Journey> {

    private static final int FIELD_DATE = 0;
    private static final int FIELD_START_TIME = 1;
    private static final int FIELD_END_TIME = 2;
    private static final int FIELD_ACTION = 3;
    private static final int FIELD_CHARGE = 4;
    private static final int FIELD_CREDIT = 5;
    private static final int FIELD_BALANCE = 6;
    private static final int FIELD_NOTE = 7;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormat.forPattern("dd-MMM-yyyy HH:mm");
    private static final CurrencyUnit CURRENCY = CurrencyUnit.GBP;

    @Override
    public Journey parseEntry(String... data) {
        final DateTime start = DateTime.parse(String.format("%s %s", data[FIELD_DATE], data[FIELD_START_TIME]), DATE_FORMATTER);
        final DateTime end = DateTime.parse(String.format("%s %s", data[FIELD_DATE], data[FIELD_END_TIME]), DATE_FORMATTER);
        final Money charge = Money.parse(String.format("%s %s", CURRENCY, data[FIELD_CHARGE]));
        final Money credit = Money.parse(String.format("%s %s", CURRENCY, data[FIELD_CREDIT]));
        final Money balance = Money.parse(String.format("%s %s", CURRENCY, data[FIELD_BALANCE]));
        final String note = data[FIELD_NOTE];



        return new Journey(
                new Destination(start, ""),
                new Destination(end, ""),
                charge,
                note
        );
    }
}

package com.fasterxml.jackson.datatype.joda;

import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.fasterxml.jackson.datatype.joda.deser.*;
import com.fasterxml.jackson.datatype.joda.ser.*;
import org.joda.money.CurrencyUnit;
import org.joda.money.Money;
import org.joda.time.*;

public class JodaModule extends SimpleModule
{
    public JodaModule()
    {
        super(ModuleVersion.instance.version());
        // first deserializers
        addDeserializer(DateMidnight.class, new DateMidnightDeserializer());
        addDeserializer(DateTime.class, DateTimeDeserializer.forType(DateTime.class));
        addDeserializer(Duration.class, new DurationDeserializer());
        addDeserializer(Instant.class, new InstantDeserializer());
        addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer());
        addDeserializer(LocalDate.class, new LocalDateDeserializer());
        addDeserializer(LocalTime.class, new LocalTimeDeserializer());
        addDeserializer(Period.class, new PeriodDeserializer());
        addDeserializer(ReadableDateTime.class, DateTimeDeserializer.forType(ReadableDateTime.class));
        addDeserializer(ReadableInstant.class, DateTimeDeserializer.forType(ReadableInstant.class));
        addDeserializer(Interval.class, new IntervalDeserializer());

        addDeserializer(CurrencyUnit.class, new CurrencyUnitDeserializer());
        addDeserializer(Money.class, new MoneyDeserializer());

        // then serializers:
        addSerializer(DateMidnight.class, new DateMidnightSerializer());
        addSerializer(DateTime.class, new DateTimeSerializer());
        addSerializer(Duration.class, new DurationSerializer());
        addSerializer(Instant.class, new InstantSerializer());
        addSerializer(LocalDateTime.class, new LocalDateTimeSerializer());
        addSerializer(LocalDate.class, new LocalDateSerializer());
        addSerializer(LocalTime.class, new LocalTimeSerializer());
        addSerializer(Period.class, ToStringSerializer.instance);
        addSerializer(Interval.class, new IntervalSerializer());

        addSerializer(CurrencyUnit.class, new CurrencyUnitSerializer());
        addSerializer(Money.class, new MoneySerializer());
    }
}
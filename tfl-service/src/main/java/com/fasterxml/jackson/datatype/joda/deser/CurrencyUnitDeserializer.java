package com.fasterxml.jackson.datatype.joda.deser;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.joda.money.CurrencyUnit;

import java.io.IOException;

public class CurrencyUnitDeserializer extends JsonDeserializer<CurrencyUnit> {

    @Override
    public CurrencyUnit deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        return CurrencyUnit.of(jp.getText());
    }
}

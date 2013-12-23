package com.fasterxml.jackson.datatype.joda.ser;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.joda.money.CurrencyUnit;

import java.io.IOException;

public class CurrencyUnitSerializer extends JsonSerializer<CurrencyUnit> {

	@Override
	public void serialize(CurrencyUnit value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
		jgen.writeString(value.getCurrencyCode());
	}
}

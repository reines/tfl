package com.fasterxml.jackson.datatype.joda.deser;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.joda.money.Money;

import java.io.IOException;

public class MoneyDeserializer extends JsonDeserializer<Money> {

	@Override
	public Money deserialize(JsonParser parser, DeserializationContext context) throws IOException {
		String text = parser.getText();
		return Money.parse(text);
	}
}

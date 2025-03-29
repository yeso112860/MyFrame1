package tr.org.turksat.common.util;

import com.google.gson.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GsonUtil {

    public static Gson localDateAdapterluGsonGetir() {
        return new GsonBuilder().registerTypeAdapter(LocalDate.class,
                        (JsonSerializer<LocalDate>) (localDate, type, context)
                                -> new JsonPrimitive(localDate.format(DateTimeFormatter.ISO_LOCAL_DATE)))
                .registerTypeAdapter(LocalDate.class,
                        (JsonDeserializer<LocalDate>) (jsonElement, type, context)
                                -> LocalDate.parse(jsonElement.getAsString(), DateTimeFormatter.ISO_LOCAL_DATE))
                .registerTypeAdapter(LocalTime.class,
                        (JsonSerializer<LocalTime>) (localTime, type, context)
                                -> new JsonPrimitive(localTime.format(DateTimeFormatter.ISO_LOCAL_TIME)))
                .registerTypeAdapter(LocalTime.class,
                        (JsonDeserializer<LocalTime>) (jsonElement, type, context)
                                -> LocalTime.parse(jsonElement.getAsString(), DateTimeFormatter.ISO_LOCAL_TIME))
                .registerTypeAdapter(LocalDateTime.class,
                        (JsonSerializer<LocalDateTime>) (localTime, type, context)
                                -> new JsonPrimitive(localTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)))
                .registerTypeAdapter(LocalDateTime.class,
                        (JsonDeserializer<LocalDateTime>) (jsonElement, type, context)
                                -> LocalDateTime.parse(jsonElement.getAsString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .registerTypeAdapter(ZonedDateTime.class,
                        (JsonSerializer<ZonedDateTime>) (zonedDateTime, type, context)
                                -> new JsonPrimitive(zonedDateTime.format(DateTimeFormatter.ISO_ZONED_DATE_TIME)))
                .registerTypeAdapter(ZonedDateTime.class,
                        (JsonDeserializer<ZonedDateTime>) (jsonElement, type, context)
                                -> ZonedDateTime.parse(jsonElement.getAsString(), DateTimeFormatter.ISO_ZONED_DATE_TIME))
                .create();
    }
}

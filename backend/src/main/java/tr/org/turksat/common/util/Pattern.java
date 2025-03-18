package tr.org.turksat.common.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor(access =  AccessLevel.PRIVATE)
public class Pattern {
    public static final String ISO_LOCAL_DATE = "yyyy-MM-dd";
    public static final String ISO_LOCAL_DATE_WITH_SLASH = "yyyy/MM/dd";
    public static final String BASIC_ISO_DATE = "yyyyMMdd";
    public static final String YIL_AY_GUN_SAAT_DAKIKA_SANIYE_SALISE = "yyyy-MM-dd HH:mm:ss.SSS";

    public static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public static final  DateTimeFormatter INPUT_FORMATTER1 = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSSSSSS");

    public static DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm");

    public static final SimpleDateFormat KEYCLOAK_DATE_FORMAT =  new SimpleDateFormat("yyyy-MM-dd HH:mm");

}
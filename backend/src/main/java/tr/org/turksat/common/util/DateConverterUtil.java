package tr.org.turksat.common.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Objects;

@NoArgsConstructor(access =  AccessLevel.PRIVATE)
public class DateConverterUtil {

    public static String isoLocalDateToIsoLocalDateWithSlash(LocalDate tarih){
        Objects.requireNonNull(tarih, "tarih");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(Pattern.ISO_LOCAL_DATE_WITH_SLASH);
        return formatter.format(tarih);
    }

    public static LocalDate toLocalDateWithPattern(String tarih, String pattern){
        Objects.requireNonNull(tarih, "tarih");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return LocalDate.parse(tarih, formatter);
    }

    public static boolean isTimeDiffLessThan1Year(LocalDateTime dateTime1, LocalDateTime dateTime2) {
        long years = ChronoUnit.YEARS.between(dateTime1, dateTime2);
        return years < 1;
    }

    public static String timestampToString(long timestamp) {
        // Convert timestamp to LocalDateTime
        LocalDateTime localDateTime = Instant.ofEpochMilli(timestamp).atZone(ZoneId.systemDefault()).toLocalDateTime();
        // Format the LocalDateTime using the formatter
        return  localDateTime.format(Pattern.DATE_TIME_FORMATTER);
    }

    public static String timeStringToString(String timeString) {
        try { //"2024-10-17T13:35:30.136833500";
            LocalDateTime dateTime = LocalDateTime.parse(timeString, Pattern.DATE_TIME_FORMATTER);
            return dateTime.format(Pattern.DATE_TIME_FORMATTER);
        }catch (Exception e){
            return timeString;
        }
    }

    public static String timeStringToString(String dateStr, DateTimeFormatter inputFormatter) {
        try {
            // İlk formatı kullanarak LocalDateTime nesnesi oluştur
            LocalDateTime dateTime = LocalDateTime.parse(dateStr, inputFormatter);
            // İstenen formatta string'e çevir
            return dateTime.format(Pattern.DATE_TIME_FORMATTER);
        } catch (Exception e) {
            return dateStr;
        }
    }

    public static Long convertToTimestamp(String dateString, SimpleDateFormat inputFormatter) {
        try {
            Date date = inputFormatter.parse(dateString);
            return date.getTime(); // Timestamp olarak milisaniye
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String convertDateStrToAnotherDateStr(String dateString, SimpleDateFormat inputFormatter, SimpleDateFormat outputFormatter) {
        try {
            Date date = inputFormatter.parse(dateString);
            return outputFormatter.format(date );
        } catch (ParseException e) {
            e.printStackTrace();
            return "dateString";
        }
    }

    public static String convertDatetoStr(Date date,SimpleDateFormat outputFormatter){
        return outputFormatter.format(date );
    }

}
package tr.org.turksat.common.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DateCheckerUtil {

    public static boolean tarihIleriTarihliMi(LocalDate tarih) {
        Objects.requireNonNull(tarih, "tarih");
        return (tarih.isAfter(LocalDate.now()));
    }

    public static boolean baslangicBitistenIleriMi(LocalDate baslangic, LocalDate bitis) {
        Objects.requireNonNull(baslangic, "baslangic");
        Objects.requireNonNull(bitis, "bitis");

        return (baslangic.isAfter(bitis));
    }

    public static boolean tarihZamanSuanveIleriMi(LocalDateTime localDateTime) {
        Objects.requireNonNull(localDateTime, "localDateTime");
        return (!localDateTime.isBefore(LocalDateTime.now()));
    }

    public static boolean tarihZamanIleriMi(LocalDateTime localDateTime) {
        Objects.requireNonNull(localDateTime, "localDateTime");
        return (localDateTime.isAfter(LocalDateTime.now()));
    }

    public static boolean tarihZamanGeriMi(LocalDateTime localDateTime) {
        Objects.requireNonNull(localDateTime, "localDateTime");
        return (localDateTime.isBefore(LocalDateTime.now()));
    }
}
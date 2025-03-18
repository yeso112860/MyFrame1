package tr.org.turksat.aop.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MessageConstant {
    public static final String LOG0001 = "log.hata.olustu";
    public static final String LOG0002 = "log.isleme.yetki.yok";
    public static final String LOG0003 = "log.yetki.hatasi";
    public static final String LOG0004 = "log.dosya.boyutu.hatasi";
    public static final String MESSAGE_NOT_FOUND = "!!!MESSAGE NOT FOUND!!!";
}
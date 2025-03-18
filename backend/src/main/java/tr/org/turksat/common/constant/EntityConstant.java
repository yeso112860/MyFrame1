package tr.org.turksat.common.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EntityConstant {
    public static final String DURUM = "silindi";
    public static final String ID = "id";
    public static final String VERSION = "versiyon";

    public static final boolean DURUM_AKTIF = false;
//    public static final short DURUM_PASIF = 0;
    public static final boolean DURUM_SILINDI = true;
}
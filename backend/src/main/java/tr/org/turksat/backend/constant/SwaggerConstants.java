package tr.org.turksat.backend.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SwaggerConstants {

    public static final String EXPORT = " Export Endpointi";

    public static final String REPORT = "Rapor Endpointi";
    public static final String TAG_KATALOG = "katalog";
    public static final String OPERATION_KATALOG_TUM_KATALOG_GETIR = "tum.katalog.getirme";
    public static final String OPERATION_KATALOG_AKTIF_KATALOG_GETIR = "aktif.katalog.getirme.endpointi";
    public static final String OPERATION_KATALOG_EKLE = "katalog.ekleme.endpointi";
    public static final String OPERATION_KATALOG_GUNCELLE = "katalog.guncelleneme.endpointi";
    public static final String OPERATION_KATALOG_DELETE = "katalog.silme.endpointi";
    public static final String OPERATION_KATALOG_KATALOG_GETIR = "katalog.getirme.endpointi";

    public static final String TAG_TEMA = "tema";
    public static final String OPERATION_TEMA_TUM_TEMA_GETIR = "tum.tema.getirme.endpointi";
    public static final String OPERATION_TEMA_AKTIF_TEMA_GETIR = "aktif.tema.getirme.endpointi";
    public static final String OPERATION_TEMA_TEMA_GETIR = "tema.getirme.endpointi";
    public static final String OPERATION_TEMA_EKLE = "tema.ekleme.endpointi";
    public static final String OPERATION_TEMA_GUNCELLE = "tema.guncelleme.endpointi";
    public static final String OPERATION_TEMA_DELETE = "tema.silme.endpointi";

    public static final String TAG_ALTTEMA = "alt.tema";
    public static final String OPERATION_ALTTEMA_TUM_ALTTEMA_GETIR = "tum.alt.tema.getirme.endpointi";
    public static final String OPERATION_ALTTEMA_EKLE = "alt.tema.ekleme.endpointi";
    public static final String OPERATION_ALTTEMA_GUNCELLE = "alt.tema.guncelleme.endpointi";
    public static final String OPERATION_ALTTEMA_DELETE = "alt.tema.silme.endpointi";
    public static final String OPERATION_ALTTEMA_ALTTEMA_GETIR = "alt.tema.getirme.endpointi";
    public static final String OPERATION_ALTTEMA_TEMA_ALTTEMA_GETIR = "temaya.gore.alt.tema.getirme.endpointi";
    public static final String OPERATION_ALTTEMA_EXPORT = "alt.tema.export.endpointi";

    public static final String TAG_KATMAN = "katman";
    public static final String OPERATION_KATMAN_KATMAN_GETIR = "katman.getirme.endpointi";
    public static final String OPERATION_KATMAN_TUM_KATMAN_GETIR = "tum.katman.getirme.endpointi";
    public static final String OPERATION_KATMAN_AKTIF_KATMAN_GETIR = "aktif.katman.getirme.endpointi";
    public static final String OPERATION_KATMAN_EKLE = "katman.ekleme.endpointi";
    public static final String OPERATION_KATMAN_GUNCELLE = "katman.guncelleme.endpointi";
    public static final String OPERATION_KATMAN_DELETE = "katman.silme.endpointi";
    public static final String OPERATION_KATMAN_ALTTEMA_KATMAN_GETIR = "alt.temaya.gore.katman.getirme.endpointi";
    public static final String OPERATION_KATMAN_MATRIS_KURUM_GETIR = "kuruma.gore.katman.getirme.endpointi";

    public static final String TAG_OZNITELIK = "oznitelik";
    public static final String OPERATION_OZNITELIK_OZNITELIK_GETIR = "oznitelik.getirme.endpointi";
    public static final String OPERATION_OZNITELIK_TUM_OZNITELIK_GETIR = "tum.oznitelik.getirme.endpointi";
    public static final String OPERATION_OZNITELIK_EKLE = "oznitelik.ekleme.endpointi";
    public static final String OPERATION_OZNITELIK_DELETE = "oznitelik.silme.endpointi";
    public static final String OPERATION_OZNITELIK_GUNCELLE = "oznitelik.guncelleme.endpointi";
    public static final String OPERATION_OZNITELIK_KATMAN_OZNITELIK_GETIR = "katmana.gore.oznitelik.getirme.endpointi";
    public static final String OPERATION_OZNITELIK_TIPTANIMI_OZNITELIK_GETIR = "tip.tanimina.gore.oznitelik.getirme.endpointi";

    public static final String TAG_KATMAN_OZNITELIK_TIP_TANIM_DEGER = "katman.oznitelik.tip.tanimi.deger.getirme.endpointi";
    public static final String OPERATION_KATMAN_OZNITELIK_TIP_TANIM_DEGER_TUM_GETIR = "tum.katman.oznitelik.tip.tanimi.deger.getirme.endpointi";
    public static final String OPERATION_KATMAN_OZNITELIK_TIP_TANIM_DEGER_IDYE_GORE_GETIR = "idye.gore.katman.oznitelik.tip.tanimi.deger.getirme.endpointi";
    public static final String OPERATION_KATMAN_OZNITELIK_TIP_TANIM_DEGER_EKLE = "katman.oznitelik.tip.tanimi.deger.ekleme.endpointi";
    public static final String OPERATION_KATMAN_OZNITELIK_TIP_TANIM_DEGER_GUNCELLE = "secili.katman.oznitelik.tip.tanimi.deger.guncelleme.endpointi";
    public static final String OPERATION_KATMAN_OZNITELIK_TIP_TANIM_DEGER_DELETE = "katman.oznitelik.tip.tanimi.deger.silme.endpointi";

    public static final String TAG_TIPTANIMI = "katman.oznitelik.tip.tanimi";
    public static final String OPERATION_TIPTANIMI_TIPTANIMI_GETIR = "tip.tanimi.getirme.endpointi";
    public static final String OPERATION_TIPTANIMI_TUM_TIPTANIMI_GETIR = "tum.tip.tanimi.getirme.endpointi";
    public static final String OPERATION_TIPTANIMI_EKLE = "tip.tanimi.ekleme.endpointi";
    public static final String OPERATION_TIPTANIMI_DELETE = "tip.tanimi.silme.endpointi";
    public static final String OPERATION_TIPTANIMI_TEMA_TIPTANIMI_GETIR = "temaya.gore.tip.tanimi.getirme.endpointi";
    public static final String OPERATION_TIPTANIMI_KATMAN_TIPTANIMI_GETIR = "katmana.gore.tip.tanimi.getirme.endpointi";
    public static final String OPERATION_TIPTANIMI_GUNCELLE = "oznitelige.gore.tip.tanimi.guncelleme.endpointi";

    public static final String TAG_METAVERIDIL = "metaveri.dil";
    public static final String OPERATION_METAVERIDIL_ID_GORE_METAVERIDIL_GETIR = "metaveri.dil.idye.gore.getirme.endpointi";
    public static final String OPERATION_METAVERIDIL_TUM_METAVERIDIL_GETIR = "tum.metaveri.dil.getirme.endpointi";
    public static final String OPERATION_METAVERIDIL_EKLE = "metaveri.dil.ekleme.endpointi";
    public static final String OPERATION_METAVERIDIL_GUNCELLE = "metaveri.dil.guncelleme.endpointi";
    public static final String OPERATION_METAVERIDIL_DELETE = "metaveri.dil.silme.endpointi";

    public static final String TAG_DUYURU = "duyuru";
    public static final String OPERATION_DUYURU_TUM_DUYURU_GETIR = "tum.duyurulari.getirme.endpointi";
    public static final String OPERATION_DUYURU_IDYE_GORE_GETIR = "idye.gore.duyurulari.getirme.endpointi";
    public static final String OPERATION_DUYURU_EKLE = "duyuru.ekleme.endpointi";
    public static final String OPERATION_DUYURU_GUNCELLE = "secili.duyuru.guncelleme.endpointi";
    public static final String OPERATION_DUYURU_DELETE = "duyuru.silme.endpointi";

    public static final String TAG_ANAHTAR_KELIME = "anahtar.kelime";
    public static final String OPERATION_ANAHTAR_KELIME_TUM_ANAHTAR_KELIME_GETIR = "tum.anahtar.kelimeleri.getirme.endpointi";
    public static final String OPERATION_ANAHTAR_KELIME_IDYE_GORE_GETIR = "idye.gore.anahtar.kelime.getirme.endpointi";
    public static final String OPERATION_ANAHTAR_KELIME_EKLE = "anahtar.kelime.ekleme.endpointi";
    public static final String OPERATION_ANAHTAR_KELIME_GUNCELLE = "secili.anahtar.kelime.guncelleme.endpointi";
    public static final String OPERATION_ANAHTAR_KELIME_DELETE = "anahtar.kelime.silme.endpointi";
    public static final String OPERATION_ANAHTARKELIME_TEMA_GETIR = "tema.idye.gore.anahtar.kelime.getirme.endpointi";

    public static final String TAG_METAVERIERISIMKISITSART = "metaveri.erisim.kisit.sart";
    public static final String OPERATION_METAVERIERISIMKISITSART_ID_GORE_METAVERIERISIMKISITSART_GETIR = "idye.gore.metaveri.erisim.kisit.sart.getirme.endpointi";
    public static final String OPERATION_METAVERIERISIMKISITSART_TUM_METAVERIERISIMKISITSART_GETIR = "tum.metaveri.erisim.kisit.sart.getirme.endpointi";
    public static final String OPERATION_METAVERIERISIMKISITSART_EKLE = "metaveri.erisim.kisit.sart.ekleme.endpointi";
    public static final String OPERATION_METAVERIERISIMKISITSART_GUNCELLE = "metaveri.erisim.kisit.sart.guncelleme.endpointi";
    public static final String OPERATION_METAVERIERISIMKISITSART_DELETE = "metaveri.erisim.kisit.sart.silme.endpointi";

    public static final String TAG_KOD = "kod";
    public static final String OPERATION_KOD_ID_GORE_KOD_GETIR = "idye.gore.kod.getirme.endpointi";
    public static final String OPERATION_KODTIPI_ID_GORE_KOD_GETIR = "kod.tipi.idye.gore.kod.getirme.endpointi";
    public static final String OPERATION_KODTIPI_ID_LIST_GORE_KOD_LIST_GETIR = "kod.tipi.id.listesine.gore.kod.listesi.getirme.endpointi";
    public static final String OPERATION_DIL_LIST = "dil.list.getirme.endpointi";
    public static final String OPERATION_KOD_LIST = "kod.list.getirme.endpointi";
    public static final String OPERATION_ORGANIZASYON_ROLE_LIST = "organizasyon.rol.getirme.endpointi";
    public static final String OPERATION_ALT_TEMA_LIST = "alttema.list.getirme.endpointi";
    public static final String OPERATION_TEMA_LIST = "tema.list.getirme.endpointi";
    public static final String OPERATION_KATMAN_LIST = "katman.list.getirme.endpointi";
    public static final String OPERATION_ERISIM_SART_LIST = "erisim.sart.list.getirme.endpointi";
    public static final String OPERATION_UCV_USUL_TIPI = "ucv.usul.tipi.getirme.endpointi";
    public static final String OPERATION_KOD_TUM_KOD_GETIR = "tum.kod.getirme.endpointi";
    public static final String OPERATION_KOD_EKLE = "kod.ekleme.endpointi";
    public static final String OPERATION_KOD_GUNCELLE = "kod.guncelleme.endpointi";
    public static final String OPERATION_KOD_DELETE = "kod.silme.endpointi";

    public static final String TAG_KODTIPI = "kod.tipi";
    public static final String OPERATION_KODTIPI_ID_GORE_KODTIPI_GETIR = "idye.gore.kod.tipi.getirme.endpointi";
    public static final String OPERATION_KODTIPI_TUM_KODTIPI_GETIR = "tum.kod.tipi.getirme.endpointi";
    public static final String OPERATION_KODTIPI_EKLE = "kod.tipi.ekleme.endpointi";
    public static final String OPERATION_KODTIPI_GUNCELLE = "kod.tipi.guncelleme.endpointi";
    public static final String OPERATION_KODTIPI_DELETE = "kod.tipi.silme.endpointi";

    public static final String TAG_SISTEMAYARI = "sistem.ayari";
    public static final String OPERATION_SISTEMAYARI_ID_GORE_SISTEMAYARI_GETIR = "idye.gore.sistem.ayari.getirme.endpointi";
    public static final String OPERATION_SISTEMAYARI_TUM_SISTEMAYARI_GETIR = "tum.sistem.ayari.getirme.endpointi";
    public static final String OPERATION_SISTEMAYARI_EKLE = "sistem.ayari.ekleme.endpointi";
    public static final String OPERATION_SISTEMAYARI_GUNCELLE = "sistem.ayari.guncelleme.endpointi";
    public static final String OPERATION_SISTEMAYARI_DELETE = "sistem.ayari.silme.endpointi";

    public static final String TAG_ROL = "rol";
    public static final String OPERATION_ROL_TUM_ROL_GETIR = "tum.rollari.getirme.endpointi";
    public static final String OPERATION_ROL_IDYE_GORE_GETIR = "idye.gore.rollari.getirme.endpointi";
    public static final String OPERATION_ROL_EKLE = "rol.ekleme.endpointi";
    public static final String OPERATION_ROL_GUNCELLE = "secili.rol.guncelleme.endpointi";
    public static final String OPERATION_ROL_DELETE = "rol.silme.endpointi";
    public static final String OPERATION_ROL_EXPORT = "rol.export.endpointi";

    public static final String TAG_KULLANICI_OTURUM_YONETIMI = "kullanici.oturum.yonetimi";
    public static final String OPERATION_KULLANICI_OTURUM_YONETIMI_TUM_ROL_GETIR = "tum.kullanici.oturum.yonetimi.getirme.endpointi";
    public static final String OPERATION_KULLANICI_OTURUM_YONETIMI_IDYE_GORE_GETIR = "idye.gore.kullanici.oturum.yonetimi.getirme.endpointi";
    public static final String OPERATION_KULLANICI_OTURUM_YONETIMI_EKLE = "kullanici.oturum.yonetimi.ekleme.endpointi";

    public static final String TAG_TASK = "favori";
    public static final String OPERATION_TASK_TUM_TASK_GETIR = "tum.favorileri.getirme.endpointi";
    public static final String OPERATION_TASK_IDYE_GORE_GETIR = "idye.gore.favorileri.getirme.endpointi";
    public static final String OPERATION_TASK_EKLE = "favori.ekleme.endpointi";
    public static final String OPERATION_TASK_GUNCELLE = "secili.favori.guncelleme.endpointi";
    public static final String OPERATION_TASK_DELETE = "favori.silme.endpointi";
    public static final String OPERATION_TASK_DIS_IDYE_GORE_SILME = "harici.idye.gore.favori.silme.endpointi";

    public static final String TAG_ALTLIK_HARITA_SERVISLERI = "altlik.harita.servisleri";
    public static final String OPERATION_ALTLIK_HARITA_SERVISLERI_TUM_ALTLIK_HARITA_SERVISLERI_GETIR = "tum.altlik.harita.servisleri.getirme.endpointi";
    public static final String OPERATION_ALTLIK_HARITA_SERVISLERI_IDYE_GORE_GETIR = "idye.gore.altlik.harita.servisleri.getirme.endpointi";
    public static final String OPERATION_ALTLIK_HARITA_SERVISLERI_EKLE = "altlik.harita.servisleri.ekleme.endpointi";
    public static final String OPERATION_ALTLIK_HARITA_SERVISLERI_GUNCELLE = "secili.altlik.harita.servisleri.guncelleme.endpointi";
    public static final String OPERATION_ALTLIK_HARITA_SERVISLERI_DELETE = "altlik.harita.servisleri.silme.endpointi";

    public static final String TAG_METAVERI_ORGANIZASYON_ROL = "metaveri.organizasyon.rol";
    public static final String OPERATION_METAVERI_ORGANIZASYON_ROL_TUM_METAVERI_ORGANIZASYON_ROL_GETIR = "tum.metaveri.organizasyon.rolleri.getirme.endpointi";
    public static final String OPERATION_METAVERI_ORGANIZASYON_ROL_IDYE_GORE_GETIR = "idye.gore.metaveri.organizasyon.rolleri.getirme.endpointi";
    public static final String OPERATION_METAVERI_ORGANIZASYON_ROL_EKLE = "metaveri.organizasyon.rol.ekleme.endpointi";
    public static final String OPERATION_METAVERI_ORGANIZASYON_ROL_GUNCELLE = "secili.metaveri.organizasyon.rol.guncelleme.endpointi";
    public static final String OPERATION_METAVERI_ORGANIZASYON_ROL_DELETE = "metaveri.organizasyon.rol.silme.endpointi";

    public static final String TAG_SISTEM_DOSYA = "sistem.dosya";
    public static final String OPERATION_SISTEM_DOSYA_TUM_SISTEM_DOSYA_GETIR = "tum.sistem.dosya.getirme.endpointi";
    public static final String OPERATION_SISTEM_DOSYA_IDYE_GORE_GETIR = "idye.gore.sistem.dosya.getirme.endpointi";
    public static final String OPERATION_SISTEM_DOSYA_EKLE = "sistem.dosya.ekleme.endpointi";
    public static final String OPERATION_SISTEM_DOSYA_GUNCELLE = "secili.sistem.dosya.guncelleme.endpointi";
    public static final String OPERATION_SISTEM_DOSYA_DELETE = "sistem.dosya.silme.endpointi";

    public static final String TAG_STATIKIP = "statik.ip";
    public static final String OPERATION_STATIKIP_TUM_STATIKIP_GETIR = "tum.statik.ip.getirme.endpointi";
    public static final String OPERATION_STATIKIP_IDYE_GORE_GETIR = "idye.gore.statik.ip.getirme.endpointi";
    public static final String OPERATION_STATIKIP_EKLE = "statik.ip.ekleme.endpointi";
    public static final String OPERATION_STATIKIP_GUNCELLE = "secili.statik.ip.guncelleme.endpointi";
    public static final String OPERATION_STATIKIP_DELETE = "statik.ip.silme.endpointi";

    public static final String TAG_KURUMFIRMAYETKILI = "kurum.firma.yetkili";
    public static final String OPERATION_KURUMFIRMAYETKILI_ID_GORE_KURUMFIRMAYETKILI_GETIR = "idye.gore.kurum.firma.yetkili.getirme.endpointi";
    public static final String OPERATION_KURUMFIRMAYETKILI_TUM_KURUMFIRMAYETKILI_GETIR = "tum.kurum.firma.yetkili.getirme.endpointi";
    public static final String OPERATION_KURUMFIRMAYETKILI_YETKI_BASVURU_LIST_GETIR = "tum.kurum.firma.yetkili.yetki.basvurulari.getirme.endpointi";
    public static final String OPERATION_KURUMFIRMAYETKILI_EKLE = "kurum.firma.yetkili.ekleme.endpointi";
    public static final String OPERATION_KURUMFIRMAYETKILI_GUNCELLE = "kurum.firma.yetkili.guncelleme.endpointi";
    public static final String OPERATION_KURUMFIRMAYETKILI_DELETE = "kurum.firma.yetkili.silme.endpointi";

    public static final String TAG_VERI_KALITESI_OGESI = "veri.kalitesi.ogesi";
    public static final String VERI_KALITESI_OGESI_EXPORT = "veri.kalitesi.ogesi.export.endpointi";
    public static final String OPERATION_VERI_KALITESI_OGESI_ID_GORE_VERI_KALITESI_OGESI_GETIR = "idye.gore.veri.kalitesi.ogesi.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_OGESI_TUM_VERI_KALITESI_OGESI_GETIR = "tum.veri.kalitesi.ogesi.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_OGESI_EKLE = "veri.kalitesi.ogesi.ekleme.endpointi";
    public static final String OPERATION_VERI_KALITESI_OGESI_GUNCELLE = "veri.kalitesi.ogesi.guncelleme.endpointi";
    public static final String OPERATION_VERI_KALITESI_OGESI_DELETE = "veri.kalitesi.ogesi.silme.endpointi";

    public static final String TAG_VERI_KALITESI_ALT_OGESI = "veri.kalitesi.alt.ogesi";
    public static final String OPERATION_VERI_KALITESI_OGESI_ID_GORE_VERI_KALITESI_ALT_OGESI_GETIR = "veri.kalitesi.idye.gore.alt.ogesi.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_ALT_OGESI_ID_GORE_VERI_KALITESI_ALT_OGESI_GETIR = "idye.gore.veri.kalitesi.alt.ogesi.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_ALT_OGESI_TUM_VERI_KALITESI_ALT_OGESI_GETIR = "tum.veri.kalitesi.alt.ogesi.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_ALT_OGESI_EKLE = "veri.kalitesi.alt.ogesi.ekleme.endpointi";
    public static final String OPERATION_VERI_KALITESI_ALT_OGESI_GUNCELLE = "veri.kalitesi.alt.ogesi.guncelleme.endpointi";
    public static final String OPERATION_VERI_KALITESI_ALT_OGESI_DELETE = "veri.kalitesi.alt.ogesi.silme.endpointi";
    public static final String OPERATION_VERI_KALITESI_ALT_OGESI_EXPORT = "veri.kalitesi.alt.ogesi.export.endpointi";

    public static final String TAG_VERI_KALITESI_DEGER = "veri.kalitesi.deger";
    public static final String OPERATION_VERI_KALITESI_DEGER_ID_GORE_VERI_KALITESI_DEGER_GETIR = "idye.gore.veri.kalitesi.deger.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_DEGER_TUM_VERI_KALITESI_DEGER_GETIR = "tum.veri.kalitesi.deger.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_DEGER_EKLE = "veri.kalitesi.deger.ekleme.endpointi";
    public static final String OPERATION_VERI_KALITESI_DEGER_GUNCELLE = "veri.kalitesi.deger.guncelleme.endpointi";
    public static final String OPERATION_VERI_KALITESI_DEGER_DELETE = "veri.kalitesi.deger.silme.endpointi";
    public static final String OPERATION_VERI_KALITESI_DEGER_EXPORT = "veri.kalitesi.deger.export.endpointi";

    public static final String TAG_VERI_KALITESI_TEMA = "veri.kalitesi.tema";
    public static final String OPERATION_VERI_KALITESI_TEMA_TEMA_ID_GORE_VERI_KALITESI_TEMA_GETIR = "tema.idye.gore.veri.kalitesi.temasi.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_TEMA_TEMA_ID_GORE_VERI_KALITESI_TEMA_DETAY_GETIR = "tema.idye.gore.veri.kalitesi.tema.detay.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_ALT_OGESI_ID_GORE_VERI_KALITESI_TEMA_GETIR = "veri.kalitesi.alt.ogesi.idye.gore.veri.kalitesi.temasi.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_TEMA_ID_GORE_VERI_KALITESI_TEMA_GETIR = "veri.kalitesi.tema.idye.gore.veri.kalitesi.temasi.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_TEMA_TUM_VERI_KALITESI_TEMA_GETIR = "tum.veri.kalitesi.temasi.getirme.endpointi";
    public static final String OPERATION_VERI_KALITESI_TEMA_EKLE = "veri.kalitesi.temasi.ekleme.endpointi";
    public static final String OPERATION_VERI_KALITESI_TEMA_GUNCELLE = "veri.kalitesi.temasi.guncelleme.endpointi";
    public static final String OPERATION_VERI_KALITESI_TEMA_DELETE = "veri.kalitesi.temasi.silme.endpointi";
    public static final String OPERATION_VERI_KALITESI_TEMA_EXPORT = "veri.kalitesi.temasi.export.endpointi";

    public static final String TAG_UCVSORUMLULUKMATRISI = "ulusal.cografi.veri.sorumluluk.matrisi";

    public static final String TAG_UCVPAYLASIMMATRISI = "ulusal.cografi.veri.paylasim.matrisi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_TUM_UCVPAYLASIMMATRISI_GETIR = "tum.ucvpm.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_KATMAN_GORE_UCVPAYLASIMMATRISI_GETIR = "katman.idyle.ucvpm.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_ID_GORE_UCVPAYLASIMMATRISI_GETIR = "idyle.ucvpm.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_CLIENT_ID_GORE_UCVPAYLASIMMATRISI_GETIR = "client.idyle.ucvpm.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_EKLE = "ucvpm.ekleme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_DELETE = "ucvpm.silme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_GUNCELLE = "ucvpm.guncelleme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_KOPYALA = "ucvpm.kopyalama.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_ONAY_DURUMU_GUNCELLE = "ucvpm.onay.durumu.guncelleme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISI_ONAY_DURUMU_GETIR = "ucvpm.onay.durumu.getirme.endpointi";

    public static final String OPERATION_UCVPAYLASIMMATRISI_REPORT = "ucvpm.report";
    public static final String TAG_UCVPAYLASIMMATRISIBIRIM = "ulusal.cografi.veri.paylasim.matrisi.birim";
    public static final String OPERATION_UCVPAYLASIMMATRISIBIRIM_TUM_UCVPAYLASIMMATRISIBIRIM_GETIR = "tum.ucvpm.birim.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISIBIRIM_ID_GORE_UCVPAYLASIMMATRISIBIRIM_GETIR = "idyle.ucvpm.birim.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISIBIRIM_CLIENT_ID_GORE_UCVPAYLASIMMATRISIBIRIM_GETIR = "client.idyle.ucvpm.birim.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISIBIRIM_EKLE = "ucvpm.birim.ekleme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISIBIRIM_DELETE = "ucvpm.birim.silme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISIBIRIM_GUNCELLE = "ucvpm.birim.guncelleme.endpointi";

    public static final String TAG_UCVPAYLASIMMATRISIPERSONEL = "ulusal.cografi.veri.paylasim.matrisi.personel";
    public static final String OPERATION_UCVPAYLASIMMATRISIPERSONEL_TUM_UCVPAYLASIMMATRISIPERSONEL_GETIR = "tum.ucvpm.personel.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISIPERSONEL_ID_GORE_UCVPAYLASIMMATRISIPERSONEL_GETIR = "idyle.ucvpm.personel.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISIPERSONEL_EKLE = "ucvpm.personel.ekleme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISIPERSONEL_DELETE = "ucvpm.personel.silme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISIPERSONEL_GUNCELLE = "ucvpm.personel.guncelleme.endpointi";

    public static final String TAG_UCVPAYLASIMMATRISISEVIYETANIM = "ulusal.cografi.veri.paylasim.matrisi.seviye.tanim";
    public static final String OPERATION_UCVPAYLASIMMATRISISEVIYETANIM_TUM_UCVPAYLASIMMATRISISEVIYETANIM_GETIR = "tum.ucvpm.seviye.tanim.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISISEVIYETANIM_ID_GORE_UCVPAYLASIMMATRISISEVIYETANIM_GETIR = "idyle.ucvpm.seviye.tanim.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISISEVIYETANIM_EKLE = "ucvpm.seviye.tanim.ekleme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISISEVIYETANIM_DELETE = "ucvpm.seviye.tanim.silme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISISEVIYETANIM_GUNCELLE = "ucvpm.seviye.tanim.guncelleme.endpointi";

    public static final String TAG_UCVPAYLASIMMATRISISEVIYE = "ulusal.cografi.veri.paylasim.matrisi.seviye";
    public static final String OPERATION_UCVPAYLASIMMATRISISEVIYE_TUM_UCVPAYLASIMMATRISISEVIYE_GETIR = "tum.ucvpm.seviye.getirme.endpointi";
    public static final String OPERATION_UCVPMSEVIYE_ID_GORE_UCVPMSEVIYE_GETIR = "idyle.ucvpm.seviye.getirme.endpointi";
    public static final String OPERATION_UCVPMSEVIYE_MATRISE_GORE_UCVPMSEVIYE_GETIR = "matris.idyle.ucvpm.seviye.getirme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISISEVIYE_EKLE = "ucvpm.seviye.ekleme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISISEVIYE_DELETE = "ucvpm.seviye.silme.endpointi";
    public static final String OPERATION_UCVPAYLASIMMATRISISEVIYE_GUNCELLE = "ucvpm.seviye.guncelleme.endpointi";

    public static final String TAG_SERVIS_ISTEKLERI = "servis.istekleri";
    public static final String OPERATION_METAVERI_BILGILERI = "metaveri.bilgileri";
    public static final String OPERATION_ID_GORE_METAVERI_BILGISI = "metaveri.bilgisi.getirme.endpointi";
    public static final String OPERATION_GIZLI_OLMAYAN_METAVERIERISKISITSART_BILGISI = "metaveri.erisim.kisit.sart.gizli.olmayan.getirme.endpointi";

    public static final String TAG_GENELRAPORSOZLESMESI = "genel.rapor.sozlesmesi";
    public static final String OPERATION_GENELRAPORSOZLESMESI_EKLE = "genel.rapor.sozlesmesi.ekleme.endpointi";
    public static final String OPERATION_GENELRAPORSOZLESMESI_GUNCELLE = "genel.rapor.sozlesmesi.guncelleme.endpointi";
    public static final String OPERATION_GENELRAPORSOZLESMESI_DELETE = "genel.rapor.sozlesmesi.silme.endpointi";
    public static final String OPERATION_GENELRAPORSOZLESMESI_ID_GORE_GENELBASVURUSOZLESMESI_GETIR = "genel.rapor.sozlesmesi.getirme.endpointi";
    public static final String OPERATION_GENELRAPORSOZLESMESI_SOZLESME_TIPI_ID_GORE_AKTIF_GENELBASVURUSOZLESMESI_GETIR = "genel.rapor.sozlesmesi.sozlesme.tipi.idye.gore.aktif.kaydin.getirme.endpointi";
    public static final String OPERATION_GENELRAPORSOZLESMESI_TUM_GENELBASVURUSOZLESMESI_GETIR = "tum.genel.rapor.sozlesmesi.getirme.endpointi";

    public static final String TAG_TOKENBILGILERI = "tokenBilgileri";
    public static final String OPERATION_TOKENBILGILERI_TUM_TOKENBILGILERI_GETIR = "tum.tokenBilgileri.getirme.endpointi";
    public static final String OPERATION_TOKENBILGILERI_IDYE_GORE_GETIR = "idye.gore.tokenBilgileri.getirme.endpointi";
    public static final String OPERATION_TOKENBILGILERI_EKLE = "tokenBilgileri.ekleme.endpointi";
    public static final String OPERATION_TOKENBILGILERI_GUNCELLE = "secili.tokenBilgileri.guncelleme.endpointi";
    public static final String OPERATION_TOKENBILGILERI_DELETE = "tokenBilgileri.silme.endpointi";
    public static final String OPERATION_GRAYLOG_DATA = "operation.graylog.data";
    public static final String OPERATION_GRAYLOG_SESSION_DATA = "operation.graylog.session.data";

    public static final String OPERATION_ALL_MODULE_MESSAGES = "operation.all.module.messages";

    public static final String TAG_GENELRAPORPARAMETRESI = "genel.rapor.parametresi";
    public static final String OPERATION_GENELRAPORPARAMETRESI_EKLE = "genel.rapor.parametresi.ekleme.endpointi";
    public static final String OPERATION_GENELRAPORPARAMETRESI_GUNCELLE = "genel.rapor.parametresi.guncelleme.endpointi";
    public static final String OPERATION_GENELRAPORPARAMETRESI_DELETE = "genel.rapor.parametresi.silme.endpointi";
    public static final String OPERATION_GENELRAPORPARAMETRESI_ID_GORE_GENELRAPORPARAMETRESI_GETIR = "genel.rapor.parametresi.getirme.endpointi";
    public static final String OPERATION_GENELRAPORPARAMETRESI_RAPOR_TIPI_ID_GORE_AKTIF_GENELRAPORPARAMETRESI_GETIR = "genel.rapor.parametresi.rapor.tipi.idye.gore.aktif.kaydin.getirme.endpointi";
    public static final String OPERATION_GENELRAPORPARAMETRESI_TUM_GENELRAPORPARAMETRELERI_GETIR = "tum.genel.rapor.parametresi.getirme.endpointi";
    public static final String OPERATION_GENELRAPORPARAMETRESI_EXPORT = "genel.rapor.parametresi.export.endpointi";
    public static final String OPERATION_KULLANICI_MESAJ_TUM_MESAJLARI_GETIR = "tum.kullanici.mesaj.getirme.endpointi";
    public static final String TAG_KULLANICI_MESAJ = "kullanici.mesaj";
    public static final String TAG_SMS_VERIFICATION = "sms.verification";
    public static final String OPERATION_SMSVERIFICATION_EKLE = "sms.verification.olusturma";
    public static final String OPERATION_SMSVERIFICATION_DOGRULA = "sms.verification.dogrulama";

    public static final String OPERATION_KATMAN_TALEP_DURUMLARI_GETIR = "katman.talep.durumlarini.getir";
    public static final String OPERATION_KATMAN_TALEP_DETAYLARI_GETIR = "katman.talep.detaylarini.getir";
    public static final String OPERATION_USER_LANGUAGE = "user.language";
}

package tr.org.turksat.backend.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ApiConstants {
    public static final String RESOURCE = "/api/v1.0";

    public static final String RESOURCE_TUMUNU_GETIR = "/getAll";
    public static final String RESOURCE_AKTIF_GETIR = "/activeGetAll";
    public static final String RESOURCE_GUNCELLE = "/update";
    public static final String RESOURCE_EKLE = "/create";
    public static final String RESOURCE_TOPLU_EKLE = "/createList";
    public static final String RESOURCE_SIL = "/delete";
    public static final String RESOURCE_DIS_IDYE_GORE_SIL = "/deleteByExternalId";
    public static final String RESOURCE_TOPLU_SIL = "/deleteList";
    public static final String RESOURCE_GETIR = "/getById";
    public static final String RESOURCE_SOZLESME_TIPI_GORE_AKTIF_KAYDI_GETIR = "/getAktifBySozlesmeTipiId";
    public static final String RESOURCE_UCVPM_LIST_GETIR_BY_CLIENTID = "/ucvpmMatrisListGetirByClientId";
    public static final String RESOURCE_CLIENT_ID_GORE_GETIR = "/getAllByClientId";
    public static final String RESOURCE_EXPORT = "/export";
    public static final String RESOURCE_REPORT = "/report";
    public static final String RESOURCE_KOPYALA = "/copy";
    public static final String RESOURCE_TASK = RESOURCE + "/task";
}

package tr.org.turksat.common.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ApiConstants {
    public static final String RESOURCE_FILE = "/file";
    public static final String RESOURCE_UPLOAD = "/upload";
    public static final String RESOURCE_HEALTHY = "/isHealthy";

    public static final String RESOURCE_ENUFUS = "/e-nufus";
    public static final String RESOURCE_GVDOS = "/gvdos";
    public static final String RESOURCE_MUKELLEF = "/mukellef";
    public static final String RESOURCE_SORGULA = "/sorgula";
    public static final String RESOURCE_KIMLIK_NO = "/kimlikNo";
    public static final String RESOURCE_VARIABLE_KIMLIKNO = "/{kimlikNo}";

    public static final String RESOURCE_MESSAGE = "/message";
    public static final String RESOURCE_COUNT = "/say";
    public static final String RESOURCE_HISTORY = "/history";


}
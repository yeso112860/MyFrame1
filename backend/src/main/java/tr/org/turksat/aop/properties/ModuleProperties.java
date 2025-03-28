package tr.org.turksat.aop.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "framework.modul")
public class ModuleProperties {
    private String adi;
    private String numarasi;
    private String logEtiketi;
}

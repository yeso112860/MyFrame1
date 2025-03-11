package tr.org.turksat.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;
import org.hibernate.validator.cfg.defs.UUIDDef;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for {@link tr.org.turksat.backend.model.BaseModel}
 */
@Getter
@Setter
public class BaseModelDto implements Serializable {
    UUID id;
    @NotNull(message = "anahtar.bos")
    LocalDateTime olusturulmaZamani;
}
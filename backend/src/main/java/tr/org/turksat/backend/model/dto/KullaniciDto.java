package tr.org.turksat.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import tr.org.turksat.backend.model.Kullanici;
import tr.org.turksat.common.model.dto.BaseDto;

import java.io.Serializable;

/**
 * DTO for {@link Kullanici}
 */
@Getter
@Setter
public class KullaniciDto extends BaseDto implements Serializable {
    @NotNull(message = "anahtar.bos") String username;
    @NotNull(message = "anahtar.bos") String password;
    String email;
    String firstName;
    String lastName;
    String phone;
    String imageUrl;
    String bio;
}
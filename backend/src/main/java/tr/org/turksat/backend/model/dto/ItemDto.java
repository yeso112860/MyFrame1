package tr.org.turksat.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for {@link tr.org.turksat.backend.model.Item}
 */
@Getter
@Setter
public class ItemDto extends BaseModelDto implements Serializable {
    @NotNull(message = "anahtar.bos") String title;
    String description;
    String author;
    String publisher;
    String imageUrl;
}
package tr.org.turksat.backend.model.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParameterDto {
    UUID id;
    String label;

    @Override
    public String toString() {
        return label;
    }
}

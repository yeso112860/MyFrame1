package tr.org.turksat.common.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class HistoryDto {
    @NotNull
    private UUID id;
    private String entity;
    private String version;
    private String type;
    private String author;
    private String date;
    private String changes;
    private String changeValues;
}
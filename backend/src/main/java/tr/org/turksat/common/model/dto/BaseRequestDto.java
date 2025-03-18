package tr.org.turksat.common.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;


@NoArgsConstructor
@Data
@SuperBuilder
@Valid
public class BaseRequestDto<T> {
    @Builder.Default
    private int page = 0;
    @Builder.Default
    private int size = 10;
    private List<FilterDto> filters;
    private List<SortDto> sortList;
    private List<String> fieldNames;
    private String stringSearchKey;
    @Schema(description = "Export TYpe", example = "pdf", allowableValues = {"pdf", "excel", "csv", "json", "word"})
    private String exportType;
    @Valid
    private T object;
}

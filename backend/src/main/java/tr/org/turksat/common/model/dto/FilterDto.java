package tr.org.turksat.common.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Transient;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterDto {
    private String field;
    @Schema(description = "Operator for filtering... Date Format: \"dd/MM/yyyy HH:mm\"", example = "equals",
            allowableValues = {"equals", "notEquals", "contains", "notContains", "greaterthan"
                    , "greaterthanorequals", "lessthan", "lessthanorequals", "isempty", "isnotempty"
                    , "startsWith", "endsWith", "dateafter", "datebefore", "dateis"})
    private String operator;
    private String value;

    @Transient
    @Builder.Default
    @Schema(hidden = true)
    private final String condition = "andCondition";
}
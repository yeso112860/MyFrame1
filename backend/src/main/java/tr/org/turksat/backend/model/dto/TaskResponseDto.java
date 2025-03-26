package tr.org.turksat.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tr.org.turksat.common.model.dto.BaseDto;

import java.time.ZonedDateTime;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Data
public class TaskResponseDto extends BaseDto {
    private String title;
    private String description;
    private ZonedDateTime dueDate;
    private ParameterDto assignedBy;
    private ParameterDto assignedTo;
    private ParameterDto status;
}
package tr.org.turksat.backend.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TaskDto extends BaseModelDto {
    private String title;
    private String description;
    private LocalDateTime deadline;
    private ParameterDto assignedBy;
    private ParameterDto assignedTo;
    private ParameterDto durum;
}

package tr.org.turksat.backend.model.dto;

import lombok.Getter;
import lombok.Setter;
import tr.org.turksat.common.model.dto.BaseDto;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

@Getter
@Setter
public class TaskDto extends BaseDto {
    private String title;
    private String description;
    private ZonedDateTime deadline;
    private ParameterDto assignedBy;
    private ParameterDto assignedTo;
    private ParameterDto durum;
    private Long versiyon = 1L;

}

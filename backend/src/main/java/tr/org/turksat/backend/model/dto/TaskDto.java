package tr.org.turksat.backend.model.dto;

import lombok.Getter;
import lombok.Setter;
import tr.org.turksat.backend.model.Comment;
import tr.org.turksat.backend.model.TaskHistory;
import tr.org.turksat.backend.model.TaskPriority;
import tr.org.turksat.common.model.dto.BaseDto;

import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
public class TaskDto extends BaseDto {
    private String title;
    private String description;
    private ZonedDateTime dueDate;
    private TaskPriority priority;
    private int progress;
    private List<Comment> comments;
    private List<TaskHistory> history;
    private ParameterDto assignedBy;
    private ParameterDto assignedTo;
    private ParameterDto status;
    private Long versiyon = 1L;
}

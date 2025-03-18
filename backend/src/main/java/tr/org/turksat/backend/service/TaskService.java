package tr.org.turksat.backend.service;

import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.model.dto.TaskRequestDto;
import tr.org.turksat.backend.model.dto.TaskResponseDto;
import tr.org.turksat.common.service.BaseServiceInterface;

public interface TaskService extends BaseServiceInterface<TaskDto, TaskRequestDto, TaskResponseDto> {
}
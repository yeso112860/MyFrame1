package tr.org.turksat.backend.model.mapper;

import org.mapstruct.*;
import tr.org.turksat.backend.model.Task;
import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.model.dto.TaskRequestDto;
import tr.org.turksat.backend.model.dto.TaskResponseDto;
import tr.org.turksat.common.mapper.BaseMapper;

import java.time.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR, builder = @Builder(disableBuilder = true))
public interface TaskMapper extends BaseMapper<TaskDto, Task, TaskRequestDto, TaskResponseDto> {
}
package tr.org.turksat.backend.service;

import org.springframework.stereotype.Service;
import tr.org.turksat.backend.model.Task;
import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.model.dto.TaskRequestDto;
import tr.org.turksat.backend.model.dto.TaskResponseDto;
import tr.org.turksat.backend.model.mapper.TaskMapper;
import tr.org.turksat.backend.repository.TaskRepository;
import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.BaseResponseDto;
import tr.org.turksat.common.service.BaseService;

@Service
public class TaskServiceImpl extends
        BaseService<TaskRepository, TaskMapper, Task, TaskDto, TaskRequestDto, TaskResponseDto> implements TaskService {

    protected TaskServiceImpl(TaskRepository repository, TaskMapper mapper) {
        super(repository, mapper);
    }

    @Override
    public BaseResponseDto<TaskResponseDto> guncelle(BaseRequestDto<TaskRequestDto> baseRequestDto) {
        return null;
    }
}
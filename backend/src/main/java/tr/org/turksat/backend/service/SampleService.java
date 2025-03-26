package tr.org.turksat.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.org.turksat.backend.model.Kullanici;
import tr.org.turksat.backend.model.Task;
import tr.org.turksat.backend.model.dto.KullaniciDto;
import tr.org.turksat.backend.model.dto.ParameterDto;
import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.model.mapper.KullaniciMapper;
import tr.org.turksat.backend.model.mapper.TaskMapper;
import tr.org.turksat.backend.repository.KullaniciRepository;
import tr.org.turksat.backend.repository.TaskRepository;
import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.ResourceDto;
import tr.org.turksat.common.service.ExporterService;

import java.util.List;
import java.util.Optional;

@Service
public class SampleService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskMapper taskMapper;
    @Autowired
    private KullaniciRepository kullaniciRepository;
    @Autowired
    private KullaniciMapper kullaniciMapper;
    @Autowired
    private ExporterService exporterService;

    public List<TaskDto> getTasks() {
        List<TaskDto> dtoList = taskRepository.findAllDto();
        return dtoList;
    }

    public TaskDto addTask(TaskDto taskDto) {
        Task entity = taskMapper.dtoToEntity(taskDto);
        return taskMapper.entityToDto(taskRepository.save(entity));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<ParameterDto> getPeople() {
        return taskRepository.getPeople();
    }

    public ResourceDto exportTasks() {
        List<TaskDto> allDto = taskRepository.findAllDto();
        BaseRequestDto requestDto = BaseRequestDto.builder().
                fieldNames(List.of("id", "title", "description")).
                exportType("excel").build();
        return exporterService.export(requestDto, allDto, "");
    }
}
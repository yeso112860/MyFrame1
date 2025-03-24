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
import java.util.UUID;

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
        List<Task> all = taskRepository.findAll();
        System.out.println(all);
        List<TaskDto> dtoList = taskRepository.findAllDto();
        return dtoList;
    }

    public TaskDto addTask(TaskDto taskDto) {
        Task entity = taskMapper.dtoToEntity(taskDto);
        return taskMapper.entityToDto(taskRepository.save(entity));
    }

    public void deleteTask(UUID id) {
        taskRepository.deleteById(id);
    }

    public List<KullaniciDto> getKullanicilar() {
        return kullaniciMapper.toDtoList(kullaniciRepository.findAll());
    }

    public KullaniciDto addUser(KullaniciDto kullaniciDto) {
        Optional<Kullanici> byId;
        if (kullaniciDto.getId() != null)
            byId = kullaniciRepository.findById(kullaniciDto.getId());
        else byId = Optional.empty();
        Kullanici entity;
        if (byId.isEmpty()) {
            entity = kullaniciMapper.toEntity(kullaniciDto);
            entity.setId(UUID.randomUUID());
        } else {
            entity = byId.get();
            kullaniciMapper.updateEntity(entity, kullaniciDto);
        }
        Kullanici save = kullaniciRepository.save(entity);
        return kullaniciMapper.toDto(save);
    }

    public List<ParameterDto> getStatusParameters() {
        return taskRepository.getStatusParameters();
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
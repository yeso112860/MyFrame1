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

    public List<TaskDto> getTasks() {
        // List<Task> all = taskRepository.findAll();
        // List<TaskDto> dtoList = taskMapper.toDtoList(all);
        List<TaskDto> dtoList = taskRepository.findAllDto();
        return dtoList;
    }

    public TaskDto addTask(TaskDto taskDto) {
        Task entity = taskMapper.toEntity(taskDto);
        if(taskDto.getId() == null) {
            entity.setId(UUID.randomUUID());
        }
        return taskMapper.toDto(taskRepository.save(entity));
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
}
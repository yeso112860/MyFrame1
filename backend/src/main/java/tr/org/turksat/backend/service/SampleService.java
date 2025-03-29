package tr.org.turksat.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import tr.org.turksat.backend.model.Kullanici;
import tr.org.turksat.backend.model.Task;
import tr.org.turksat.backend.model.dto.KullaniciDto;
import tr.org.turksat.backend.model.dto.ParameterDto;
import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.model.dto.TaskRequestDto;
import tr.org.turksat.backend.model.mapper.KullaniciMapper;
import tr.org.turksat.backend.model.mapper.TaskMapper;
import tr.org.turksat.backend.repository.KullaniciRepository;
import tr.org.turksat.backend.repository.TaskRepository;
import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.HistoryDto;
import tr.org.turksat.common.model.dto.ResourceDto;
import tr.org.turksat.common.service.EntityHistoryService;
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
    @Autowired
    protected ApplicationContext context;

    public List<TaskDto> getTasks() {
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

    public ResourceDto export(BaseRequestDto<TaskDto> requestDto) {
        if (CollectionUtils.isEmpty(requestDto.getFieldNames())) {
            return null;
        }
        Class<Task> entityTypeClass = Task.class;
        requestDto.setPage(0);
        requestDto.setSize(Integer.MAX_VALUE);
        List<TaskDto> allDto = taskRepository.findAllDto();
        return exporterService.export(requestDto, allDto, "out.xlsx");
    }

    public List<HistoryDto> getHistory(BaseRequestDto<HistoryDto> baseRequestDto) {
        HistoryDto historyDto = baseRequestDto.getObject();
        EntityHistoryService entityHistoryService = this.context.getBean(EntityHistoryService.class);
        List<HistoryDto> cdoSnapshotList = entityHistoryService.getEntityHistory(Task.class, historyDto.getId());
        return cdoSnapshotList;
    }
}
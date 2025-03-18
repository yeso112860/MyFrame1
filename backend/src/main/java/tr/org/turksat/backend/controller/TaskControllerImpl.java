package tr.org.turksat.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.model.dto.TaskRequestDto;
import tr.org.turksat.backend.model.dto.TaskResponseDto;
import tr.org.turksat.backend.service.TaskService;
import tr.org.turksat.common.contoller.BaseController;
import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.BaseResponseDto;

import java.util.UUID;

@RestController
public class TaskControllerImpl extends BaseController<TaskService, TaskDto, TaskRequestDto, TaskResponseDto> implements TaskController {

    public TaskControllerImpl(TaskService service) {
        super(service);
    }

    @Override
    public ResponseEntity<BaseResponseDto> tumTasklariGetir(BaseRequestDto baseRequestDto) {
        return super.hepsiniBul(baseRequestDto);
    }

    public ResponseEntity<BaseResponseDto<TaskResponseDto>> taskEkle(BaseRequestDto<TaskRequestDto> baseRequestDto) {
        return super.kaydet(baseRequestDto);
    }

    @Override
    public ResponseEntity<BaseResponseDto> taskSil(BaseRequestDto<UUID> baseRequestDto) {
        return super.sil(baseRequestDto);
    }

    @Override
    public ResponseEntity<BaseResponseDto> taskSilByMetaveriServisBilgileriId(BaseRequestDto<UUID> baseRequestDto) {
        return null;
    }

    @Override
    public ResponseEntity<BaseResponseDto<TaskResponseDto>> updateTask(BaseRequestDto<TaskRequestDto> baseRequestDto) {
        return super.guncelle(baseRequestDto);
    }

    @Override
    public ResponseEntity<BaseResponseDto<TaskResponseDto>> getTaskById(BaseRequestDto<UUID> baseRequestDto) {
        return super.bul(baseRequestDto);
    }

    @Override
    public ResponseEntity<Resource> export(BaseRequestDto<TaskRequestDto> baseRequestDto) {
        return super.buildResponseEntity(service.export(baseRequestDto));
    }
}
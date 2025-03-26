package tr.org.turksat.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.org.turksat.backend.constant.ApiConstants;
import tr.org.turksat.backend.constant.SwaggerConstants;
import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.model.dto.TaskRequestDto;
import tr.org.turksat.backend.model.dto.TaskResponseDto;
import tr.org.turksat.common.contoller.BaseControllerInterface;
import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.BaseResponseDto;

@CrossOrigin()
@RequestMapping(ApiConstants.RESOURCE_TASK)
@Tag(name = SwaggerConstants.TAG_TASK)
public interface TaskController extends BaseControllerInterface<TaskDto, TaskRequestDto, TaskResponseDto> {

    @PostMapping(ApiConstants.RESOURCE_TUMUNU_GETIR)
    @Operation(summary = SwaggerConstants.OPERATION_TASK_TUM_TASK_GETIR)
    ResponseEntity<BaseResponseDto> tumTasklariGetir(@RequestBody BaseRequestDto taskRequestDto);

    @PostMapping(ApiConstants.RESOURCE_EKLE)
    @Operation(summary = SwaggerConstants.OPERATION_TASK_EKLE)
    ResponseEntity<BaseResponseDto<TaskResponseDto>> taskEkle(@Valid @RequestBody BaseRequestDto<TaskRequestDto> taskRequestDto);

    @Operation(summary = SwaggerConstants.OPERATION_TASK_GUNCELLE)
    @PutMapping(path = ApiConstants.RESOURCE_GUNCELLE)
    ResponseEntity<BaseResponseDto<TaskResponseDto>> updateTask(@Valid @RequestBody BaseRequestDto<TaskRequestDto> taskRequestDto);

    @DeleteMapping(ApiConstants.RESOURCE_SIL)
    @Operation(summary = SwaggerConstants.OPERATION_TASK_DELETE)
    ResponseEntity<BaseResponseDto> taskSil(@RequestBody BaseRequestDto<Long> taskRequestDto);

    @DeleteMapping(ApiConstants.RESOURCE_DIS_IDYE_GORE_SIL)
    @Operation(summary = SwaggerConstants.OPERATION_TASK_DIS_IDYE_GORE_SILME)
    ResponseEntity<BaseResponseDto> taskSilByMetaveriServisBilgileriId(@RequestBody BaseRequestDto<Long> baseRequestDto);

    @PostMapping(path = ApiConstants.RESOURCE_GETIR)
    @Operation(summary = SwaggerConstants.OPERATION_TASK_IDYE_GORE_GETIR)
    ResponseEntity<BaseResponseDto<TaskResponseDto>> getTaskById(@RequestBody BaseRequestDto<Long> taskRequestDto);

    @PostMapping(ApiConstants.RESOURCE_EXPORT)
    @Operation(summary = SwaggerConstants.TAG_TASK + SwaggerConstants.EXPORT)
    ResponseEntity<Resource> export(@RequestBody BaseRequestDto<TaskRequestDto> baseRequestDto);
}
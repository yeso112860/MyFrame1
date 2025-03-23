package tr.org.turksat.backend.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.org.turksat.backend.model.dto.ParameterDto;
import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.service.SampleService;
import tr.org.turksat.common.model.dto.BaseResponseDto;
import tr.org.turksat.common.model.dto.ResourceDto;

import java.util.List;
import java.util.UUID;

import static tr.org.turksat.backend.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/changeit")
public class SampleController {

    private final SampleService sampleService;

    @GetMapping
    public ResponseEntity<List<TaskDto>> getTasks() {
        return new ResponseEntity<>(sampleService.getTasks(), HttpStatus.OK);
    }

    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/statuses")
    public ResponseEntity<List<ParameterDto>> getStatuses() {
        return new ResponseEntity<>(sampleService.getStatusParameters(), HttpStatus.OK);
    }

    @GetMapping("/people")
    public ResponseEntity<List<ParameterDto>> getPeople() {
        return new ResponseEntity<>(sampleService.getPeople(), HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
//    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<BaseResponseDto<TaskDto>> addTask(@RequestBody TaskDto taskDto, @RequestHeader("Authorization") String token) {
        taskDto = sampleService.addTask(taskDto);
        BaseResponseDto<TaskDto> responseDto = new BaseResponseDto<>();
        responseDto.setSuccess(true);
        responseDto.setObject(taskDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponseDto<TaskDto>> deleteTask(@PathVariable("id") UUID id) {
        sampleService.deleteTask(id);
        BaseResponseDto<TaskDto> responseDto = new BaseResponseDto<>();
        responseDto.setSuccess(true);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
    @GetMapping("/export")
    public ResponseEntity<Resource> getExportTasks() {
        ResourceDto resourceDto = sampleService.exportTasks();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition", "attachment; filename=" + resourceDto.getFileName() +"."+ resourceDto.getMediaType().getSubtype());

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(resourceDto.getMediaType())
                .headers(httpHeaders)
                .body(resourceDto.getResource());
    }
}

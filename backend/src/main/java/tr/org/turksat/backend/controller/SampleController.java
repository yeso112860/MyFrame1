package tr.org.turksat.backend.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import tr.org.turksat.backend.model.dto.ItemDto;
import tr.org.turksat.backend.model.dto.KullaniciDto;
import tr.org.turksat.backend.service.SampleService;

import java.util.List;
import java.util.UUID;

import static tr.org.turksat.backend.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/changeit")
public class SampleController {

    private final SampleService sampleService;

    @GetMapping
    public ResponseEntity<List<ItemDto>> getItems() {
        return new ResponseEntity<>(sampleService.getItems(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user")
    public ResponseEntity<List<KullaniciDto>> getUsers() {
        return new ResponseEntity<>(sampleService.getKullanicilar(), HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<ItemDto> addItem(@RequestBody ItemDto itemDto,@RequestHeader("Authorization") String token) {
        itemDto = sampleService.addItem(itemDto);
        return new ResponseEntity<>(itemDto, HttpStatus.CREATED);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteItem(@PathVariable("id") UUID id) {
        sampleService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

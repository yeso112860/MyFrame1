package tr.org.turksat.common.contoller;

import com.querydsl.core.types.Predicate;
import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import tr.org.turksat.common.constant.ApiConstants;
import tr.org.turksat.common.model.dto.BaseDto;
import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.BaseResponseDto;
import tr.org.turksat.common.model.dto.HistoryDto;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface BaseControllerInterface <DtoType extends BaseDto,RequestDtoType ,ResponseDtoType>{

    /**
     *
     * @param responseObject dönüş nesnesi
     * @param status http statüs kodu
     * @return Response entity oluşturup geri döner.
     */
    <T> ResponseEntity<T> responseOlustur(@Nullable T responseObject, HttpStatus status);

    /**
     *
     * @param status http statüs kodu
     * @return Response entity oluşturup geri döner.
     */
    ResponseEntity<HttpStatus> responseOlustur(HttpStatus status);

    ResponseEntity<DtoType> kaydet(DtoType dto);

    ResponseEntity<DtoType> bul(UUID uid);

    ResponseEntity<BaseResponseDto<ResponseDtoType>> bul(BaseRequestDto<UUID> baseRequestDto);

    void sil(UUID uid);

    ResponseEntity<Set<DtoType>> kaydet(Set<DtoType> dtoList);

    ResponseEntity<BaseResponseDto<ResponseDtoType>> kaydet(BaseRequestDto<RequestDtoType> dto);

    ResponseEntity<DtoType> guncelle(DtoType dto);

    ResponseEntity<Set<DtoType>> guncelle(Set<DtoType> dtoSet);

    ResponseEntity<BaseResponseDto<ResponseDtoType>> guncelle(BaseRequestDto<RequestDtoType> baseRequestDto);

    void sil(List<DtoType> dtoList);

    ResponseEntity<BaseResponseDto> sil(BaseRequestDto<UUID> baseRequestDto);

    ResponseEntity<List<DtoType>> hepsiniBul();

    ResponseEntity<List<DtoType>> hepsiniBul(int page, int size);

    ResponseEntity<List<DtoType>> hepsiniBul(Predicate predicate, int page, int size);

    ResponseEntity<BaseResponseDto<List<ResponseDtoType>>> hepsiniBul(BaseRequestDto<RequestDtoType> baseRequestDto);

    ResponseEntity<BaseResponseDto<List<ResponseDtoType>>> aktifHepsiniBul(BaseRequestDto<RequestDtoType> baseRequestDto);

    @GetMapping(ApiConstants.RESOURCE_COUNT)
    ResponseEntity<Long> say();

    @PostMapping(ApiConstants.RESOURCE_HISTORY)
    ResponseEntity<List<HistoryDto>> getHistory(@RequestBody @Valid BaseRequestDto<HistoryDto> baseRequestDto);

    ResponseEntity<Resource> export(BaseRequestDto<RequestDtoType> baseRequestDto);
}
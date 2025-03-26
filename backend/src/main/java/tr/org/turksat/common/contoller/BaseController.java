package tr.org.turksat.common.contoller;

import com.querydsl.core.types.Predicate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.RequestBody;
import tr.org.turksat.common.model.dto.*;
import tr.org.turksat.common.service.BaseServiceInterface;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class BaseController<ServiceType
        extends BaseServiceInterface<DtoType, RequestDtoType, ResponseDtoType>, DtoType extends BaseDto, RequestDtoType, ResponseDtoType>
        implements BaseControllerInterface<DtoType, RequestDtoType, ResponseDtoType> {
    /**
     * Extend alan controllerlarda kullanılacak generic service.
     */
    protected final ServiceType service;

    /**
     * @param responseObject dönüş nesnesi
     * @param status         http statüs kodu
     * @return Response entity oluşturup geri döner.
     */
    @Override
    public <T> ResponseEntity<T> responseOlustur(@Nullable T responseObject, HttpStatus status) {
        return ResponseEntity.status(status.value()).body(responseObject);
    }

    /**
     * @param status http statüs kodu
     * @return Response entity oluşturup geri döner.
     */
    public ResponseEntity<HttpStatus> responseOlustur(HttpStatus status) {
        return responseOlustur(null, status);
    }

    @Override
    public ResponseEntity<DtoType> kaydet(DtoType dto) {
        return (ResponseEntity<DtoType>) responseOlustur(service.kaydet(dto), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<BaseResponseDto<ResponseDtoType>> kaydet(BaseRequestDto<RequestDtoType> dto) {
        return responseOlustur(service.kaydet(dto), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<DtoType> bul(Long uid) {
        return (ResponseEntity<DtoType>) responseOlustur(service.bul(uid), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BaseResponseDto<ResponseDtoType>> bul(BaseRequestDto<Long> baseRequestDto) {
        return responseOlustur(service.bul(baseRequestDto), HttpStatus.OK);
    }

    public void sil(Long uid) {
        service.sil(uid);
    }


    @Override
    public ResponseEntity<Set<DtoType>> kaydet(Set<DtoType> dtoList) {
        return responseOlustur(service.kaydet(dtoList), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<DtoType> guncelle(DtoType dto) {
        return responseOlustur(service.guncelle(dto), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Set<DtoType>> guncelle(Set<DtoType> dtoSet) {
        return responseOlustur(service.guncelle(dtoSet), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BaseResponseDto<ResponseDtoType>> guncelle(BaseRequestDto<RequestDtoType> baseRequestDto) {
        return responseOlustur(service.guncelle(baseRequestDto), HttpStatus.OK);
    }

    @Override
    public void sil(List<DtoType> dtoList) {
        service.sil(dtoList);
    }

    @Override
    public ResponseEntity<BaseResponseDto> sil(BaseRequestDto<Long> baseRequestDto) {
        return responseOlustur(service.sil(baseRequestDto), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<DtoType>> hepsiniBul() {
        return responseOlustur(service.hepsiniBul(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<DtoType>> hepsiniBul(int page, int size) {
        return responseOlustur(service.hepsiniBul(page, size), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<DtoType>> hepsiniBul(Predicate predicate, int page, int size) {
        return responseOlustur(service.hepsiniBul(predicate, page, size), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BaseResponseDto<List<ResponseDtoType>>> hepsiniBul(BaseRequestDto<RequestDtoType> baseRequestDto) {
        return responseOlustur(service.hepsiniBul(baseRequestDto), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BaseResponseDto<List<ResponseDtoType>>> aktifHepsiniBul(BaseRequestDto<RequestDtoType> baseRequestDto) {
        return responseOlustur(service.aktifHepsiniBul(baseRequestDto), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Long> say() {
        return responseOlustur(service.say(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<HistoryDto>> getHistory(@RequestBody BaseRequestDto<HistoryDto> baseRequestDto) {
        return responseOlustur(service.getHistory(baseRequestDto), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Resource> export(BaseRequestDto<RequestDtoType> baseRequestDto) {
        ResourceDto resourceDto = service.export(baseRequestDto);
        if (resourceDto != null)
            return buildResponseEntity(resourceDto);
        else {
            return responseOlustur(null, HttpStatus.NOT_FOUND);
        }
    }

    protected ResponseEntity<Resource> buildResponseEntity(ResourceDto resourceDto) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition", "attachment; filename=" + resourceDto.getFileName() + "." + resourceDto.getMediaType().getSubtype());

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(resourceDto.getMediaType())
                .headers(httpHeaders)
                .body(resourceDto.getResource());
    }
}

package tr.org.turksat.common.service;

import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import tr.org.turksat.common.model.dto.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface BaseServiceInterface <DtoType extends BaseDto,RequestDtoType,ResponseDtoType>{

    /**
     * Service'te kullanılacak kaydet methodu.
     * @param dto repository katmanına taşınacak Dto
     * @return repository katmanından dönen Dto
     */
    DtoType kaydet(DtoType dto);

    /**
     * Service'te kullanılacak kaydet methodu.
     *
     * @param dtoSet repository katmanına taşınacak Dto listesi
     * @return kaydedilen dtoyu döner
     */
    Set<DtoType> kaydet(Set<DtoType> dtoSet);

    BaseResponseDto<ResponseDtoType> kaydet(BaseRequestDto<RequestDtoType> baseRequestDto);

    DtoType guncelle(DtoType dto);

    Set<DtoType> guncelle(Set<DtoType> dtoSet);

    BaseResponseDto<ResponseDtoType> guncelle(BaseRequestDto<RequestDtoType> baseRequestDto);

    /**
     * Service'te kullanılacak sil methodu.
     * @param dtoList repository katmanına taşınacak Dto list
     */
    void sil(List<DtoType> dtoList);

    /**
     * Service'te kullanılacak sil methodu.
     * @param uid repository katmanına taşınacak Entity UUID
     */
    void sil(UUID uid);

    BaseResponseDto sil(BaseRequestDto<UUID> baseRequestDto);

    /**
     * Service'te kullanılacak bul methodu.
     * @param id repository katmanına taşınacak Entity UUID
     * @return repository katmanından dönen Dto
     */
    DtoType bul(UUID id);

    BaseResponseDto bul(BaseRequestDto<UUID> baseRequestDto);

    List<DtoType> hepsiniBul();
    List<DtoType> hepsiniBul(int page, int size);
    List<DtoType> hepsiniBul(Predicate predicate, int page, int size);
    List<DtoType> hepsiniBul(Specification specification, Pageable pageable);
    List<DtoType> hepsiniBul(SearchObject object);
    BaseResponseDto<List<ResponseDtoType>> hepsiniBul(BaseRequestDto<RequestDtoType> baseRequestDto);
    BaseResponseDto<List<ResponseDtoType>> aktifHepsiniBul(BaseRequestDto<RequestDtoType> baseRequestDto);

    long say();
    BaseResponseDto createResponseDto(BaseRequestDto baseRequestDto, Object object, long count, String message, Boolean successStatus);

    ResourceDto export(BaseRequestDto baseRequestDto);
    ResourceDto export(BaseRequestDto baseRequestDto,List<DtoType> dtoList );

    List<HistoryDto> getHistory(BaseRequestDto<HistoryDto> baseRequestDto);
}
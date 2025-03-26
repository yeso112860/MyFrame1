package tr.org.turksat.common.mapper;

import tr.org.turksat.common.model.BaseEntity;
import tr.org.turksat.common.model.dto.BaseDto;

import java.util.List;
import java.util.Set;

public interface BaseMapper<DTO extends BaseDto, ENTITY extends BaseEntity, RequestDtoType, ResponseDtoType> {
    /**
     * BaseDto'yu extends alan Dto nesnesi alıp Entity Döner
     *
     * @param dto BaseDto'yu extends alan Dto nesnesi
     * @return Dto'dan dönüşmüş Entity
     */
    ENTITY dtoToEntity(DTO dto);

    /**
     * BaseEntity'i extends alan Entity nesnesi alıp Dto Döner
     *
     * @param entity BaseEntity'i extends alan Entity nesnesi
     * @return Entity'den dönüşmüş Dto
     */
    DTO entityToDto(ENTITY entity);

    Set<DTO> entitySetToDtoSet(Set<ENTITY> entityList);

    Set<ENTITY> dtoSetToEntitySet(Set<DTO> dtoList);

    List<DTO> entityListToDtoList(List<ENTITY> entityList);

    List<ENTITY> dtoListToEntityList(List<DTO> dtoList);

    ResponseDtoType dtoToResponse(DTO dto);

    DTO requestToDto(RequestDtoType requestDto);

    List<ResponseDtoType> dtoListToResponseList(List<DTO> dtoList);

    List<DTO> requestListToDtoList(List<RequestDtoType> requestDtoList);
}

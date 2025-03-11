package tr.org.turksat.backend.model.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import tr.org.turksat.backend.model.BaseModel;
import tr.org.turksat.backend.model.dto.BaseModelDto;

import java.util.List;

public interface BaseModelMapper<DTO extends BaseModelDto, ENTITY extends BaseModel> {
    ENTITY toEntity(DTO baseModelDto);

    DTO toDto(ENTITY baseModel);

    void updateEntity(@MappingTarget ENTITY baseModel, DTO baseModelDto);

    void updateDto(@MappingTarget DTO baseModelDto, ENTITY baseModel);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ENTITY partialUpdate(DTO baseModelDto, @MappingTarget ENTITY baseModel);

    List<ENTITY> toEntityList(List<DTO> baseModelDtoList);

    List<DTO> toDtoList(List<ENTITY> baseModelList);
}
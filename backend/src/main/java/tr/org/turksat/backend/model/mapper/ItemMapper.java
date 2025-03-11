package tr.org.turksat.backend.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import tr.org.turksat.backend.model.Item;
import tr.org.turksat.backend.model.dto.ItemDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ItemMapper extends BaseModelMapper<ItemDto, Item> {
}
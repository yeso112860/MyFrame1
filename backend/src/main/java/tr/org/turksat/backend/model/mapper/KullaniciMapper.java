package tr.org.turksat.backend.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import tr.org.turksat.backend.model.Kullanici;
import tr.org.turksat.backend.model.dto.KullaniciDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface KullaniciMapper extends BaseModelMapper<KullaniciDto, Kullanici> {
}
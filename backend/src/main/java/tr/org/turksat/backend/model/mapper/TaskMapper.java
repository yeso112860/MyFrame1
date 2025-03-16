package tr.org.turksat.backend.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import tr.org.turksat.backend.model.Kullanici;
import tr.org.turksat.backend.model.Task;
import tr.org.turksat.backend.model.dto.ParameterDto;
import tr.org.turksat.backend.model.dto.TaskDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskMapper extends BaseModelMapper<TaskDto, Task> {
    default ParameterDto kullaniciToParameterDto(Kullanici kullanici) {
        if (kullanici == null) {
            return null;
        }

        ParameterDto parameterDto = new ParameterDto();

        parameterDto.setId(kullanici.getId());
        parameterDto.setLabel(kullanici.getFirstName());

        return parameterDto;
    }
}
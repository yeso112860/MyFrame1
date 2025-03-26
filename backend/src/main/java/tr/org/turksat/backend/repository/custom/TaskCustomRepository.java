package tr.org.turksat.backend.repository.custom;

import org.springframework.stereotype.Repository;
import tr.org.turksat.backend.model.dto.ParameterDto;
import tr.org.turksat.backend.model.dto.TaskDto;

import java.util.List;

@Repository
public interface TaskCustomRepository {
    List<ParameterDto> getPeople();

    List<TaskDto> findAllDto();
}
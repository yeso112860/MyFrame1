package tr.org.turksat.common.service;

import com.google.gson.Gson;
import org.javers.core.Javers;
import org.javers.core.metamodel.object.CdoSnapshot;
import org.javers.repository.jql.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.org.turksat.common.config.ExcludeFromComponentScan;
import tr.org.turksat.common.model.dto.HistoryDto;
import tr.org.turksat.common.util.GsonUtil;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@ExcludeFromComponentScan
public class EntityHistoryServiceImpl implements EntityHistoryService {
    private final Javers javers;
    private Gson gson= GsonUtil.localDateAdapterluGsonGetir();

    public EntityHistoryServiceImpl(Javers javers) {
        this.javers = javers;
    }

    public List<HistoryDto> getEntityHistory(Class<?> entityClass, Object entityId) {
        List<CdoSnapshot> snapshots = javers.findSnapshots(
                QueryBuilder.byInstanceId(entityId, entityClass).build());
        return snapshots.stream().map(snapshot -> {
            HistoryDto dto = HistoryDto.builder().id((UUID) entityId).entity(entityClass.getSimpleName())
                    .version(String.valueOf(snapshot.getVersion()))
                    .type(snapshot.getType().toString())
                    .author(snapshot.getCommitMetadata().getAuthor())
                    .date(snapshot.getCommitMetadata().getCommitDate().toString())
                    .changes(snapshot.getChanged().toString())
                    .changeValues( gson.toJson(snapshot.getState()) ).build();
            if(dto.getChanges().contains("durum") && !dto.getChangeValues().contains("durum") ){
                dto.setChangeValues(dto.getChangeValues().replace("}}", ",\"durum\":0}}" ) );
            }
            return dto;
        }).collect(Collectors.toList());
    }
}
package tr.org.turksat.common.service;

import tr.org.turksat.common.model.dto.HistoryDto;

import java.util.List;

public interface EntityHistoryService {
    List<HistoryDto> getEntityHistory(Class<?> entityClass, Object entityId);
}
package tr.org.turksat.common.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BaseResponseDto<T> {
    private UUID clientId;
    private T object;
    private boolean isSuccess;
    private String mesaj;
    private int page;
    private int size;
    private long totalRecordCount;
    private long totalTableCount;
    private String stringSearchKey;
    private List<FilterDto> filters;
    private List<SortDto> sortList;
    private List<String> fieldNames;
}
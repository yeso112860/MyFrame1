package tr.org.turksat.common.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResourceDto {
    private Resource resource;
    private MediaType mediaType;
    private String fileName;
}
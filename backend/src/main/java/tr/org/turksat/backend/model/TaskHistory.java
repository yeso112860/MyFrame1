package tr.org.turksat.backend.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.javers.core.metamodel.annotation.Value;

import java.time.ZonedDateTime;

@Getter
@Setter
@Value
@EqualsAndHashCode
public class TaskHistory {
    private ZonedDateTime date;
    private String from;
    private String to;
    private String by;
    private String note;
}

package tr.org.turksat.backend.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.javers.core.metamodel.annotation.Value;

import java.time.ZonedDateTime;

@Getter
@Setter
@EqualsAndHashCode
@Value
public class Comment {
    private ZonedDateTime date;
    private String user;
    private String content;
}

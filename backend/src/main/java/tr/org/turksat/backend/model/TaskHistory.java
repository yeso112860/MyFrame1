package tr.org.turksat.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
public class TaskHistory {
    private ZonedDateTime date;
    private String from;
    private String to;
    private String by;
    private String note;
}

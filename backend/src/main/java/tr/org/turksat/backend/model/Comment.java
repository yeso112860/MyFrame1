package tr.org.turksat.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
public class Comment {
    private ZonedDateTime date;
    private String user;
    private String content;
}

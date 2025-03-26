package tr.org.turksat.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import tr.org.turksat.common.model.BaseEntity;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(callSuper = true)
@Table(name = "task")
public class Task extends BaseEntity {
    private @NotNull
    @Column(columnDefinition = "text") String title;
    private @Column(columnDefinition = "text") String description;
    private @NotNull
    @Column(columnDefinition = "datetime") ZonedDateTime dueDate;
    private @NotNull
    @Enumerated(value = EnumType.STRING)
    @Column(columnDefinition = "text") TaskPriority priority;
    private @NotNull int progress;
    private @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON) List<Comment> comments = new ArrayList<>();
    private @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON) List<TaskHistory> history = new ArrayList<>();
    private @ManyToOne Kullanici assignedBy;
    private @ManyToOne Kullanici assignedTo;
    private @NotNull
    @Enumerated(value = EnumType.STRING)
    @Column(columnDefinition = "text") TaskStatus status;
}

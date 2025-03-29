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
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.PropertyName;
import org.javers.core.metamodel.annotation.ShallowReference;
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
    @Enumerated(value = EnumType.STRING) TaskPriority priority;
    private @NotNull int progress;
    private @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON) List<Comment> comments = new ArrayList<>();
    private @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON) List<TaskHistory> history = new ArrayList<>();
    private @ManyToOne
    @DiffIgnore Kullanici assignedBy;
    private @ManyToOne
    @DiffIgnore Kullanici assignedTo;
    private @ManyToOne
    @PropertyName("status.label") ParamStatus status;
}

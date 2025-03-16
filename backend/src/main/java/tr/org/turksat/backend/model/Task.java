package tr.org.turksat.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "task")
@Getter
@Setter
public class Task extends BaseModel {
    private @NotNull @Column(columnDefinition = "text") String title;
    private @Column(columnDefinition = "text") String description;
    private @NotNull @Column(columnDefinition = "datetime") LocalDateTime deadline;
    private @ManyToOne Kullanici assignedBy;
    private @ManyToOne Kullanici assignedTo;
    private @ManyToOne ParamDurum durum;
}

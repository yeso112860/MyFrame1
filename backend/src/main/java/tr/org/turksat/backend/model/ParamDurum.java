package tr.org.turksat.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "param_durum")
@Getter
@Setter
public class ParamDurum extends BaseModel {
    private @NotNull @Column(columnDefinition = "text") String label;
    private @Column(columnDefinition = "text") String description;
}

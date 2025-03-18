package tr.org.turksat.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import tr.org.turksat.common.constant.EntityConstant;
import tr.org.turksat.common.model.BaseEntity;

@Entity
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(callSuper=true)
public class ParamDurum extends BaseEntity {
    private @NotNull @Column(columnDefinition = "text") String label;
    private @Column(columnDefinition = "text") String description;
}

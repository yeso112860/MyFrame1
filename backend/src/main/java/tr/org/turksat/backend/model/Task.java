package tr.org.turksat.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLRestriction;
import tr.org.turksat.common.constant.EntityConstant;
import tr.org.turksat.common.model.BaseEntity;

import java.time.ZonedDateTime;

@Entity
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(callSuper = true)
//@SQLDelete(sql = "UPDATE kullanici SET " + EntityConstant.DURUM + " = '" + EntityConstant.DURUM_SILINDI + "' , " + EntityConstant.VERSION + " = versiyon + 1 " + " WHERE " + EntityConstant.ID
//        + " = ? AND " + EntityConstant.VERSION + " <= ?")
@SQLRestriction(EntityConstant.DURUM + " <> " + EntityConstant.DURUM_SILINDI)
@Table(name = "task")
public class Task extends BaseEntity {
    private @NotNull
    @Column(columnDefinition = "text") String title;
    private @Column(columnDefinition = "text") String description;
    private @NotNull
    @Column(columnDefinition = "datetime") ZonedDateTime deadline;
    private @ManyToOne Kullanici assignedBy;
    private @ManyToOne Kullanici assignedTo;
    private @ManyToOne ParamDurum durum;
}

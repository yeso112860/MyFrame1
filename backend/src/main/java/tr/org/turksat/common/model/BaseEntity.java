package tr.org.turksat.common.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.SoftDelete;
import org.hibernate.annotations.SoftDeleteType;
import org.hibernate.type.YesNoConverter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import tr.org.turksat.common.constant.EntityConstant;

import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
@EntityListeners({AuditingEntityListener.class})
@Setter
@Getter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@SoftDelete(columnName = "silindi")
public abstract class BaseEntity implements Persistable<UUID> {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "olusturulma_tarihi", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime olusturulmaTarihi;

    @Column(name = "degistirilme_tarihi")
    @LastModifiedDate
    private LocalDateTime guncellenmeTarihi;

    @Column(name = "olusturan_kisi", nullable = false, updatable = false)
    @CreatedBy
    private String olusturanKullanici;

    @Column(name = "degistiren_kisi")
    @LastModifiedBy
    private String guncelleyenKullanici;

//    @Column(name = "silindi", nullable = false)
//    private boolean silindi = false;

    @Version
    @Column(name = "versiyon", nullable = false)
    private Long versiyon = 1L;

    @Override
    public boolean isNew() {
        return null == getId();
    }
}

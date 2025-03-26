package tr.org.turksat.common.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SoftDelete;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners({AuditingEntityListener.class})
@Setter
@Getter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@SoftDelete(columnName = "silindi")
public abstract class BaseEntity implements Persistable<Long> {
    @Id
    @TableGenerator(name = "hibernate_sequences", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "hibernate_sequences")
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "olusturulma_zamani", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime olusturulmaTarihi;

    @Column(name = "son_guncelleme_zamani")
    @LastModifiedDate
    private LocalDateTime guncellenmeTarihi;

    @Column(name = "olusturan_kullanici_id", nullable = false, updatable = false)
    @CreatedBy
    private Long olusturanKullaniciId;

    @Column(name = "son_guncelleyen_kullanici_id")
    @LastModifiedBy
    private Long guncelleyenKullaniciId;

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

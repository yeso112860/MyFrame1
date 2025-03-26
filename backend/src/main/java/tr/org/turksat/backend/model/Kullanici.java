package tr.org.turksat.backend.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import tr.org.turksat.backend.model.Interfaces.OrganisationalEntity;
import tr.org.turksat.common.model.BaseEntity;

@Entity
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(callSuper = true)
@Table(name = "kullanici")
public class Kullanici extends BaseEntity implements OrganisationalEntity {
    private @Column(name = "kullanici_adi", nullable = false)String kullaniciAdi;
    private String ad;
    private String soyad;
    private boolean enabled = true;
    private @Column(name = "eposta", length = 100)String ePosta;
    @Column(name = "resim_id")
    private Long resimId;
    private @ManyToOne Birim birim;
    @Column(name = "unvan")
    private String unvan;
}

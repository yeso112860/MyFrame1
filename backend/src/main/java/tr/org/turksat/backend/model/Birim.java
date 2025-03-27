package tr.org.turksat.backend.model;

import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.*;

import jakarta.persistence.*;
import org.hibernate.type.SqlTypes;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;
import tr.org.turksat.backend.model.Interfaces.OrganisationalEntity;
import tr.org.turksat.common.model.BaseEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="birim")
@Inheritance(strategy= InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="tip", discriminatorType=DiscriminatorType.STRING)
@DiscriminatorValue("BIRIM")
public class Birim extends BaseEntity implements OrganisationalEntity {
    private static final String BIGPYD = "BIGPYD";

    @Column(name = "ad", nullable = false)
    private String ad;

    @Column(name = "kisa_ad", nullable = false)
    private String kisaAd;

    @ManyToOne
    @ShallowReference
    @JoinColumn(name = "ust_birim_id")
    private Birim ustBirim;

    @Column(name = "eposta")
    private String eposta;

    @Column(name = "telefon")
    private String telefon;

    @Column(name = "faks")
    private String faks;

    @Column(name = "idari_kimlik_kodu")
    private String idariKimlikKodu;

    @Column(name = "adres", length = 5000)
    private String adres;

    @Column(name = "hiyerarsi", nullable = false)
    private String hiyerarsi;

    @Column(name = "aktif")
    private boolean aktif=true;

    @Column(name = "ifs_birim_id")
    private Long ifsBirimId;

    @OneToMany(mappedBy = "ustBirim")
    @OrderBy("ad")
    @DiffIgnore
    private List<Birim> altBirimler = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "organizasyon_id")
    @ShallowReference
    private Organizasyon organizasyon;

    @Formula("(SELECT COUNT(*) FROM birim f WHERE f.silindi=false and id = f.ust_birim_id )")
    private long childCount;
}

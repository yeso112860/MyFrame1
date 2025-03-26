package tr.org.turksat.backend.model;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Setter
@Getter
@Entity
@DiscriminatorValue("ORGANIZASYON")
public class Organizasyon extends Birim {
    @Column(name = "logo_path")
    private String logoPath;
}

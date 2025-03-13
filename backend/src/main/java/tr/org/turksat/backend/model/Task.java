package tr.org.turksat.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "item")
@Getter
@Setter
public class Task extends BaseModel {
    private @NotNull @Column(columnDefinition = "text") String title;
    private @Column(columnDefinition = "text") String description;
    private @Column(columnDefinition = "text") String author;
    private @Column(columnDefinition = "text") String publisher;
    private @Column(columnDefinition = "text") String imageUrl;
    private @Column(columnDefinition = "text") String category;
    @ManyToOne
    private Kullanici kullanici;
}

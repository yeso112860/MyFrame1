package tr.org.turksat.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import tr.org.turksat.common.model.BaseEntity;

@Entity
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(callSuper = true)
@Table(name = "kullanici")
public class Kullanici extends BaseEntity {
    private @Column(columnDefinition = "text") String username;
    private @Column(columnDefinition = "text") String password;
    private @Column(columnDefinition = "text") String email;
    private @Column(columnDefinition = "text") String firstName;
    private @Column(columnDefinition = "text") String lastName;
    private @Column(columnDefinition = "text") String phone;
    private @Column(columnDefinition = "text") String imageUrl;
    private @Column(columnDefinition = "text") String bio;
}

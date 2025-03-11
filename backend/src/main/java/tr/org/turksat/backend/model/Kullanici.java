package tr.org.turksat.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "kullanici")
@Getter
@Setter
public class Kullanici extends BaseModel {
    private @Column(columnDefinition = "text") String username;
    private @Column(columnDefinition = "text") String password;
    private @Column(columnDefinition = "text") String email;
    private @Column(columnDefinition = "text") String firstName;
    private @Column(columnDefinition = "text") String lastName;
    private @Column(columnDefinition = "text") String phone;
    private @Column(columnDefinition = "text") String imageUrl;
    private @Column(columnDefinition = "text") String bio;
}

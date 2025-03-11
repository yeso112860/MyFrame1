package tr.org.turksat.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tr.org.turksat.backend.model.Kullanici;

import java.util.UUID;

public interface KullaniciRepository extends JpaRepository<Kullanici, UUID> {
}

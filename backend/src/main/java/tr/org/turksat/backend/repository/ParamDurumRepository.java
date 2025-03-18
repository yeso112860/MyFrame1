package tr.org.turksat.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tr.org.turksat.backend.model.ParamDurum;

import java.util.UUID;

public interface ParamDurumRepository extends JpaRepository<ParamDurum, UUID> {
}
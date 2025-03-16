package tr.org.turksat.backend.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ParamDurumRepository extends JpaRepository<ParamDurum, UUID> {
}
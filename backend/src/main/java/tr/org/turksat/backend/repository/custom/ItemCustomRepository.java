package tr.org.turksat.backend.repository.custom;

import org.springframework.stereotype.Repository;
import tr.org.turksat.backend.model.Item;
import tr.org.turksat.backend.model.Kullanici;

import java.util.Set;

@Repository
public interface ItemCustomRepository {
    Set<Item> findByUser(Kullanici kullanici);
}
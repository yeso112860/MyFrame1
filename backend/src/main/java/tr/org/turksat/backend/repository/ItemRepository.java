package tr.org.turksat.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;
import tr.org.turksat.backend.model.Item;
import tr.org.turksat.backend.repository.custom.ItemCustomRepository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ItemRepository extends JpaRepository<Item, UUID>, QuerydslPredicateExecutor<Item>, ItemCustomRepository {
    List<Item> findByTitle(String title);
}
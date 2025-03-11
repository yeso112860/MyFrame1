package tr.org.turksat.backend.repository.custom.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tr.org.turksat.backend.model.Item;
import tr.org.turksat.backend.model.QItem;
import tr.org.turksat.backend.model.Kullanici;
import tr.org.turksat.backend.repository.custom.ItemCustomRepository;

import java.util.LinkedHashSet;
import java.util.Set;

@Repository
public class ItemCustomRepositoryImpl implements ItemCustomRepository {

    private final EntityManager entityManager;

    @Autowired
    public ItemCustomRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Set<Item> findByUser(Kullanici kullanici) {
        JPAQuery<Item> query = new JPAQuery<>(entityManager);
        QItem qItem = QItem.item;

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(qItem.kullanici().eq(kullanici));

        return new LinkedHashSet<>(query.select(qItem).from(qItem).where(builder)
                .orderBy(qItem.title.asc()).fetch());
    }
}

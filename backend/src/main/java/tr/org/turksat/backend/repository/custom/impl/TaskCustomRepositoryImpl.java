package tr.org.turksat.backend.repository.custom.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tr.org.turksat.backend.model.QKullanici;
import tr.org.turksat.backend.model.QParamDurum;
import tr.org.turksat.backend.model.QTask;
import tr.org.turksat.backend.model.dto.ParameterDto;
import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.repository.custom.TaskCustomRepository;

import java.util.List;

@Repository
public class TaskCustomRepositoryImpl implements TaskCustomRepository {

    private final EntityManager entityManager;

    @Autowired
    public TaskCustomRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<ParameterDto> getStatusParameters() {
        JPAQuery<ParameterDto> query = new JPAQuery<>(entityManager);
        QParamDurum par = QParamDurum.paramDurum;
        query.from(par);
        query.select(Projections.bean(ParameterDto.class, par.id, par.label));
        return query.fetch();
    }

    public List<ParameterDto> getPeople() {
        JPAQuery<ParameterDto> query = new JPAQuery<>(entityManager);
        QKullanici kullanici = QKullanici.kullanici;
        query.from(kullanici);
        query.select(Projections.bean(ParameterDto.class, kullanici.id, kullanici.firstName.as("label")));
        return query.fetch();
    }

    @Override
    public List<TaskDto> findAllDto() {
        JPAQuery<TaskDto> query = new JPAQuery<>(entityManager);
        QTask qt = QTask.task;
        query.from(qt);
        QKullanici ab = new QKullanici("ab"), at = new QKullanici("at");
        QParamDurum par = QParamDurum.paramDurum;
        query.leftJoin(qt.assignedTo(), at);
        query.leftJoin(qt.assignedBy(), ab);
        query.leftJoin(qt.durum(), par);
        query.select(Projections.bean(TaskDto.class,
                qt.id, qt.title, qt.description,qt.deadline,
                Projections.bean(ParameterDto.class, ab.id, ab.firstName.as("label")).as("assignedBy"),
                Projections.constructor(ParameterDto.class, at.id, at.firstName).as("assignedTo"),
                Projections.constructor(ParameterDto.class, par.id, par.label).as("durum")
        ));
        return query.fetch();
    }

//    public Set<Task> findByAssignedTo(Kullanici kullanici) {
//        JPAQuery<Task> query = new JPAQuery<>(entityManager);
//        QTask qTask = QTask.task;
//
//        BooleanBuilder builder = new BooleanBuilder();
//        builder.and(qTask.assignedTo().eq(kullanici));
//
//        return new LinkedHashSet<>(query.select(qTask).from(qTask).where(builder)
//                .orderBy(qTask.title.asc()).fetch());
//    }
}

package tr.org.turksat.backend.repository;

import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;
import tr.org.turksat.backend.model.Task;
import tr.org.turksat.backend.repository.custom.TaskCustomRepository;
import tr.org.turksat.common.repository.BaseRepository;

@Repository
@JaversSpringDataAuditable
public interface TaskRepository extends JpaRepository<Task, Long>, QuerydslPredicateExecutor<Task>, TaskCustomRepository, BaseRepository<Task, Long> {
}
package tr.org.turksat.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;
import tr.org.turksat.backend.model.Task;
import tr.org.turksat.backend.repository.custom.TaskCustomRepository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID>, QuerydslPredicateExecutor<Task>, TaskCustomRepository {
    List<Task> findByTitle(String title);
}
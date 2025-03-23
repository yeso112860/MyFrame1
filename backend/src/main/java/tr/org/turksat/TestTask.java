package tr.org.turksat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tr.org.turksat.backend.model.Comment;
import tr.org.turksat.backend.model.Task;
import tr.org.turksat.backend.model.TaskPriority;
import tr.org.turksat.backend.repository.TaskRepository;

import java.time.ZonedDateTime;

//@Component
public class TestTask implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        Task t = new Task();
        t.setTitle("Test Task");
        t.setDescription("This is a test task");
        t.setDueDate(ZonedDateTime.now());
        t.setPriority(TaskPriority.LOW);
        Comment e = new Comment();
        e.setDate(ZonedDateTime.now());
        e.setUser("Test User");
        e.setContent("This is a test task");
        t.getComments().add(e);
        taskRepository.save(t);
    }

    @Autowired
    private TaskRepository taskRepository;
}

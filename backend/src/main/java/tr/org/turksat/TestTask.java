package tr.org.turksat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tr.org.turksat.backend.model.Comment;
import tr.org.turksat.backend.model.Task;
import tr.org.turksat.backend.model.TaskHistory;
import tr.org.turksat.backend.model.TaskPriority;
import tr.org.turksat.backend.repository.TaskRepository;

import java.time.ZonedDateTime;
import java.util.List;

@Component
public class TestTask implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        List<Task> all = taskRepository.findAll();
        for (Task task : all) {
            TaskHistory taskHistory = new TaskHistory();
            taskHistory.setBy("Sytem");
            taskHistory.setDate(ZonedDateTime.now());
            taskHistory.setNote(task.getAssignedBy().getAd() + " " + task.getAssignedBy().getSoyad() + " tarafından oluşturuldu");
            task.setHistory(List.of(taskHistory));
            taskRepository.save(task);
        }
    }

    @Autowired
    private TaskRepository taskRepository;
}

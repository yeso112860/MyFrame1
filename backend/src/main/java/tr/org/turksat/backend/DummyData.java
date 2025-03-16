package tr.org.turksat.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tr.org.turksat.backend.model.Kullanici;
import tr.org.turksat.backend.model.ParamDurum;
import tr.org.turksat.backend.model.ParamDurumRepository;
import tr.org.turksat.backend.model.dto.KullaniciDto;
import tr.org.turksat.backend.model.dto.ParameterDto;
import tr.org.turksat.backend.model.dto.TaskDto;
import tr.org.turksat.backend.repository.KullaniciRepository;
import tr.org.turksat.backend.service.SampleService;

import java.util.List;
import java.util.UUID;

//@Component
public class DummyData implements CommandLineRunner {
    @Autowired
    private SampleService service;

    @Autowired
    private KullaniciRepository repository;
    @Autowired
    private ParamDurumRepository paramDurumRepository;


    @Override
    public void run(String... args) throws Exception {
        KullaniciDto kullanici = new KullaniciDto();
        kullanici.setFirstName("Kullanici1");
        kullanici.setLastName("Kullanici1");
        service.addUser(kullanici);
        kullanici = new KullaniciDto();
        kullanici.setFirstName("Kullanici2");
        kullanici.setLastName("Kullanici2");
        service.addUser(kullanici);
        List<Kullanici> all = repository.findAll();
        ParameterDto p1 = new ParameterDto(), p2 = new ParameterDto();
        p1.setId(all.get(0).getId());
        p2.setId(all.get(1).getId());
        TaskDto task = new TaskDto();
        task.setTitle("El-Ikdu'l-manzum fi Zikri Efazıli'r-Rum - Ali b. Bali'nin Şaka'ik Zeyli");
        task.setDescription("CİLTLİ inceleme, eleştirmeli metin, çeviri 723 sayfa. 17x24 cm");
        task.setAssignedTo(p2);
        task.setAssignedBy(p1);
        service.addTask(task);
        task = new TaskDto();
        task.setTitle("Muhibbi Divanı : kendi hattıyla");
        task.setDescription("Divan şiiri--İnceleme Kanuni Sultan Süleyman, 1494-1566 Türkiye Yazma Eserler Kurumu Başkanlığı Yayınları ; 23. Edebiyat ve Sanat Serisi ; 7.");
        task.setAssignedTo(p2);
        task.setAssignedBy(p1);
        service.addTask(task);
    }
}

package tr.org.turksat.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tr.org.turksat.backend.model.dto.ItemDto;
import tr.org.turksat.backend.service.SampleService;

@Component
public class DummyData implements CommandLineRunner {
    @Autowired
    private SampleService service;

    @Override
    public void run(String... args) throws Exception {
        ItemDto item = new ItemDto();
        item.setTitle("İslam Ülkelerinde İdeolojik Savaş");
        item.setDescription("İslam Ülkelerinde İdeolojik Savaş, Ebül-Hasan A. Nedevi tarafından kaleme alınmıştır. Kitap 1977 yılında Çığır Yayınları tarafından [İstanbul] yayınlanmıştır. Bu baskının çevirisi Akif Nuri tarafından yapılmıştır. 272 sayfadır. Sayfa bilgisi 272 s. olarak belirtilmiştir. İslam Ülkelerinde İdeolojik Savaş adlı eser Türkçe dilindedir.");
        item.setAuthor("Ebül-Hasan A. Nedevi");
        item.setPublisher("Çığır Yayınları, 1977");
        item.setImageUrl("https://s3.cloud.ngn.com.tr/kitantik/images/2024-05-13/1br9qfylw48q1731pzh.jpg");
        service.addItem(item);
        item = new ItemDto();
        item.setTitle("El-Ikdu'l-manzum fi Zikri Efazıli'r-Rum - Ali b. Bali'nin Şaka'ik Zeyli");
        item.setDescription("CİLTLİ inceleme, eleştirmeli metin, çeviri 723 sayfa. 17x24 cm");
        item.setAuthor("Suat Donuk");
        item.setPublisher("Türkiye Yazma Eserler Kurumu, 2018");
        item.setImageUrl("https://static.nadirkitap.com/fotograf/116542/14/Kitap_2019082815293511.jpg");
        service.addItem(item);
        item = new ItemDto();
        item.setTitle("Muhibbi Divanı : kendi hattıyla");
        item.setDescription("Divan şiiri--İnceleme Kanuni Sultan Süleyman, 1494-1566 Türkiye Yazma Eserler Kurumu Başkanlığı Yayınları ; 23. Edebiyat ve Sanat Serisi ; 7.");
        item.setAuthor("Kanuni Sultan Süleyman");
        item.setPublisher("Türkiye Yazma Eserler Kurumu Başkanlığı Yayınları 2014");
        item.setImageUrl("https://static.nadirkitap.com/fotograf/91729/40/Kitap_20250212155029917293.jpg");
        service.addItem(item);
    }
}

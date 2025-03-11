package tr.org.turksat.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.org.turksat.backend.model.Item;
import tr.org.turksat.backend.model.dto.ItemDto;
import tr.org.turksat.backend.model.dto.KullaniciDto;
import tr.org.turksat.backend.model.mapper.ItemMapper;
import tr.org.turksat.backend.model.mapper.KullaniciMapper;
import tr.org.turksat.backend.repository.ItemRepository;
import tr.org.turksat.backend.repository.KullaniciRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SampleService {
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private ItemMapper itemMapper;
    @Autowired
    private KullaniciRepository kullaniciRepository;
    @Autowired
    private KullaniciMapper kullaniciMapper;

    public List<ItemDto> getItems() {
        return itemMapper.toDtoList(itemRepository.findAll());
    }

    public ItemDto addItem(ItemDto itemDto) {
        Optional<Item> byId;
        if(itemDto.getId() != null)
            byId = itemRepository.findById(itemDto.getId());
        else byId = Optional.empty();
        Item entity;
        if (byId.isEmpty()) {
            entity = itemMapper.toEntity(itemDto);
            entity.setId(UUID.randomUUID());
        } else {
            entity = byId.get();
            itemMapper.updateEntity(entity, itemDto);
        }
        return itemMapper.toDto(itemRepository.save(entity));
    }

    public void deleteItem(UUID id) {
        itemRepository.deleteById(id);
    }

    public List<KullaniciDto> getKullanicilar() {
        return kullaniciMapper.toDtoList(kullaniciRepository.findAll());
    }
}
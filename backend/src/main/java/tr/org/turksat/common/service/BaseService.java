package tr.org.turksat.common.service;

import com.querydsl.core.types.Predicate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import tr.org.turksat.aop.exception.BusinessException;
import tr.org.turksat.common.constant.CommonMessageConstant;
import tr.org.turksat.common.mapper.BaseMapper;
import tr.org.turksat.common.model.BaseEntity;
import tr.org.turksat.common.model.dto.*;
import tr.org.turksat.common.repository.BaseRepository;
import tr.org.turksat.common.util.SearchUtil;

import java.util.*;

@Aspect
@Slf4j
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class BaseService<RepositoryType extends BaseRepository<EntityType, UUID>,
        MapperType extends BaseMapper<DtoType, EntityType, RequestDtoType, ResponseDtoType>,
        EntityType extends BaseEntity, DtoType extends BaseDto, RequestDtoType, ResponseDtoType> implements BaseServiceInterface<DtoType, RequestDtoType, ResponseDtoType> {
    protected final RepositoryType repository;

    protected final MapperType mapper;

    @Autowired
    private ExporterService exporterService;

    @Autowired
    protected ResponseService responseService;

    @Autowired
    protected ApplicationContext context;

    @Override
    public DtoType kaydet(DtoType dto) {
        return mapper.entityToDto(repository.save(mapper.dtoToEntity(dto)));
    }


    @Override
    @Transactional
    public BaseResponseDto<ResponseDtoType> kaydet(BaseRequestDto<RequestDtoType> baseRequestDto) {
        DtoType dto = mapper.requestToDto(baseRequestDto.getObject());
        if (dto != null) {
            dto = kaydet(dto);
        }
        return createResponseDto(baseRequestDto, mapper.dtoToResponse(dto), 1, CommonMessageConstant.ORTAK_KAYIT_EKLENDI, Boolean.TRUE);
    }

    @Override
    @SneakyThrows
    public DtoType bul(UUID uid) {
        return mapper.entityToDto(repository.findById(uid).
                orElseThrow(() -> new BusinessException("ortak.kayit.bulunamadi", HttpStatus.NOT_FOUND)));
    }

    @Override
    public BaseResponseDto<ResponseDtoType> bul(BaseRequestDto<UUID> baseRequestDto) {
        UUID id = baseRequestDto.getObject();
        if (id == null) {
            throw new BusinessException("ortak.id.bos.olamaz", HttpStatus.BAD_REQUEST);
        } else {
            DtoType dto = bul(id);
            ResponseDtoType response = mapper.dtoToResponse(dto);
            return createResponseDto(baseRequestDto, response, 1, CommonMessageConstant.ORTAK_KAYIT_BULUNDU, Boolean.TRUE);
        }
    }

    @Override
    public BaseResponseDto<List<ResponseDtoType>> aktifHepsiniBul(BaseRequestDto<RequestDtoType> baseRequestDto) {
        List<FilterDto> filters = Optional.ofNullable(baseRequestDto.getFilters()).orElseGet(ArrayList::new);
        filters.add(FilterDto.builder().field("durum").operator("equals").value("1").build());
        baseRequestDto.setFilters(filters);
        return hepsiniBul(baseRequestDto);
    }

    @Override
    public void sil(UUID id) {
        if (id == null) {
            throw new BusinessException("ortak.id.bos.olamaz", HttpStatus.BAD_REQUEST);
        } else {
            repository.deleteById(id);
        }
    }

    @Override
    public BaseResponseDto sil(BaseRequestDto<UUID> baseRequestDto) {
        UUID katalogID = baseRequestDto.getObject();
        if (katalogID != null) {
            sil(katalogID);
            return createResponseDto(baseRequestDto, null, 0, CommonMessageConstant.ORTAK_KAYIT_SILINDI, Boolean.TRUE);
        }
        return createResponseDto(baseRequestDto, null, 0, CommonMessageConstant.ORTAK_KAYIT_SILINEMEDI, Boolean.FALSE);
    }

    @Override
    public Set<DtoType> kaydet(Set<DtoType> dtoList) {
        return mapper.entitySetToDtoSet(Set.copyOf(repository.saveAll(mapper.dtoSetToEntitySet(dtoList))));
    }


    @Override
    public DtoType guncelle(DtoType dto) {
        return kaydet(dto);
    }

    @Override
    public Set<DtoType> guncelle(Set<DtoType> dtoSet) {
        return kaydet(dtoSet);
    }

    @Override
    public void sil(List<DtoType> dtoList) {
        repository.deleteAll(mapper.dtoListToEntityList(dtoList));
    }

    @Override
    public List<DtoType> hepsiniBul() {
        return mapper.entityListToDtoList(repository.findAll());
    }

    @Override
    public List<DtoType> hepsiniBul(int page, int size) {
        return mapper.entityListToDtoList(repository.findAll(PageRequest.of(page, size)).getContent());
    }

    @Override
    public List<DtoType> hepsiniBul(Predicate predicate, int page, int size) {
        return mapper.entityListToDtoList(repository.findAll(predicate, Pageable.ofSize(size).withPage(page)).getContent());
    }

    @Override
    public List<DtoType> hepsiniBul(Specification specification, Pageable pageable) {
        return mapper.entityListToDtoList(repository.findAll(specification, pageable).getContent());
    }

    @Override
    public List<DtoType> hepsiniBul(SearchObject object) {
        return mapper.entityListToDtoList(repository.findAll(object.getSpec(), object.getPageable()).getContent());
    }

    @Override
    public BaseResponseDto<List<ResponseDtoType>> hepsiniBul(BaseRequestDto<RequestDtoType> baseRequestDto) {
        SearchObject searchObject = SearchUtil.searchEntity(baseRequestDto, getEntityType());
        List<DtoType> dtoTypeList = this.hepsiniBul(searchObject);
        if (!CollectionUtils.isEmpty(dtoTypeList)) {
            List<ResponseDtoType> responseDtoTypeList = mapper.dtoListToResponseList(dtoTypeList);
            return this.createResponseDto(baseRequestDto, responseDtoTypeList, say(searchObject), CommonMessageConstant.ORTAK_KAYIT_BULUNDU, Boolean.TRUE);
        } else {
            return this.createResponseDto(baseRequestDto, null, 0, CommonMessageConstant.ORTAK_KAYIT_BULUNAMADI, Boolean.FALSE);
        }
    }

    @Override
    public long say() {
        return repository.count();
    }

    public long say(SearchObject object) {
        return repository.count(object.getSpec());
    }

    @Override
    public BaseResponseDto createResponseDto(BaseRequestDto baseRequestDto, Object object, long count, String message, Boolean successStatus) {
        return responseService.createResponseDto(baseRequestDto, object, count, message, successStatus, say());
    }

    @Override
    public ResourceDto export(BaseRequestDto baseRequestDto, List<DtoType> dtoList) {
        if (CollectionUtils.isEmpty(baseRequestDto.getFieldNames())) {
            log.error("FieldNames not found");
            return null;
        }
        String fileName = getEntityType().getSimpleName();
        return exporterService.export(baseRequestDto, dtoList, fileName);
    }

    @Override
    public ResourceDto export(BaseRequestDto baseRequestDto) {
        if (CollectionUtils.isEmpty(baseRequestDto.getFieldNames())) {
            log.error("FieldNames not found");
            return null;
        }
        Class<EntityType> entityTypeClass = getEntityType();
        baseRequestDto.setPage(0);
        baseRequestDto.setSize(Integer.MAX_VALUE);
        List<DtoType> dtoTypeList = hepsiniBul(SearchUtil.searchEntity(baseRequestDto, entityTypeClass));
        return export(baseRequestDto, dtoTypeList);
    }

    private Class<EntityType> getEntityType() {
        java.lang.reflect.Type type = getClass().getGenericSuperclass();
        Class<EntityType> entityTypeClass;
        if (type instanceof java.lang.reflect.ParameterizedType) {
            entityTypeClass = (Class<EntityType>) ((java.lang.reflect.ParameterizedType) type).getActualTypeArguments()[2];
        } else {
            throw new RuntimeException("Unable to determine entity type.");
        }
        return entityTypeClass;
    }

    private Class<DtoType> getDtoType() {
        java.lang.reflect.Type type = getClass().getGenericSuperclass();
        Class<DtoType> dtoTypeClass;
        if (type instanceof java.lang.reflect.ParameterizedType) {
            dtoTypeClass = (Class<DtoType>) ((java.lang.reflect.ParameterizedType) type).getActualTypeArguments()[3];
        } else {
            throw new RuntimeException("Unable to determine entity type.");
        }
        return dtoTypeClass;
    }

    @Override
    public List<HistoryDto> getHistory(BaseRequestDto<HistoryDto> baseRequestDto) {
        HistoryDto historyDto = baseRequestDto.getObject();
        EntityHistoryService entityHistoryService = this.context.getBean(EntityHistoryService.class);
        List<HistoryDto> cdoSnapshotList = entityHistoryService.getEntityHistory(getEntityType(), historyDto.getId());
        return cdoSnapshotList;
    }
}
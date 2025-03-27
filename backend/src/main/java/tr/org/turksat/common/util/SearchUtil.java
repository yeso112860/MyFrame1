package tr.org.turksat.common.util;

import jakarta.persistence.MapsId;
import jakarta.persistence.criteria.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.CollectionUtils;
import tr.org.turksat.common.annotation.SearchEntity;
import tr.org.turksat.common.constant.CommonMessageConstant;
import tr.org.turksat.common.model.BaseEntity;
import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.FilterDto;
import tr.org.turksat.common.model.dto.SearchObject;
import tr.org.turksat.common.model.dto.SortDto;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
public class SearchUtil {
    public static Specification createSpecification(List<FilterDto> filterList, Class entityClass, String searchKey) {

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            List<Predicate> orPredicates = new ArrayList<>();
            List<FilterDto> filters = filterList;

            filters = createORFiltersForSearchKey(searchKey, entityClass, root, filters);
            //Filter null Kontrolü
            if (CollectionUtils.isEmpty(filters)) {
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }

            for (FilterDto filter : filters) {
                String field = filter.getField();
                String operator = filter.getOperator().toLowerCase(new Locale("en", "US"));

                try {
                    String entityNestedPath = null;
                    Class<?> fieldType = null;
                    Expression<?> rootExpression;
                    Field entityField = getField(entityClass, field);
                    // if (entityField == null) {
                    //   entityField = isBaseEntityField(entityClass, field);
                    if (entityField == null) {
                        entityNestedPath = FieldResolver.resolveField(entityClass, field);
                        if (entityNestedPath != null && !entityNestedPath.equalsIgnoreCase("")) {
                            fieldType = String.class;
                        } else {
                            continue;
                            //throw new NoSuchFieldException("Field " + field + " not found on class " + entityClass.getName());
                        }
                    }
                    //}
                    if (fieldType == null) {
                        fieldType = entityField.getType();
                    }
                    // Eğer alan BaseEntity türündeyse, join işlemini kullanarak arama yapıyoruz
                    if (fieldType.getSuperclass() != null && fieldType.getSuperclass().equals(BaseEntity.class)) {
                        rootExpression = getJoinExpression(root, entityClass, field);
                    } else if (fieldType.getClass().equals(LocalDateTime.class)) {
                        rootExpression = (Expression<LocalDateTime>) root.get(field);
                    } else if (entityNestedPath != null && !entityNestedPath.equalsIgnoreCase("")) {
                        rootExpression = (Expression<String>) getJoinExpressionX(root, entityClass, entityNestedPath);
                    } else {
                        rootExpression = convertRootAsFieldType(criteriaBuilder, root, field, fieldType);
                    }

                    //Value değerinin boş gelme durumu kontrol ediliyor.
                    Comparable<?> convertedValue;
                    if (filter.getOperator().toLowerCase() == "isempty") {
                        convertedValue = null;
                    } else {
                        if (filter.getValue() != null) {
                            convertedValue = convertValueAsFieldType(filter.getValue(), fieldType);
                        } else {
                            throw new NoSuchFieldException("filter.getValue() not found..");
                        }
                    }

                    Predicate predicate = null;
                    switch (operator) {
                        case "equals":
                            if (String.class.equals(fieldType)) {
                                predicate = (criteriaBuilder.equal(criteriaBuilder.lower(rootExpression.as(String.class)), convertedValue));
                            } else {
                                predicate = (criteriaBuilder.equal(rootExpression, convertedValue));
                            }
                            break;
                        case "notequals":
                            predicate = (criteriaBuilder.notEqual(rootExpression, convertedValue));
                            break;
                        case "contains":
                            if (String.class.equals(fieldType)) {
                                predicate = (criteriaBuilder.like(criteriaBuilder.lower((Expression<String>) rootExpression), "%" + convertedValue + "%"));
                            } else {
                                predicate = (criteriaBuilder.like(criteriaBuilder.lower(rootExpression.as(String.class)), "%" + convertedValue + "%"));
                            }
                            break;
                        case "notcontains":
                            if (!String.class.equals(fieldType) && LocalDateTime.class.equals(fieldType)) {
                                predicate = (
                                        criteriaBuilder.notLike((Expression<String>) rootExpression, "%" + convertedValue + "%"));
                            } else {
                                predicate = (criteriaBuilder.notLike(criteriaBuilder.lower(rootExpression.as(String.class)), "%" + convertedValue + "%"));
                            }
                            break;
                        case "greaterthan":
                            predicate = (criteriaBuilder.greaterThan(castComparable(rootExpression), (Comparable) convertedValue));
                            break;
                        case "greaterthanorequals":
                            predicate = (criteriaBuilder.greaterThanOrEqualTo(castComparable(rootExpression), (Comparable) convertedValue));
                            break;
                        case "lessthan":
                            predicate = (criteriaBuilder.lessThan(castComparable(rootExpression), (Comparable) convertedValue));
                            break;
                        case "lessthanorequals":
                            predicate = (criteriaBuilder.lessThanOrEqualTo(castComparable(rootExpression), (Comparable) convertedValue));
                            break;
                        case "isempty":
                            if (Collection.class.isAssignableFrom(fieldType)) {
                                predicate = (criteriaBuilder.isEmpty((Expression) rootExpression));
                            } else {
                                predicate = (criteriaBuilder.isNull(rootExpression));
                            }
                            //.add(createIsEmptyPredicate(root, criteriaBuilder, field, fieldType));
                            break;
                        case "isnotempty":
                            if (Collection.class.isAssignableFrom(fieldType)) {
                                predicate = (criteriaBuilder.isNotEmpty((Expression) rootExpression));
                            } else {
                                predicate = (criteriaBuilder.isNotNull(rootExpression));
                            }
                            // predicate = (createIsNotEmptyPredicate(root, criteriaBuilder, field, fieldType));
                            break;
//                        case "between":
//                            if (value instanceof List) {
//                                List<?> values = (List<?>) value;
//                                if (values.size() == 2) {
//                                    predicate = (createBetweenPredicate(root, criteriaBuilder, field, values.get(0), values.get(1), fieldType));
//                                }
//                            }
//                            break;
                        case "startswith":
                            if (String.class.equals(fieldType)) {
                                predicate = (criteriaBuilder.like(criteriaBuilder.lower((Expression<String>) rootExpression), convertedValue + "%"));
                            } else {
                                predicate = (criteriaBuilder.like(criteriaBuilder.lower(rootExpression.as(String.class)), convertedValue + "%"));
                            }
                            break;
                        case "endswith":
                            if (String.class.equals(fieldType)) {
                                predicate = (criteriaBuilder.like(criteriaBuilder.lower((Expression<String>) rootExpression), "%" + convertedValue));
                            } else {
                                predicate = (criteriaBuilder.like(criteriaBuilder.lower(rootExpression.as(String.class)), "%" + convertedValue));
                            }
                            break;
                        case "dateequals":
                            if (LocalDateTime.class.equals(fieldType)) {
                                if (convertedValue.getClass().equals(LocalDate.class)) {

                                    predicate = criteriaBuilder.between(castComparable(rootExpression), (LocalDate) convertedValue, ((LocalDate) convertedValue).plusDays(1));
                                } else {
                                    predicate = criteriaBuilder.between(castComparable(rootExpression), (LocalDateTime) convertedValue, ((LocalDateTime) convertedValue).plusSeconds(1));
                                }
                            }
                            break;
                        case "datenotequals":
                            if (LocalDateTime.class.equals(fieldType)) {
                                predicate = (criteriaBuilder.notEqual(rootExpression, convertedValue));
                            }
                            break;
                        case "dateafter":
                            if (LocalDateTime.class.equals(fieldType)) {
                                predicate = (criteriaBuilder.greaterThan(castComparable(rootExpression), (Comparable) convertedValue));
                            }
                            break;
                        case "datebefore":
                            if (LocalDateTime.class.equals(fieldType)) {
                                predicate = (criteriaBuilder.lessThan(castComparable(rootExpression), (Comparable) convertedValue));
                            }
                            break;
                        default:
                            break;
                    }
                    //AND ve Or filterleri birleştir.
                    if (filter.getCondition().startsWith("and")) {
                        predicates.add(predicate);
                    } else {
                        orPredicates.add(predicate);
                    }
                } catch (NoSuchFieldException e) {
                    log.error(e.getMessage());
                    if (!orPredicates.isEmpty()) {
                        Predicate orPredicate = criteriaBuilder.or(orPredicates.toArray(new Predicate[0]));
                        predicates.add(orPredicate);
                    }
                    if (!predicates.isEmpty()) {
                        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
                    }
                    return null;
                }
            }
            if (!orPredicates.isEmpty()) {
                Predicate orPredicate = criteriaBuilder.or(orPredicates.toArray(new Predicate[0]));
                predicates.add(orPredicate);
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static List<FilterDto> createORFiltersForSearchKey(String searchKey, Class entityClass, Root root, List<FilterDto> filters) {
        if (!Objects.isNull(searchKey)) {
            if (CollectionUtils.isEmpty(filters))
                filters = new ArrayList<>();
            for (Field classField : entityClass.getDeclaredFields()) {
                if (BaseEntity.class.isAssignableFrom(classField.getType())) {
                    // Bulunan BaseEntity türünden alan ile join işlemi yapıyoruz
                    Join<Object, Object> baseEntityJoin = root.join(classField.getName(), JoinType.LEFT);
                    // BaseEntity türetilmiş alanları kontrol ediyoruz ve @SearchEntity anotasyonuna sahip olanları filtrelere ekliyoruz
                    for (Field baseEntityField : classField.getType().getDeclaredFields()) {
                        SearchEntity searchEntityAnnotation = baseEntityField.getAnnotation(SearchEntity.class);
                        if (searchEntityAnnotation != null) {
                            filters.add(FilterDto.builder()
                                    .field(String.valueOf(baseEntityJoin.get(searchEntityAnnotation.name()).alias(searchEntityAnnotation.name())))
                                    .operator("contains")
                                    .value(searchKey)
                                    .condition("orCondition")
                                    .build());
                        }
                    }
                }
                if (classField.getType().equals(String.class)) {
                    filters.add(FilterDto.builder()
                            .field(classField.getName())
                            .operator("contains")
                            .value(searchKey)
                            .condition("orCondition").build());
                } else if (classField.getType().equals(Integer.class) || classField.getType().equals(int.class)) {
                    try {
                        Integer.parseInt(searchKey);
                        filters.add(FilterDto.builder()
                                .field(classField.getName())
                                .operator("equals")
                                .value(searchKey)
                                .condition("orCondition").build());
                    } catch (NumberFormatException e) {
                        log.error("String " + searchKey + "değeri integer'a dönüştürülemez.");
                    }
                }
            }

            for (Field classField : entityClass.getSuperclass().getDeclaredFields()) {
                if (BaseEntity.class.isAssignableFrom(classField.getType())) {
                    // Bulunan BaseEntity türünden alan ile join işlemi yapıyoruz
                    Join<Object, Object> baseEntityJoin = root.join(classField.getName(), JoinType.LEFT);
                    // BaseEntity türetilmiş alanları kontrol ediyoruz ve @SearchEntity anotasyonuna sahip olanları filtrelere ekliyoruz
                    for (Field baseEntityField : classField.getType().getDeclaredFields()) {
                        SearchEntity searchEntityAnnotation = baseEntityField.getAnnotation(SearchEntity.class);
                        if (searchEntityAnnotation != null) {
                            filters.add(FilterDto.builder()
                                    .field(String.valueOf(baseEntityJoin.get(searchEntityAnnotation.name()).alias(searchEntityAnnotation.name())))
                                    .operator("contains")
                                    .value(searchKey)
                                    .condition("orCondition")
                                    .build());
                        }
                    }
                }
                if (classField.getType().equals(String.class)) {
                    filters.add(FilterDto.builder()
                            .field(classField.getName())
                            .operator("contains")
                            .value(searchKey)
                            .condition("orCondition").build());
                } else if (classField.getType().equals(Integer.class) || classField.getType().equals(int.class)) {
                    try {
                        Integer.parseInt(searchKey);
                        filters.add(FilterDto.builder()
                                .field(classField.getName())
                                .operator("equals")
                                .value(searchKey)
                                .condition("orCondition").build());
                    } catch (NumberFormatException e) {
                        log.error("String " + searchKey + "değeri integer'a dönüştürülemez.");
                    }
                }
            }
        }

        return filters;
    }

    /*   // Helper metodu: BaseEntity türünde olup olmadığını kontrol eder
       private static  Field isBaseEntityField(Class<?> entityClass, String fieldName) {
           // FieldName'in son kısmını almak için noktadan bölüyoruz.
           String[] parts = fieldName.split("\\.");
           String lastPart ="";
           if(parts.length == 1){
               lastPart=parts[0];
           }else{
               lastPart = parts[parts.length - 2]; // "altTemaAdi" gibi en son kısmı alır.
           }
           for (Field classField : entityClass.getDeclaredFields()) {
               // Sadece son kısımla karşılaştırma yapıyoruz.
               if (lastPart.startsWith(classField.getName())  && BaseEntity.class.isAssignableFrom(classField.getType())) {
                   return classField;
               }
           }
           return null;
       }*/
    private static <T> Expression<String> getJoinExpressionX(Root<T> root, Class<T> entityClass, String fieldName) {
        String[] fieldSplit = fieldName.split("\\.");
        Join<Object, Object> join = root.join(fieldSplit[0], JoinType.LEFT);
        if (fieldSplit.length >= 2) {
            for (int i = 1; i < fieldSplit.length; i++) {
                if (i == (fieldSplit.length - 1)) {
                    return join.get(fieldSplit[i]).as(String.class);
                }
                join = join.join(fieldSplit[i], JoinType.LEFT);
            }
        }
        return join.as(String.class);

//        Join<Object, Object> join = root.join("altTema", JoinType.LEFT);
//        join=join.join("tema", JoinType.LEFT);
//        join.get( "temaAdi").as(String.class);
    }


    private static <T> Expression<String> getJoinExpression(Root<T> root, Class<T> entityClass, String fieldName) {
        for (Field classField : entityClass.getDeclaredFields()) {
            if (BaseEntity.class.isAssignableFrom(classField.getType())) {
                try {
                    Join<Object, Object> join = root.join(classField.getName(), JoinType.LEFT);
                    return join.get(getBaseEntityField(entityClass, fieldName)).as(String.class);
                } catch (Exception e) {
                    continue;
                }
            }
        }
        //Eğer bulamaz ise @SearchEntity anatasyonuna göre ara
        for (Field classField : entityClass.getDeclaredFields()) {
            // Eğer field BaseEntity türünde bir nesne ise (ör: SistemKod gibi)
            if (BaseEntity.class.isAssignableFrom(classField.getType())) {
                try {
                    // İlk Join işlemini yapıyoruz
                    Join<Object, Object> join = root.join(classField.getName(), JoinType.LEFT);
                    // İç classField'de arama yaparak, SearchEntity anotasyonu olan alanı buluyoruz
                    for (Field nestedField : classField.getType().getDeclaredFields()) {
                        if (nestedField.isAnnotationPresent(SearchEntity.class)) {
                            SearchEntity searchEntity = nestedField.getAnnotation(SearchEntity.class);
                            String subFieldName = fieldName;
                            if (fieldName.contains("Adi")) {
                                subFieldName = fieldName.substring(0, fieldName.lastIndexOf("Adi"));
                            }
                            if (subFieldName.equalsIgnoreCase(classField.getName())) {
                                return join.get(nestedField.getName()).as(String.class);
                            }
                        }
                    }
                } catch (Exception e) {
                    continue; // Eğer hata alırsak diğer alanlara geçiyoruz
                }
            }
        }
        throw new IllegalArgumentException("No join found for field: " + fieldName);
    }

    private static String getBaseEntityField(Class<?> entityClass, String fieldName) {
        // FieldName'in son kısmını almak için noktadan bölüyoruz.
        String[] parts = fieldName.split("\\.");
        String lastPart = parts[parts.length - 1];
        lastPart = lastPart.replaceAll("\\)", "");// "altTemaAdi" gibi en son kısmı alır.

        return lastPart;
    }


    @SuppressWarnings("unchecked")
    private static <T extends Comparable<? super T>> Expression<T> castComparable(Expression<?> expression) {
        return (Expression<T>) expression;
    }

    public static SearchObject searchEntity(BaseRequestDto baseRequestDto, Class classs) {
        List<FilterDto> filters = baseRequestDto.getFilters();
        Specification spec = null;

        if (!CollectionUtils.isEmpty(filters) || !Objects.isNull(baseRequestDto.getStringSearchKey())) {
            spec = SearchUtil.createSpecification(filters, classs, baseRequestDto.getStringSearchKey());
        }

        Sort sort = Sort.unsorted();
        if (!CollectionUtils.isEmpty(baseRequestDto.getSortList())) {
            for (int i = 0; i < baseRequestDto.getSortList().size(); i++) {
                Sort.Direction direction = Sort.Direction.fromString(((SortDto) baseRequestDto.getSortList().get(i)).getSortDirection());
                String field = ((SortDto) baseRequestDto.getSortList().get(i)).getField();
                // Dinamik olarak alanı bulmak için
                // Eğer field doğru şekilde resolve edilmişse sort'a ekle
                String sortField = FieldResolver.resolveField(classs, field);
                if (sortField != null) {
                    sort = sort.and(Sort.by(direction, sortField));
                } else {
                    sort = Sort.unsorted();
                    log.error(CommonMessageConstant.FIELD_NOT_FOUND);
                    log.error("Field " + field + " not found in " + classs.getName());
                }
            }
        } else {
            if (classs.getSuperclass() != null && classs.getSuperclass().equals(BaseEntity.class)) {
                sort = Sort.by(
                        new Sort.Order(Sort.Direction.DESC, "guncellenmeTarihi"),//.nullsLast(),
                        new Sort.Order(Sort.Direction.DESC, "olusturulmaTarihi")
                );
            } else {
                sort = Sort.by(new Sort.Order(Sort.Direction.DESC, "id"));
            }
        }
        if (baseRequestDto.getSize() == -1) {
            baseRequestDto.setSize(Integer.MAX_VALUE);
        }
        Pageable pageable = PageRequest.of(baseRequestDto.getPage(), baseRequestDto.getSize(), sort);
        return new SearchObject(spec, pageable);
    }

    private static Field getField(Class<?> clazz, String fieldName) {
        if (Objects.isNull(fieldName)) return null;
        Class<?> currentClass = clazz;
        while (currentClass != null) {
            try {
                return currentClass.getDeclaredField(fieldName);
            } catch (NoSuchFieldException e) {
                currentClass = currentClass.getSuperclass();
            }
        }
        return null;
    }

    private static Expression<? extends Comparable<?>> convertRootAsFieldType(CriteriaBuilder criteriaBuilder, Root<?> root, String field, Class<?> fieldType) {
        if (String.class.equals(fieldType)) {
            return criteriaBuilder.lower(root.get(field));
        } else {
            return root.get(field);
        }
    }

    private static Comparable<?> convertValueAsFieldType(Object value, Class<?> fieldType) {
        try {
            if (String.class.equals(fieldType)) {
                return ((String) value).toLowerCase(new Locale("tr", "TR"));
            } else if (UUID.class.equals(fieldType)) {
                return UUID.fromString((String) value);
            } else if (Integer.class.equals(fieldType)) {
                return Integer.valueOf((String) value).intValue();
            } else if (short.class.equals(fieldType)) {
                return Short.valueOf((String) value).shortValue();
            } else if (Boolean.class.equals(fieldType)) {
                return Boolean.valueOf((String) value).booleanValue();
            } else if (boolean.class.equals(fieldType)) {
                return Boolean.valueOf((String) value).booleanValue();
            } else if (LocalDateTime.class.equals(fieldType)) {
                if (value.toString().length() > 10)
                    return LocalDateTime.parse(String.valueOf(value), Pattern.DATE_TIME_FORMATTER);
                else
                    return LocalDate.parse(String.valueOf(value), Pattern.DATE_FORMATTER);

            } else if (Double.class.equals(fieldType)) {
                return Double.valueOf((String) value).doubleValue();
            } else if (BigDecimal.class.equals(fieldType)) {
                return BigDecimal.valueOf(Double.parseDouble(value.toString()));
            } else {
                return (Comparable<?>) value;
            }
        } catch (IllegalArgumentException e) {
            //e.printStackTrace();
            return ((String) value).toLowerCase(new Locale("tr", "TR"));
        }
    }

    public class FieldResolver {
        public static String resolveField(Class<?> entityClass, String fieldName) {
            try {
                // İlk olarak sınıfın kendi alanında arama yap
                Field field = entityClass.getDeclaredField(fieldName);
                return fieldName;
            } catch (NoSuchFieldException e) {
                // Superclass ve nested field araması için recursive arama başlat
                return findInSuperOrNestedFields(entityClass, fieldName);
            }
        }

        private static String findInSuperOrNestedFields(Class<?> entityClass, String fieldName) {
            // Superclass'ta arama yap
            if (entityClass.getSuperclass() != null) {
                try {
                    Field field = entityClass.getSuperclass().getDeclaredField(fieldName);
                    return fieldName;
                } catch (NoSuchFieldException ignored) {
                    // Superclass'ta bulamazsak nested field'lara bakacağız
                }
            }

            // Sınıftaki tüm alanları gez
            for (Field field : entityClass.getDeclaredFields()) {
                if (!field.getType().isPrimitive() && !field.getType().getName().startsWith("java")) {
                    // Nested alanlarda arama yap
                    String nestedFieldPath = searchNestedFields(field, fieldName);
                    if (nestedFieldPath != null) {
                        return field.getName() + "." + nestedFieldPath;
                    }
                }
            }

            //SistemKod gibi Entity'ler için yazıldı. Field adi birebir uyuşmadığında anatasyonlara bakılır.
            if (fieldName.contains("Adi")) {
                fieldName = fieldName.substring(0, fieldName.lastIndexOf("Adi"));
                for (Field field : entityClass.getDeclaredFields()) {
                    // Field üzerindeki MapsId anotasyonunu kontrol et
                    MapsId mapsIdAnnotation = field.getAnnotation(MapsId.class);
                    if (mapsIdAnnotation != null && (mapsIdAnnotation.value().equals(fieldName) || mapsIdAnnotation.value().startsWith(fieldName))) {
                        // Eğer MapsId erisimKisitSartTip ile eşleşiyorsa, field'in tipine generic olarak ulaş
                        Class<?> fieldType = field.getType();
                        // Field'in class'ındaki field'leri kontrol et
                        for (Field innerField : fieldType.getDeclaredFields()) {
                            // SearchEntity anotasyonunu kontrol et
                            if (innerField.isAnnotationPresent(SearchEntity.class)) {
                                // SearchEntity anotasyonunu al
                                SearchEntity searchEntity = innerField.getAnnotation(SearchEntity.class);
                                return field.getName() + "." + searchEntity.name(); // "katman.katmanAdi" gibi bir format döndürürüz
                            }
                        }
                    }
                }
            }
            return null; // Alan bulunamazsa
        }

        private static String searchNestedFields(Field parentField, String fieldName) {
            Class<?> fieldType = parentField.getType();

            try {
                // Direkt olarak parentField'in türünde arama yap
                Field nestedField = fieldType.getDeclaredField(fieldName);
                return nestedField.getName();
            } catch (NoSuchFieldException e) {
                // Eğer ilk seviyede bulamazsak daha derin nested field'lara bakarız
                for (Field field : fieldType.getDeclaredFields()) {
                    if (!field.getType().isPrimitive() && !field.getType().getName().startsWith("java")) {
                        try {
                            // Daha derin seviyedeki alanları kontrol et
                            Field deepNestedField = field.getType().getDeclaredField(fieldName);
                            return field.getName() + "." + deepNestedField.getName();
                        } catch (NoSuchFieldException ignored) {
                            // Devam et nested alan aramasına
                        }
                    }
                }
            }
            return null; // Eğer hiçbir nested field'da bulunmazsa
        }
    }

    public static boolean isSimple(BaseRequestDto baseRequestDto) {
        return baseRequestDto.getSize() == -1 && CollectionUtils.isEmpty(baseRequestDto.getFilters()) &&
                (baseRequestDto.getStringSearchKey() == null || baseRequestDto.getStringSearchKey().equalsIgnoreCase("")) &&
                CollectionUtils.isEmpty(baseRequestDto.getSortList());
    }
}

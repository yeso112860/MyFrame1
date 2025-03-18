package tr.org.turksat.common.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.stereotype.Component;
import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.BaseResponseDto;

import java.util.Locale;

@Component
@Slf4j
public class ResponseServiceImpl implements ResponseService {

    private final MessageSource messageSource;

    @Autowired
    public ResponseServiceImpl(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    public BaseResponseDto createResponseDto(BaseRequestDto baseRequestDto, Object object, long count, String message, Boolean successStatus, long say) {
        BaseResponseDto baseResponseDto = new BaseResponseDto<>();
        baseResponseDto.setPage(baseRequestDto.getPage());
        baseResponseDto.setSize(baseRequestDto.getSize());
        baseResponseDto.setObject(object);
        baseResponseDto.setTotalRecordCount(count);
        String localeMessage = message;
        try {
            localeMessage = messageSource.getMessage(localeMessage, null, Locale.getDefault());
        } catch (NoSuchMessageException e) {
            log.error(localeMessage + " can't be found");
        }
        baseResponseDto.setMesaj(localeMessage);
        baseResponseDto.setSuccess(successStatus);
        baseResponseDto.setFilters(baseRequestDto.getFilters());
        baseResponseDto.setSortList(baseRequestDto.getSortList());
        baseResponseDto.setFieldNames(baseRequestDto.getFieldNames());
        baseResponseDto.setTotalTableCount(say);
        baseResponseDto.setStringSearchKey(baseRequestDto.getStringSearchKey());
        return baseResponseDto;
    }

}
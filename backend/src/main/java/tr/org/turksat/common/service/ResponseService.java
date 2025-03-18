package tr.org.turksat.common.service;

import tr.org.turksat.common.model.dto.BaseRequestDto;
import tr.org.turksat.common.model.dto.BaseResponseDto;

public interface ResponseService {
    BaseResponseDto createResponseDto(BaseRequestDto baseRequestDto, Object object, long count, String message, Boolean successStatus, long say);
}
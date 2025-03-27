package tr.org.turksat.aop.exception.handler;

import com.sun.jdi.request.InvalidRequestStateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import tr.org.turksat.aop.constant.MessageConstant;
import tr.org.turksat.aop.exception.BusinessException;

import java.util.Objects;

@Slf4j
@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    private MessageSource messageSource;

    @org.springframework.web.bind.annotation.ExceptionHandler({BusinessException.class})
    protected ResponseEntity<Object> handleBusinessException(final BusinessException exception, final WebRequest request) {
        final String bodyOfResponse = exception.getMessage(messageSource, request.getLocale());
        log.error(messageSource.getMessage(MessageConstant.LOG0001, null, request.getLocale()), exception);
        return handleExceptionInternal(exception, bodyOfResponse, new HttpHeaders(), exception.getErrorCode(), request);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler({AccessDeniedException.class})
    protected ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException exception, final WebRequest request) {
        final String bodyOfResponse = messageSource.getMessage(MessageConstant.LOG0002, null, request.getLocale());
        log.error(messageSource.getMessage(MessageConstant.LOG0003, null, request.getLocale()), exception);
        return handleExceptionInternal(exception, bodyOfResponse, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }

//    @org.springframework.web.bind.annotation.ExceptionHandler(MaxUploadSizeExceededException.class)

    @Override
    public ResponseEntity<Object> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException exception, HttpHeaders headers, HttpStatusCode status, final WebRequest request) {
        final String bodyOfResponse = messageSource.getMessage(MessageConstant.LOG0004, null, request.getLocale());
        log.error(messageSource.getMessage(MessageConstant.LOG0004, null, request.getLocale()), exception);
        return handleExceptionInternal(exception, bodyOfResponse, new HttpHeaders(), HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE, request);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler({Exception.class})
    protected ResponseEntity<Object> handleOtherException(final Exception exception, final WebRequest request) {
        final String bodyOfResponse = messageSource.getMessage(MessageConstant.LOG0001, null, request.getLocale());
        log.error(messageSource.getMessage(MessageConstant.LOG0001, null, request.getLocale()), exception);
        return handleExceptionInternal(exception, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(InvalidRequestStateException.class)
    public ResponseEntity<String> handleValidationErrors(InvalidRequestStateException ex) {

        return new ResponseEntity<>(ex.getMessage(), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @Override
    //    @org.springframework.web.bind.annotation.ExceptionHandler({MethodArgumentNotValidException.class})
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        if (Objects.nonNull(fieldError)) {
            String path = fieldError.getField();
            int index = path.indexOf(".") + 1;
            String errorMsg = fieldError.getDefaultMessage();
            BusinessException errorDetails = new BusinessException(errorMsg, HttpStatus.BAD_REQUEST, path.substring(index));
            final String bodyOfResponse = errorDetails.getMessage(messageSource, request.getLocale());
            log.error(bodyOfResponse + " " + request);
            return handleExceptionInternal(errorDetails, bodyOfResponse, headers, errorDetails.getErrorCode(), request);
        } else
            return super.handleMethodArgumentNotValid(ex, headers, status, request);
    }
}
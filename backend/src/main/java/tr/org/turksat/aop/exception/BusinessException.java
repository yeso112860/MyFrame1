package tr.org.turksat.aop.exception;

import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.http.HttpStatus;
import tr.org.turksat.aop.constant.MessageConstant;

import java.io.Serial;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Locale;

public class BusinessException extends RuntimeException implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private final String messageCode;
    private final transient Object[] args;
    private final HttpStatus errorCode;

    public BusinessException(String messageCode, HttpStatus errorCode) {
        this(messageCode, errorCode, (Object) null);
    }

    public BusinessException(String messageCode, HttpStatus errorCode, Object... args) {
        super("MessageCode:" + messageCode);
        this.messageCode = messageCode;
        this.args = args;
        this.errorCode = errorCode;
    }

    public String getMessageCode() {
        return messageCode;
    }

    public Object[] getArgs() {
        return args;
    }

    public HttpStatus getErrorCode() {
        return errorCode;
    }

    public String getMessage(MessageSource messageSource, Locale locale) {
        String message = MessageConstant.MESSAGE_NOT_FOUND;
        try {
            message = messageSource.getMessage(messageCode, args, locale);
        } catch (NoSuchMessageException t) {
            if (message.length() > 5 && !message.contains(".")) {
                String field = "";
                if (args != null && args.length > 0) {
                    field = Arrays.toString(args);
                }
                return field + " " + messageCode;
            }
            t.printStackTrace();
        }
        return message;
    }
}
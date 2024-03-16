package licenta.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ UserAlreadyExists.class, AnimalCenterAlreadyExists.class })
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorResponse getUserAlreadyExistsException(Exception exception) {
        return ErrorResponse.of(exception.getMessage());
    }

    @ExceptionHandler({ UserNotFoundException.class, AnimalCenterNotFound.class, AnimalNotFoundExeption.class })
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResponseEntity<?> getUserNotFoundException(Exception ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler({ UserNotAuthorized.class })
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ResponseEntity<?> getUserNotAuthorizesException(Exception ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler({ ForbiddenAccessForNormalUser.class })
    @ResponseStatus(code = HttpStatus.FORBIDDEN)
    @ResponseBody
    public ResponseEntity<?> getInformationForAdmin(Exception ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }
}

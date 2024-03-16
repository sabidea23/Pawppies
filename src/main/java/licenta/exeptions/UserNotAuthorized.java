package licenta.exeptions;

public class UserNotAuthorized extends RuntimeException{

    public UserNotAuthorized() {
    }

    public UserNotAuthorized(String message) {
        super(message);
    }
}

package licenta.exeptions;

public class UserAlreadyExists extends RuntimeException {
    public UserAlreadyExists() {}

    public UserAlreadyExists(String message) {
        super(message);
    }
}

package licenta.exeptions;

public class ForbiddenAccessForNormalUser extends RuntimeException {
    public ForbiddenAccessForNormalUser() {
    }

    public ForbiddenAccessForNormalUser(String message) {
        super(message);
    }
}

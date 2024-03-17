package licenta.exeptions;

public class ForbiddenActionForRole extends RuntimeException{
    public ForbiddenActionForRole() {
    }

    public ForbiddenActionForRole(String message) {
        super("You do not have the right permissions to do this action");
    }
}

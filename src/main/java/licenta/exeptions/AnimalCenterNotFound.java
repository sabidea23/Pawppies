package licenta.exeptions;

public class AnimalCenterNotFound extends RuntimeException {
    public AnimalCenterNotFound() {
        super("University with this name not found");
    }

    public AnimalCenterNotFound(String message) {
        super(message);
    }
}

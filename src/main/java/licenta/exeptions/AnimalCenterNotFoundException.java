package licenta.exeptions;

public class AnimalCenterNotFoundException extends RuntimeException {
    public AnimalCenterNotFoundException() {
        super("Animal Center with this name not found");
    }

    public AnimalCenterNotFoundException(String message) {
        super(message);
    }
}

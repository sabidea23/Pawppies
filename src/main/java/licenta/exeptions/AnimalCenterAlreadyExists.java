package licenta.exeptions;

public class AnimalCenterAlreadyExists extends RuntimeException {
    public AnimalCenterAlreadyExists() {
        super("AnimalCenter with this name already exists");
    }

    public AnimalCenterAlreadyExists(String message) {
        super(message);
    }
}

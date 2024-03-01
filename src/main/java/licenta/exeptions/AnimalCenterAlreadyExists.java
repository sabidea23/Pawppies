package licenta.exeptions;

public class AnimalCenterAlreadyExists extends RuntimeException {
    public AnimalCenterAlreadyExists() {
        super("University with this name already exists");
    }

    public AnimalCenterAlreadyExists(String message) {
        super(message);
    }
}

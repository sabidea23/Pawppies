package licenta.exeptions;

public class AnimalCenterAlreadyExists extends RuntimeException {
    public AnimalCenterAlreadyExists() {
        super("Animal Center with this name already exists");
    }

    public AnimalCenterAlreadyExists(String message) {
        super(message);
    }
}

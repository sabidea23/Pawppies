package licenta.exeptions;

public class AnimalNotFoundExeption extends RuntimeException {
    public AnimalNotFoundExeption() {
        super("Animal with this id not found");
    }

    public AnimalNotFoundExeption(String message) {
        super(message);
    }
}

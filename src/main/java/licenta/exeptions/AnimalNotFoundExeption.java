package licenta.exeptions;

public class AnimalNotFoundExeption extends RuntimeException {
    public AnimalNotFoundExeption() {
        super("Review with this id not found");
    }

    public AnimalNotFoundExeption(String message) {
        super(message);
    }
}

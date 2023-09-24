package licenta.service.implementation;

import licenta.entity.Animal;
import licenta.exeptions.AnimalNotFoundExeption;
import licenta.resources.AnimalRepository;
import licenta.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnimalServiceImpl implements AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Override
    public Animal createAnimal(Animal animal) {
        return this.animalRepository.save(animal);
    }

    @Override
    public Animal updateAnimal(Animal animal) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsById(animal.getId())) {
            throw new AnimalNotFoundExeption("Animal with id `" + animal.getId() + "` not found");
        }

        return this.animalRepository.save(animal);
    }

    @Override
    public Animal getAnimal(Long id) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsById(id)) {
            throw new AnimalNotFoundExeption("Animal with id `" + id + "` not found");
        }

        Optional<Animal> animal = this.animalRepository.findById(id);
        return animal.orElse(null);
    }

    @Override
    public List<Animal> getAnimalByAnimalCenterId(Long animalCenterid) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsAnimalById(animalCenterid)) {
            throw new AnimalNotFoundExeption("Animal from animal-center with id  id `" + animalCenterid + "` not found");
        }

        return this.animalRepository.findAllById(animalCenterid);
    }

    @Override
    public List<Animal> getAnimalByAuthorId(Long authorId) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsByAuthorId(authorId)) {
            throw new AnimalNotFoundExeption("Animals with author id `" + authorId + "` not found");
        }

        return this.animalRepository.findAllByAuthor(authorId);
    }

    @Override
    public List<Animal> getAnimalByAnimalCenterIdAndAuthorId(Long id, Long authorId) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsByIdAndAuthor(id, authorId)) {
            throw new AnimalNotFoundExeption("Animal from center with id `" + id + "` and author id `" + authorId + "` not found");
        }

        return this.animalRepository.findAllByIdAndAuthor(id, authorId);
    }

    @Override
    public List<Animal> getAnimals() {
        return this.animalRepository.findAll();
    }

    @Override
    public void deleteAnimal(Long id) {
        this.animalRepository.deleteById(id);
    }

    @Override
    public Animal likeAnimal(Long id, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.getAnimal(id);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + id + "` not found");
        }

        if (!animal.addLike(userId)) {
            // User already liked this animal, therefore the like is removed
            animal.removeLike(userId);
        } else {
            // User liked this animal, therefore the possibly existing dislike is removed
            animal.removeDislike(userId);
        }

        this.animalRepository.save(animal);
        return animal;
    }

    @Override
    public Animal dislikeAnimal(Long id, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.getAnimal(id);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + id + "` not found");
        }

        if (!animal.addDislike(userId)) {
            // User already disliked this animal, therefore the dislike is removed
            animal.removeDislike(userId);
        } else {
            // User disliked this animal, therefore the possibly existing like is removed
            animal.removeLike(userId);
        }

        this.animalRepository.save(animal);
        return animal;
    }

    @Override
    public boolean getLikeStatus(Long id, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.getAnimal(id);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + id + "` not found");
        }

        return animal.isLikedBy(userId);
    }

    @Override
    public boolean getDislikeStatus(Long id, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.getAnimal(id);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + id + "` not found");
        }

        return animal.isDislikedBy(userId);
    }

    @Override
    public List<Animal> getLikedAnimals(Long userId) {
        List<Animal> animalRepositoryAll = this.animalRepository.findAll();
        return animalRepositoryAll.stream().filter((animal) -> animal.isLikedBy(userId)).collect(Collectors.toList());
    }

    @Override
    public List<Animal> getDislikeAnimals(Long userId) {
        List<Animal> animals = this.animalRepository.findAll();
        return animals.stream().filter((animal) -> animal.isDislikedBy(userId)).collect(Collectors.toList());
    }
}

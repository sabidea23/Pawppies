package licenta.service.implementation;

import licenta.exeptions.AnimalNotFoundExeption;
import licenta.model.Animal;
import licenta.repo.AnimalRepository;
import licenta.service.AnimalService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnimalServiceImpl implements AnimalService {

    private final AnimalRepository animalRepository;

    public AnimalServiceImpl(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    @Override
    public Animal createAnimal(Animal animal) {
        animal.setPostedDate(LocalDate.now());
        animal.setIsAdopted(false);
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

        Optional<Animal> optionalAnimal = this.animalRepository.findById(id);
        return optionalAnimal.orElse(null);
    }

    @Override
    public List<Animal> getAnimalsByCenterId(Long animalCenterId) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsByAnimalCenterId(animalCenterId)) {
            throw new AnimalNotFoundExeption("Animal with center id `" + animalCenterId + "` not found");
        }

        return this.animalRepository.findAllByAnimalCenterId(animalCenterId);
    }

    @Override
    public List<Animal> getAnimalsByAuthorId(Long authorId) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsByAuthorId(authorId)) {
            throw new AnimalNotFoundExeption("Animals with author id `" + authorId + "` not found");
        }

        return this.animalRepository.findAllByAuthorId(authorId);
    }

    @Override
    public List<Animal> getAnimalsByCenterIdAndAuthorId(Long animalCenterId, Long authorId) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsByAnimalCenterIdAndAuthorId(animalCenterId, authorId)) {
            throw new AnimalNotFoundExeption("Animals with center id `" + animalCenterId + "` and author id `" + authorId + "` not found");
        }

        return this.animalRepository.findAllByAnimalCenterIdAndAuthorId(animalCenterId, authorId);
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
    public Animal likeRAnimal(Long animalId, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.getAnimal(animalId);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + animalId + "` not found");
        }

        if (!animal.addLike(userId)) {
            animal.removeLike(userId);
        }

        this.animalRepository.save(animal);
        return animal;
    }


    @Override
    public boolean getLikeStatus(Long animalId, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.getAnimal(animalId);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + animalId + "` not found");
        }

        return animal.isLikedBy(userId);
    }

    @Override
    public List<Animal> getLikedAnimals(Long userId) {
        List<Animal> animals = this.animalRepository.findAll();
        return animals.stream().filter((animal) -> animal.isLikedBy(userId)).collect(Collectors.toList());
    }
}

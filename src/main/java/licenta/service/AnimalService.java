package licenta.service;

import licenta.entity.Animal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnimalService {
    Animal createAnimal(Animal animal);

    Animal updateAnimal(Animal animal) throws Exception;

    Animal getAnimal(Long id) throws Exception;

    List<Animal> getAnimalByAnimalCenterId(Long id) throws Exception;

    List<Animal> getAnimalByAuthorId(Long authorId) throws Exception;

    List<Animal> getAnimalByAnimalCenterIdAndAuthorId(Long id, Long authorId) throws Exception;

    List<Animal> getAnimals();

    void deleteAnimal(Long id);

    Animal likeAnimal(Long id, Long userId) throws Exception;

    Animal dislikeAnimal(Long id, Long userId) throws Exception;

    boolean getLikeStatus(Long id, Long userId) throws Exception;

    boolean getDislikeStatus(Long id, Long userId) throws Exception;

    List<Animal> getLikedAnimals(Long userId) throws Exception;

    List<Animal> getDislikeAnimals(Long userId) throws Exception;
}

package licenta.service;

import licenta.model.Animal;
import licenta.model.ImageModel;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface AnimalService {
    Animal createAnimal(Animal animal);

    Animal updateAnimal(Animal animal) throws Exception;

    Animal getAnimal(Long id) throws Exception;

    List<Animal> getAnimalsByCenterId(Long id) throws Exception;

    List<Animal> getAnimalsByAuthorId(Long id) throws Exception;

    List<Animal> getAnimalsByCenterIdAndAuthorId(Long animalId, Long authorId) throws Exception;

    List<Animal> getAnimals();

    void deleteAnimal(Long id);

    Animal likeRAnimal(Long animalId, Long userId) throws Exception;

    boolean getLikeStatus(Long animalId, Long userId) throws Exception;

    List<Animal> getLikedAnimals(Long userId) throws Exception;
    Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException;
}

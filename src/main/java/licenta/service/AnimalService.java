package licenta.service;

import licenta.dto.AnimalRequestDTO;
import licenta.dto.AnimalResponseDTO;
import licenta.entity.Animal;
import licenta.entity.ImageModel;
import licenta.exeptions.AnimalNotFoundExeption;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface AnimalService {
    AnimalResponseDTO createAnimal(AnimalRequestDTO animal, Set<ImageModel> imageModels);

    Animal updateAnimal(Animal originalAnimal, Animal animalDetails, MultipartFile[] files) throws Exception;

    AnimalResponseDTO getAnimal(Long id) throws Exception;

    List<AnimalResponseDTO> getAnimalsByCenterId(Long id) throws Exception;

    List<AnimalResponseDTO> getAnimals();

    void deleteAnimal(Long id);

    AnimalResponseDTO likeRAnimal(Long animalId, Long userId) throws Exception;

    boolean getLikeStatus(Long animalId, Long userId) throws Exception;

    List<AnimalResponseDTO> getLikedAnimals(Long userId) throws Exception;
    Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException;
    public Animal findAnimal(Long id) throws AnimalNotFoundExeption;
}

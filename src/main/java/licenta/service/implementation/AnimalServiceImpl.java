package licenta.service.implementation;

import licenta.dto.AnimalRequestDTO;
import licenta.dto.AnimalResponseDTO;
import licenta.exeptions.AnimalNotFoundExeption;
import licenta.entity.Animal;
import licenta.entity.ImageModel;
import licenta.repo.AnimalRepository;
import licenta.service.AnimalService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AnimalServiceImpl implements AnimalService {

    private final AnimalRepository animalRepository;

    public AnimalServiceImpl(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();
        for (MultipartFile file:multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes());
            imageModels.add(imageModel);
        }
        return imageModels;
    }

    @Override
    public AnimalResponseDTO createAnimal(AnimalRequestDTO animalRequestDTO, Set<ImageModel> imageModels) {

        Animal animal = Animal.builder()
                .name(animalRequestDTO.getName())
                .age(animalRequestDTO.getAge())
                .gender(animalRequestDTO.getGender())
                .size(animalRequestDTO.getSize())
                .coatLength(animalRequestDTO.getCoatLength())
                .type(animalRequestDTO.getType())
                .health(animalRequestDTO.getHealth())
                .care(animalRequestDTO.getCare())
                .color(animalRequestDTO.getColor())
                .description(animalRequestDTO.getDescription())
                .goodInHome(animalRequestDTO.getGoodInHome())
                .postedDate(LocalDate.now())
                .isAdopted(false)
                .animalCenter(animalRequestDTO.getAnimalCenter())
                .author(animalRequestDTO.getAuthor())
                .breedDetails(animalRequestDTO.getBreedDetails())
                .animalImages(imageModels)
                .build();

        Animal savedAnimal = this.animalRepository.save(animal);
        return toDto(savedAnimal);
    }

    public  AnimalResponseDTO toDto(Animal animal) {
        return AnimalResponseDTO.builder()
                .id(animal.getId())
                .name(animal.getName())
                .age(animal.getAge())
                .gender(animal.getGender())
                .size(animal.getSize())
                .coatLength(animal.getCoatLength())
                .type(animal.getType())
                .health(animal.getHealth())
                .care(animal.getCare())
                .color(animal.getColor())
                .description(animal.getDescription())
                .goodInHome(animal.getGoodInHome())
                .postedDate(animal.getPostedDate())
                .isAdopted(animal.getIsAdopted())
                .author(animal.getAuthor())
                .animalCenter(animal.getAnimalCenter())
                .breedDetails(animal.getBreedDetails())
                .liked_by(animal.getLiked_by())
                .likes(animal.getLikes())
                .animalImages(animal.getAnimalImages())
                .build();
    }

    @Override
    public Animal updateAnimal(Animal originalAnimal, Animal animalDetails, MultipartFile[] files) throws AnimalNotFoundExeption, IOException {
        if (!this.animalRepository.existsById(originalAnimal.getId())) {
            throw new AnimalNotFoundExeption("Animal with id `" + originalAnimal.getId() + "` not found");
        }

        updateAnimalDetails(originalAnimal, animalDetails);

        if (files != null && files.length > 0) {
            Set<ImageModel> newImages = uploadImage(files);
            originalAnimal.getAnimalImages().addAll(newImages);
        }
        return this.animalRepository.save(originalAnimal);
    }

    private void updateAnimalDetails(Animal originalAnimal, Animal animalDetails) {
        originalAnimal.setName(animalDetails.getName());
        originalAnimal.setAge(animalDetails.getAge());
        originalAnimal.setSize(animalDetails.getSize());
        originalAnimal.setCoatLength(animalDetails.getCoatLength());
        originalAnimal.setType(animalDetails.getType());
        originalAnimal.setHealth(animalDetails.getHealth());
        originalAnimal.setCare(animalDetails.getCare());
        originalAnimal.setDescription(animalDetails.getDescription());
        originalAnimal.setPostedDate(animalDetails.getPostedDate());
        originalAnimal.setIsAdopted(animalDetails.getIsAdopted());
    }

    @Override
    public AnimalResponseDTO getAnimal(Long id) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsById(id)) {
            throw new AnimalNotFoundExeption("Animal with id `" + id + "` not found");
        }

        Optional<Animal> optionalAnimal = this.animalRepository.findById(id);
        Animal animal = optionalAnimal.orElse(null);
        assert animal != null;
        return toDto(animal);
    }

    @Override
    public Animal findAnimal(Long id) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsById(id)) {
            throw new AnimalNotFoundExeption("Animal with id `" + id + "` not found");
        }

        Optional<Animal> optionalAnimal = this.animalRepository.findById(id);
        return optionalAnimal.orElse(null);
    }

    @Override
    public List<AnimalResponseDTO> getAnimalsByCenterId(Long animalCenterId) throws AnimalNotFoundExeption {
        if (!this.animalRepository.existsByAnimalCenterId(animalCenterId)) {
            throw new AnimalNotFoundExeption("Animal with center id `" + animalCenterId + "` not found");
        }

        List<Animal> animals = this.animalRepository.findAllByAnimalCenterId(animalCenterId);
        return animals.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AnimalResponseDTO> getAnimals() {
        List<Animal> animals = this.animalRepository.findAll();
        return animals.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteAnimal(Long id) {
        this.animalRepository.deleteById(id);
    }

    @Override
    public AnimalResponseDTO likeRAnimal(Long animalId, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.findAnimal(animalId);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + animalId + "` not found");
        }

        if (!animal.addLike(userId)) {
            animal.removeLike(userId);
        }

        Animal savedAnimal = this.animalRepository.save(animal);
        return toDto(savedAnimal);
    }


    @Override
    public boolean getLikeStatus(Long animalId, Long userId) throws AnimalNotFoundExeption {
        Animal animal = this.findAnimal(animalId);
        if (animal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + animalId + "` not found");
        }

        return animal.isLikedBy(userId);
    }

    @Override
    public List<AnimalResponseDTO> getLikedAnimals(Long userId) {
        List<Animal> animals = this.animalRepository.findAll();
        List<Animal> filteredAnimals = animals.stream().filter((animal) -> animal.isLikedBy(userId)).collect(Collectors.toList());
        return filteredAnimals.stream().map(this::toDto).collect(Collectors.toList());
    }
}

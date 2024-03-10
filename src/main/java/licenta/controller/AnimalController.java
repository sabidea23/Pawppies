package licenta.controller;

import licenta.exeptions.AnimalNotFoundExeption;
import licenta.model.Animal;
import licenta.model.ImageModel;
import licenta.service.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/review")
@CrossOrigin("*")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @PostMapping(value = {"/"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal createAnimal(@RequestPart("animal") Animal animal,
                               @RequestPart("imageFile") MultipartFile[] file) {
        try {
            Set<ImageModel> imageModels = uploadImage(file);
            animal.setAnimalImages(imageModels);
            return this.animalService.createAnimal(animal);
        } catch (Exception e) {
            return null;
        }
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

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal updateAnimal(@RequestBody Animal requestBodyAnimal) throws Exception {
        Animal originalAnimal = this.animalService.getAnimal(requestBodyAnimal.getId());
        if (originalAnimal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + requestBodyAnimal.getId() + "` not found");
        }

        originalAnimal.setAge(requestBodyAnimal.getAge());
        originalAnimal.setName(requestBodyAnimal.getName());

        return this.animalService.updateAnimal(originalAnimal);
    }

    @GetMapping("/{reviewId}")
    @ResponseStatus(code = HttpStatus.OK)
    public Animal getAnimal(@PathVariable("reviewId") Long id) throws Exception {
        return this.animalService.getAnimal(id);
    }

    @GetMapping("/university/{universityId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAnimalsByCenterId(@PathVariable("universityId") Long id) throws Exception {
        return this.animalService.getAnimalsByCenterId(id);
    }

    @GetMapping("/author/{authorId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAnimalsByAuthorId(@PathVariable("authorId") Long authorId) throws Exception {
        return this.animalService.getAnimalsByAuthorId(authorId);
    }

    @GetMapping("/university/{universityId}/author/{authorId}")
    public List<Animal> getAnimalsByCenterIdAndAuthorId(@PathVariable("universityId") Long animalCenterId,
                                                            @PathVariable("authorId") Long authorId) throws Exception {
        return this.animalService.getAnimalsByCenterIdAndAuthorId(animalCenterId, authorId);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAnimals() {
        return this.animalService.getAnimals();
    }

    @DeleteMapping("/{reviewId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteAnimal(@PathVariable("reviewId") Long id) {
        this.animalService.deleteAnimal(id);
    }

    @PutMapping("/{reviewId}/like/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal likeAnimal(@PathVariable("reviewId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.likeRAnimal(animalId, userId);
    }

    @GetMapping("/{reviewId}/like-status/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public boolean getLikeStatus(@PathVariable("reviewId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.getLikeStatus(animalId, userId);
    }

    @GetMapping("/liked-reviews/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getLikedAnimals(@PathVariable("userId") Long userId) throws Exception {
        return this.animalService.getLikedAnimals(userId);
    }
}

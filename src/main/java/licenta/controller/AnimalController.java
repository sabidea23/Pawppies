package licenta.controller;

import licenta.exeptions.AnimalNotFoundExeption;
import licenta.exeptions.ForbiddenActionForRole;
import licenta.model.Animal;
import licenta.model.ImageModel;
import licenta.service.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/animal")
@CrossOrigin("*")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @PostMapping(value = {"/"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal createAnimal(@RequestPart("animal") Animal animal,
                               @RequestPart("imageFile") MultipartFile[] file,
                               Authentication authentication) {
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            try {
                Set<ImageModel> imageModels = animalService.uploadImage(file);
                animal.setAnimalImages(imageModels);
                return this.animalService.createAnimal(animal);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Animal could not be created", e);
            }
        } else {
            throw new ForbiddenActionForRole("You do not have the right permissions to do this action");
        }
    }

    @GetMapping("/{animalId}")
    @ResponseStatus(code = HttpStatus.OK)
    public Animal getAnimal(@PathVariable("animalId") Long id) throws Exception {
        return this.animalService.getAnimal(id);
    }

    @GetMapping("/center/{centerId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAnimalsByCenterId(@PathVariable("centerId") Long id) throws Exception {
        return this.animalService.getAnimalsByCenterId(id);
    }

    @GetMapping("/author/{authorId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAnimalsByAuthorId(@PathVariable("authorId") Long authorId) throws Exception {
        return this.animalService.getAnimalsByAuthorId(authorId);
    }

    @GetMapping("/center/{centerId}/author/{authorId}")
    public List<Animal> getAnimalsByCenterIdAndAuthorId(@PathVariable("centerId") Long animalCenterId,
                                                            @PathVariable("authorId") Long authorId) throws Exception {
        return this.animalService.getAnimalsByCenterIdAndAuthorId(animalCenterId, authorId);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAnimals() {
        return this.animalService.getAnimals();
    }

    @PutMapping("/{animalId}/like/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal likeAnimal(@PathVariable("animalId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.likeRAnimal(animalId, userId);
    }

    @GetMapping("/{animalId}/like-status/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public boolean getLikeStatus(@PathVariable("animalId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.getLikeStatus(animalId, userId);
    }

    @GetMapping("/liked-animals/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getLikedAnimals(@PathVariable("userId") Long userId) throws Exception {
        return this.animalService.getLikedAnimals(userId);
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

    @DeleteMapping("/{animalId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteAnimal(@PathVariable("animalId") Long id) {
        this.animalService.deleteAnimal(id);
    }

}

package licenta.api;


import licenta.entity.Animal;
import licenta.exeptions.AnimalNotFoundExeption;
import licenta.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animal")
@CrossOrigin("*")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @PostMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal createAnimal(@RequestBody Animal animal) {
        return this.animalService.createAnimal(animal);
    }

    @PutMapping("/")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal updateAnimal(@RequestBody Animal requestBodyAnimal) throws Exception {
        Animal originalAnimal = this.animalService.getAnimal(requestBodyAnimal.getId());
        if (originalAnimal == null) {
            throw new AnimalNotFoundExeption("Animal with id `" + requestBodyAnimal.getId() + "` not found");
        }

        originalAnimal.setText(requestBodyAnimal.getText());

        return this.animalService.updateAnimal(originalAnimal);
    }

    @GetMapping("/{animalId}")
    @ResponseStatus(code = HttpStatus.OK)
    public Animal getAnimalsById(@PathVariable("animalId") Long animalId) throws Exception {
        return this.animalService.getAnimal(animalId);
    }

    @GetMapping("/animal-center/{animalCenterId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAnimalsByAnimalCenteId(@PathVariable("animalCenterId") Long animalCenterId) throws Exception {
        return this.animalService.getAnimalByAnimalCenterId(animalCenterId);
    }

    @GetMapping("/author/{authorId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAnimalsByAuthorId(@PathVariable("authorId") Long authorId) throws Exception {
        return this.animalService.getAnimalByAuthorId(authorId);
    }

    @GetMapping("/animal-center/{animalCenterId}/author/{authorId}")
    public List<Animal> getAnimalsByAnimaCenterIdAndAuthorId(@PathVariable("animalCenterId") Long animalCenterId,
                                                            @PathVariable("authorId") Long authorId) throws Exception {
        return this.animalService.getAnimalByAnimalCenterIdAndAuthorId(animalCenterId, authorId);
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getAllAnimals() {
        return this.animalService.getAnimals();
    }

    @DeleteMapping("/{animalId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteAnimalById(@PathVariable("animalId") Long animalId) {
        this.animalService.deleteAnimal(animalId);
    }

    @PutMapping("/{animalId}/like/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal likeAnimal(@PathVariable("animalId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.likeAnimal(animalId, userId);
    }

    @PutMapping("/{animalId}/dislike/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Animal dislikeAnimal(@PathVariable("animalId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.dislikeAnimal(animalId, userId);
    }

    @GetMapping("/{animalId}/like-status/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public boolean getLikeStatus(@PathVariable("animalId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.getLikeStatus(animalId, userId);
    }

    @GetMapping("/{animalId}/dislike-status/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public boolean getDislikeStatus(@PathVariable("animalId") Long animalId, @PathVariable("userId") Long userId)
            throws Exception {
        return this.animalService.getDislikeStatus(animalId, userId);
    }

    @GetMapping("/liked-animals/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getLikedAnimals(@PathVariable("userId") Long userId) throws Exception {
        return this.animalService.getLikedAnimals(userId);
    }

    @GetMapping("/disliked-animals/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Animal> getDislikedAnimals(@PathVariable("userId") Long userId) throws Exception {
        return this.animalService.getDislikeAnimals(userId);
    }
}
